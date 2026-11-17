import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ease,
  Headline,
  sceneSchema,
  settle,
  Shell,
  Tick,
  type SceneProps,
} from "./design";

const RefineInner: React.FC<SceneProps> = ({ heading, accentColor, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const second = ease(frame, fps, 1, 1.5);
  const third = ease(frame, fps, 2.1, 2.65);
  return (
    <Shell index="03" accent={accentColor} style={style}>
      <Headline style={{ top: 300, width: 800, fontSize: 102 }}>
        {heading}
      </Headline>
      <div
        style={{
          position: "absolute",
          left: 153,
          top: 600,
          fontSize: 31,
          color: "#6b7b86",
          opacity: ease(frame, fps, 0.6, 1.1),
        }}
      >
        Keep the good. Refine the rest.
      </div>
      <Interactive.Div
        name="Version selector and design preview"
        premountFor={fps}
        style={{
          position: "absolute",
          left: 995,
          top: 230,
          width: 660,
          height: 635,
          background: "white",
          borderRadius: 34,
          padding: 32,
          boxShadow: "0 30px 90px #28496213",
          border: "1px solid #e5edf4",
          translate: `0px ${(1 - settle(frame, fps, 0.25)) * 100}px`,
        }}
      >
        <div style={{ fontSize: 23, color: "#73818b", marginBottom: 22 }}>
          Version history
        </div>
        <div
          style={{
            height: 65,
            background: "#f0f4f8",
            borderRadius: 17,
            position: "relative",
            display: "flex",
            padding: 6,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 6 + (second + third) * 198,
              top: 6,
              width: 194,
              height: 53,
              background: "white",
              boxShadow: "0 4px 12px #2849620c",
              borderRadius: 12,
            }}
          />
          {[1, 2, 3].map((v, i) => (
            <div
              key={v}
              style={{
                width: 198,
                display: "grid",
                placeItems: "center",
                position: "relative",
                fontSize: 22,
                fontWeight:
                  (i === 0 && second < 0.5) ||
                  (i === 1 && second >= 0.5 && third < 0.5) ||
                  (i === 2 && third >= 0.5)
                    ? 600
                    : 400,
                color: "#263641",
              }}
            >
              Version {v}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "relative",
            height: 400,
            marginTop: 26,
            borderRadius: 22,
            overflow: "hidden",
            background: "#e9f5fd",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 330,
              height: 330,
              borderRadius: 300,
              background: accentColor,
              opacity: 0.42 + third * 0.4,
              left: 225 - second * 120 + third * 100,
              top: 105 - second * 50,
              scale: 0.8 + third * 0.4,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 210,
              height: 210,
              borderRadius: 34 + third * 75,
              background: "#ffffffa8",
              left: 320 - third * 70,
              top: 40,
              rotate: `${-14 + second * 14 + third * 12}deg`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 42,
              top: 40,
              fontSize: 15,
              letterSpacing: 3,
              color: "#36556b",
            }}
          >
            A FRESH PERSPECTIVE
          </div>
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 95 + third * 35,
              fontSize: 67 + second * 7,
              lineHeight: 1.03,
              letterSpacing: -4,
              fontWeight: 600,
            }}
          >
            Make
            <br />
            space.
          </div>
          <div
            style={{
              position: "absolute",
              left: 42,
              bottom: 35,
              borderRadius: 20,
              background: "#172b3c",
              padding: "12px 22px",
              fontSize: 17,
              color: "white",
            }}
          >
            Explore the idea ↗
          </div>
        </div>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 1500,
          top: 820,
          display: "flex",
          gap: 9,
          alignItems: "center",
          background: "white",
          padding: "15px 24px",
          borderRadius: 18,
          boxShadow: "0 16px 40px #28496218",
          fontSize: 23,
          opacity: ease(frame, fps, 2.65, 2.9),
          scale: settle(frame, fps, 2.6),
        }}
      >
        <Tick color={accentColor} />
        Saved
      </div>
      <svg
        width="52"
        height="62"
        viewBox="0 0 40 48"
        style={{
          position: "absolute",
          left: 1335 + third * 180,
          top: 390 - second * 20,
          opacity: ease(frame, fps, 0.7, 1),
          filter: "drop-shadow(0 5px 5px #17354c30)",
          scale:
            1 -
            Math.sin(Math.PI * second) * 0.12 -
            Math.sin(Math.PI * third) * 0.12,
        }}
      >
        <path
          d="M5 3 33 28 20 30 14 43Z"
          fill="white"
          stroke="#263641"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </Shell>
  );
};
export const Refine = Interactive.withSchema({
  Component: RefineInner,
  componentName: "<Refine>",
  schema: sceneSchema,
  wrapInSequence: true,
});
