import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ease,
  Headline,
  sceneSchema,
  settle,
  Shell,
  TaskCard,
  type SceneProps,
} from "./design";

const OrganizeInner: React.FC<SceneProps> = ({
  heading,
  accentColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell index="02" accent={accentColor} style={style}>
      <Headline
        centered
        style={{
          left: 200,
          top: 185,
          width: 1520,
          fontSize: 84,
          letterSpacing: -4,
        }}
      >
        {heading}
      </Headline>
      <div
        style={{
          position: "absolute",
          left: 215,
          top: 385,
          width: 1490,
          height: 500,
          borderRadius: 36,
          background: "#edf3f8",
          border: "1px solid #e1eaf1",
          translate: `${20 * (1 - ease(frame, fps, 0, 4.4))}px 0px`,
        }}
      >
        {[
          { t: "Ideas", x: 35 },
          { t: "In progress", x: 520 },
          { t: "Ready", x: 1005 },
        ].map((c, i) => (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: c.x,
              top: 28,
              width: 450,
              height: 430,
              background: "#ffffff78",
              borderRadius: 23,
            }}
          >
            <div
              style={{
                padding: "25px 25px",
                fontSize: 27,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {c.t}
              <span
                style={{
                  color: i === 1 ? accentColor : "#8b9aa5",
                  fontSize: 18,
                  borderRadius: 10,
                  padding: "5px 10px",
                  background: i === 1 ? `${accentColor}15` : "#eaf0f4",
                }}
              >
                01
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: 25,
                bottom: 25,
                color: "#b0bdc7",
                fontSize: 24,
              }}
            >
              + Add an idea
            </div>
          </div>
        ))}
      </div>
      <TaskCard
        name="Ideas card"
        premountFor={fps}
        title="Collect references"
        subtitle="A place for every spark."
        tag="IDEAS"
        accent="#7e9ec5"
        style={{
          left: 275 + (1 - ease(frame, fps, 0.45, 1.7)) * 350,
          top: 515 - (1 - settle(frame, fps, 0.4)) * 140,
          width: 400,
          rotate: `${-7 * (1 - ease(frame, fps, 0.5, 1.8))}deg`,
          opacity: ease(frame, fps, 0.3, 0.7),
        }}
      />
      <TaskCard
        name="In progress card"
        premountFor={fps}
        title="Shape the concept"
        subtitle="Give the idea a little structure."
        tag="IN PROGRESS"
        accent={accentColor}
        style={{
          left: 760,
          top: 515 + (1 - settle(frame, fps, 0.65)) * 180,
          width: 400,
          opacity: ease(frame, fps, 0.55, 0.85),
        }}
      />
      <TaskCard
        name="Ready card"
        premountFor={fps}
        title="Ready to create"
        subtitle="A clear next step."
        tag="READY"
        accent="#5aaf99"
        style={{
          left: 1245 - (1 - ease(frame, fps, 0.75, 1.9)) * 300,
          top: 515 - (1 - settle(frame, fps, 0.85)) * 100,
          width: 400,
          rotate: `${7 * (1 - ease(frame, fps, 0.75, 1.9))}deg`,
          opacity: ease(frame, fps, 0.75, 1.05),
        }}
      />
    </Shell>
  );
};
export const Organize = Interactive.withSchema({
  Component: OrganizeInner,
  componentName: "<Organize>",
  schema: sceneSchema,
  wrapInSequence: true,
});
