import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ease,
  Headline,
  Mark,
  sceneSchema,
  settle,
  Shell,
  TaskCard,
  type SceneProps,
} from "./design";

const GatherInner: React.FC<SceneProps> = ({ heading, accentColor, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell index="01" accent={accentColor} style={style}>
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 215,
          width: 720,
          height: 660,
          borderRadius: 56,
          background: "linear-gradient(145deg,#d8effd,#c3e5fa 48%,#ebf7fd)",
          rotate: `${-3 + ease(frame, fps, 0, 4.4) * 2}deg`,
        }}
      />
      <Headline>{heading}</Headline>
      <div
        style={{
          position: "absolute",
          left: 152,
          top: 595,
          fontSize: 32,
          color: "#6b7b86",
          lineHeight: 1.5,
          opacity: ease(frame, fps, 0.65, 1.35),
        }}
      >
        A little clarity.
        <br />A lot of possibility.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1425,
          top: 255,
          padding: 30,
          borderRadius: 28,
          background: "#ffffffb8",
          boxShadow: "0 20px 45px #50718c13",
          scale: settle(frame, fps, 0.55),
          rotate: "8deg",
        }}
      >
        <Mark accent={accentColor} size={66} />
      </div>
      <TaskCard
        name="Capture idea"
        premountFor={fps}
        title="A new idea"
        subtitle="Capture the spark."
        tag="INSPIRATION"
        accent={accentColor}
        style={{
          left: 1020,
          top: 370,
          rotate: `${-6 * (1 - ease(frame, fps, 0.7, 2))}deg`,
          translate: `0px ${(1 - settle(frame, fps, 0.45)) * 220 + Math.sin((frame / fps) * 1.5) * 5}px`,
          opacity: ease(frame, fps, 0.45, 0.7),
        }}
      />
      <TaskCard
        name="Gather references"
        premountFor={fps}
        title="A fresh perspective"
        subtitle="Bring your references together."
        tag="COLLECTION"
        accent="#7e9ec5"
        style={{
          left: 1170,
          top: 585,
          rotate: "4deg",
          translate: `0px ${(1 - settle(frame, fps, 0.7)) * 250 - Math.sin((frame / fps) * 1.4) * 7}px`,
          opacity: ease(frame, fps, 0.7, 0.95),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 945,
          top: 785,
          padding: "15px 22px",
          borderRadius: 18,
          background: "white",
          boxShadow: "0 12px 35px #35557712",
          display: "flex",
          gap: 12,
          alignItems: "center",
          fontSize: 23,
          opacity: ease(frame, fps, 1.2, 1.6),
          translate: `0px ${(1 - settle(frame, fps, 1.2)) * 60}px`,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: accentColor,
          }}
        />
        Good things start here.
      </div>
    </Shell>
  );
};
export const Gather = Interactive.withSchema({
  Component: GatherInner,
  componentName: "<Gather>",
  schema: sceneSchema,
  wrapInSequence: true,
});
