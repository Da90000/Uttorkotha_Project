import {useEffect, useRef, useState} from "react";
import {AbsoluteFill, Composition, Easing, interpolate, staticFile, useCurrentFrame, useDelayRender} from "remotion";
import * as maplibregl from "maplibre-gl";
import type {GeoJSONSource, Map as LibreMap, StyleSpecification} from "maplibre-gl";
import * as turf from "@turf/turf";
import "maplibre-gl/dist/maplibre-gl.css";

// Editable route, palette and camera controls. Coordinates are longitude, latitude.
export const ROUTE = {
  origin: [-118.2437, 34.0522] as [number, number],
  destination: [-74.006, 40.7128] as [number, number],
  color: "#1578ed",
  plateWidth: 3840,
  plateHeight: 2160,
  baseZoom: 4.4,
  departureFrame: 60,
  arrivalFrame: 360,
};
const flight = turf.greatCircle(ROUTE.origin, ROUTE.destination, {npoints: 240});
if (flight.geometry.type !== "LineString") throw new Error("Expected a continental route");
const route = turf.lineString(flight.geometry.coordinates);
const distance = turf.length(route);
const cities = turf.featureCollection([
  turf.point(ROUTE.origin, {name: "LOS ANGELES"}),
  turf.point(ROUTE.destination, {name: "NEW YORK"}),
]);
const ease = Easing.bezier(0.42, 0, 0.22, 1);
const between = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
const getProgress = (frame: number) => between(frame, ROUTE.departureFrame, ROUTE.arrivalFrame);
const location = (progress: number) => turf.along(route, distance * progress).geometry.coordinates as [number, number];
const partial = (progress: number) => turf.lineSliceAlong(route, 0, Math.max(0.001, distance * progress));

// A vector basemap from the stock MapLibre demo source; no API key required.
const style: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {world: {type: "vector", url: "https://demotiles.maplibre.org/tiles/tiles.json"}},
  layers: [
    {id: "ocean", type: "background", paint: {"background-color": "#dfedf3"}},
    {id: "land", type: "fill", source: "world", "source-layer": "countries", paint: {"fill-color": "#fafbf9"}},
    {id: "borders", type: "line", source: "world", "source-layer": "countries", paint: {"line-color": "#b6c7cc", "line-width": 1.4}},
  ],
};

