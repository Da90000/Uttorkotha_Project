import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ease,
  Headline,
  Phone,
  sceneSchema,
  settle,
  Shell,
  TaskCard,
  Tick,
  type SceneProps,
} from "./design";

const ResolveInner: React.FC<SceneProps> = ({
  heading,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell index="05" accent={accentColor} style={style}>
      <div
        style={{
          position: "absolute",
          left: 970,
          top: 180,
          width: 780,
          height: 720,
          borderRadius: 52,
          background: "linear-gradient(140deg,#d6efff,#a5d8f5 65%,#dff2fd)",
          opacity: ease(frame, fps, 0, 0.7),
        }}
      />
      <Headline style={{ top: 300, fontSize: 104, width: 820 }}>
        {heading}
      </Headline>
      <div
        style={{
          position: "absolute",
          left: 153,
          top: 610,
          fontSize: 31,
          color: "#6b7b86",
          opacity: ease(frame, fps, 0.7, 1.3),
        }}
      >
        An original workspace motion study.
      </div>
      <Phone
        accent={accentColor}
        style={{
          left: 1165,
          top: 215,
          rotate: `${3 * (1 - ease(frame, fps, 0.4, 2.4))}deg`,
          translate: `0px ${(1 - settle(frame, fps, 0.3)) * 330}px`,
          opacity: ease(frame, fps, 0.3, 0.7),
        }}
      />
      <TaskCard
        name="Final floating task"
        premountFor={fps}
        title="Make something good"
        subtitle="The space is yours."
        tag="READY WHEN YOU ARE"
        accent={accentColor}
        style={{
          left: 870,
          top: 685,
          width: 405,
          rotate: "-3deg",
          opacity: ease(frame, fps, 0.75, 1.1),
          translate: `${(1 - settle(frame, fps, 0.75)) * -130}px ${(1 - settle(frame, fps, 0.75)) * 85}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1485,
          top: 405,
          width: 228,
          padding: "24px 25px",
          borderRadius: 22,
          background: "#ffffffed",
          boxShadow: "0 20px 50px #315b7b16",
          opacity: ease(frame, fps, 1, 1.35),
          translate: `0px ${(1 - settle(frame, fps, 1)) * 100}px`,
        }}
      >
        <div style={{ color: "#7c8b96", fontSize: 17 }}>FOCUS MODE</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 29,
            fontWeight: 600,
            marginTop: 10,
          }}
        >
          <Tick color={accentColor} size={30} />
          All clear.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 155,
          top: 745,
          padding: "17px 26px",
          borderRadius: 40,
          background: "#172c3d",
          color: "white",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: ease(frame, fps, 1.15, 1.65),
          translate: `0px ${(1 - settle(frame, fps, 1.15)) * 35}px`,
        }}
      >
        Less clutter. More possibility.
        <span style={{ color: "#a8dcfa" }}>↗</span>
      </div>
    </Shell>
  );
};
export const ResolveScene = Interactive.withSchema({
  Component: ResolveInner,
  componentName: "<ResolveScene>",
  schema: sceneSchema,
  wrapInSequence: true,
});