export const CoastToCoast = () => {
  const frame = useCurrentFrame();
  const container = useRef<HTMLDivElement>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [ready] = useState(() => delayRender("Loading the coast-to-coast vector map"));
  const [map, setMap] = useState<LibreMap | null>(null);
  const progress = getProgress(frame);
  const arrived = frame >= ROUTE.arrivalFrame;
  const overview = between(frame, 408, 468);
  const intro = between(frame, 0, 30);

  useEffect(() => {
    if (!container.current) return;
    maplibregl.setWorkerUrl(staticFile("maplibre-gl-worker.mjs"));
    const instance = new maplibregl.Map({
      container: container.current, style, center: [-96, 38], zoom: ROUTE.baseZoom,
      interactive: false, attributionControl: false, fadeDuration: 0,
      canvasContextAttributes: {preserveDrawingBuffer: true},
    });
    instance.on("error", (event) => cancelRender(event.error));
    instance.on("load", () => {
      instance.addSource("full-route", {type: "geojson", data: route});
      instance.addLayer({id: "route-guide", type: "line", source: "full-route", layout: {"line-cap": "round", "line-join": "round"}, paint: {"line-color": "#b9cfdf", "line-width": 3, "line-dasharray": [1.5, 2.5]}});
      instance.addSource("trace", {type: "geojson", data: partial(0)});
      instance.addLayer({id: "route-reveal", type: "line", source: "trace", layout: {"line-cap": "round", "line-join": "round"}, paint: {"line-color": ROUTE.color, "line-width": 6}});
      instance.addSource("cities", {type: "geojson", data: cities});
      instance.addLayer({id: "city-dots", type: "circle", source: "cities", paint: {"circle-color": "#172c3d", "circle-radius": 7, "circle-stroke-color": "white", "circle-stroke-width": 4}});
      instance.addLayer({id: "city-labels", type: "symbol", source: "cities", layout: {"text-field": ["get", "name"], "text-font": ["Open Sans Semibold"], "text-size": 21, "text-anchor": "top", "text-offset": [0, 1.25], "text-allow-overlap": true, "text-letter-spacing": 0.08}, paint: {"text-color": "#172c3d", "text-halo-color": "#fafbf9", "text-halo-width": 4}});
      instance.addSource("traveler", {type: "geojson", data: turf.point(ROUTE.origin)});
      instance.addLayer({id: "traveler-ring", type: "circle", source: "traveler", paint: {"circle-color": ROUTE.color, "circle-radius": 22, "circle-opacity": 0.12}});
      instance.addLayer({id: "traveler-dot", type: "circle", source: "traveler", paint: {"circle-color": ROUTE.color, "circle-radius": 10, "circle-stroke-color": "white", "circle-stroke-width": 4}});
      // Keep this camera frozen. React moves the whole map plate below.
      instance.jumpTo({center: [-96, 38], zoom: ROUTE.baseZoom, pitch: 0, bearing: 0});
      instance.once("idle", () => {setMap(instance); continueRender(ready);});
      instance.triggerRepaint();
    });
    // Deliberately no map.remove(): Remotion may remount during frame capture.
  }, [cancelRender, continueRender, ready]);

  useEffect(() => {
    if (!map) return;
    const handle = delayRender("Drawing route progress");
    const done = () => continueRender(handle);
    map.once("idle", done);
    (map.getSource("trace") as GeoJSONSource).setData(partial(progress));
    (map.getSource("traveler") as GeoJSONSource).setData(turf.point(location(progress)));
    map.triggerRepaint();
    return () => {map.off("idle", done); continueRender(handle);};
  }, [map, progress, delayRender, continueRender]);

  const target = location(progress);
  const midpoint = location(0.5);
  const camera: [number, number] = [target[0] + (midpoint[0] - target[0]) * overview, target[1] + (midpoint[1] - target[1]) * overview];
  const zoom = interpolate(frame, [0, 60, 150, 300, 360, 408, 468], [4.4, 4.4, 4.05, 4.05, 4.4, 4.4, 3.6], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  const scale = 2 ** (zoom - ROUTE.baseZoom);
  const projected = map?.project(camera);
  const x = 960 - (projected?.x ?? 1920) * scale;
  const y = 550 - (projected?.y ?? 1080) * scale;

  return <AbsoluteFill style={{background: "#dfedf3", color: "#172c3d", fontFamily: "'Segoe UI', Arial, sans-serif", overflow: "hidden"}}>
    <div style={{position: "absolute", width: ROUTE.plateWidth, height: ROUTE.plateHeight, transformOrigin: "0 0", transform: `translate(${x}px, ${y}px) scale(${scale})`}}><div ref={container} style={{width: "100%", height: "100%"}} /></div>
    <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,0) 32%, rgba(255,255,255,0) 75%, rgba(255,255,255,.45))", pointerEvents: "none"}} />
    <div style={{position: "absolute", left: 88, top: 64, opacity: intro, transform: `translateY(${(1-intro)*20}px)`}}>
      <div style={{fontSize: 17, fontWeight: 700, letterSpacing: 5, color: "#5c7b8c", marginBottom: 14}}>A JOURNEY ACROSS AMERICA</div>
      <div style={{fontSize: 70, letterSpacing: -3, fontWeight: 650, lineHeight: 1.12}}>Coast to coast.</div>
    </div>
    <div style={{position: "absolute", right: 88, top: 80, padding: "14px 24px", background: "white", border: "1px solid #dce5e9", borderRadius: 100, fontSize: 18, color: "#476171", boxShadow: "0 5px 25px #193c4c08"}}>{frame < 60 ? "01  /  DEPARTURE" : arrived ? "03  /  ARRIVAL" : "02  /  IN MOTION"}</div>
    <div style={{position: "absolute", bottom: 74, left: 88, right: 88, height: 144, borderRadius: 26, background: "rgba(255,255,255,.97)", boxShadow: "0 18px 65px #29475d15", display: "flex", alignItems: "center", padding: "0 42px", gap: 45, border: "1px solid #fff"}}>
      <div style={{width: 240}}><div style={{fontSize: 14, letterSpacing: 3, color: "#6c8492", marginBottom: 8}}>FROM · CALIFORNIA</div><div style={{fontSize: 30, fontWeight: 600}}>Los Angeles</div></div>
      <div style={{flex: 1}}><div style={{display: "flex", justifyContent: "space-between", fontSize: 16, color: "#66808f", marginBottom: 15}}><span>{arrived ? "Journey complete" : "Great-circle route"}</span><span style={{fontVariantNumeric: "tabular-nums"}}>{Math.round(progress * 100)}%</span></div><div style={{height: 5, background: "#e6edf2", borderRadius: 10}}><div style={{height: "100%", width: `${progress * 100}%`, background: ROUTE.color, borderRadius: 10}} /></div></div>
      <div style={{width: 220, textAlign: "right"}}><div style={{fontSize: 14, letterSpacing: 3, color: "#6c8492", marginBottom: 8}}>TO · NEW YORK</div><div style={{fontSize: 30, fontWeight: 600}}>New York City</div></div>
      <div style={{borderLeft: "1px solid #dce5eb", paddingLeft: 38, width: 180}}><div style={{fontSize: 33, fontWeight: 650, fontVariantNumeric: "tabular-nums"}}>{Math.round(distance * progress).toLocaleString("en-US")} <span style={{fontSize: 17, fontWeight: 400}}>km</span></div><div style={{fontSize: 15, color: "#6c8492", marginTop: 4}}>distance traced</div></div>
    </div>
    <div style={{position: "absolute", bottom: 23, left: 90, fontSize: 14, color: "#5c7584"}}>MapLibre demo map · © MapLibre contributors</div>
    <div style={{position: "absolute", bottom: 23, right: 90, fontSize: 14, color: "#5c7584"}}>Illustrative geographic route · not driving directions</div>
  </AbsoluteFill>;
};

export const RouteCompositions = () => <Composition id="CoastToCoast" component={CoastToCoast} width={1920} height={1080} fps={30} durationInFrames={480} />;
