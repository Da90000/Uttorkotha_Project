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

const FocusInner: React.FC<SceneProps> = ({ heading, accentColor, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = ease(frame, fps, 0.8, 2.9);
  return (
    <Shell index="04" accent={accentColor} style={style}>
      <Headline style={{ top: 205, fontSize: 99 }}>{heading}</Headline>
      <div style={{ position: "absolute", left: 155, top: 510, width: 620 }}>
        {[
          "Gather the references",
          "Refine the direction",
          "Create with clarity",
        ].map((label, i) => {
          const checked = ease(frame, fps, 1.15 + i * 0.55, 1.5 + i * 0.55);
          return (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 23,
                alignItems: "center",
                padding: "27px 28px",
                marginBottom: 18,
                background: "white",
                border: "1px solid #e8eef3",
                borderRadius: 20,
                boxShadow: "0 8px 25px #28496205",
                opacity: ease(frame, fps, 0.25 + i * 0.12, 0.7 + i * 0.12),
                translate: `${(1 - settle(frame, fps, 0.25 + i * 0.12)) * -80}px 0px`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: checked > 0 ? `${accentColor}18` : "#f0f4f7",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <div style={{ opacity: checked, scale: checked }}>
                  <Tick size={30} color={accentColor} />
                </div>
              </div>
              <div
                style={{
                  fontSize: 28,
                  color: checked > 0.9 ? "#4e6574" : "#17212b",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
      <Interactive.Div
        name="Animated progress ring"
        premountFor={fps}
        style={{
          position: "absolute",
          left: 1015,
          top: 255,
          width: 660,
          height: 615,
          background: "white",
          borderRadius: 36,
          border: "1px solid #e5edf4",
          boxShadow: "0 30px 90px #28496212",
          translate: `0px ${(1 - settle(frame, fps, 0.4)) * 110}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 36,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          A little progress, every day.
        </div>
        <svg
          width="360"
          height="360"
          viewBox="0 0 360 360"
          style={{
            position: "absolute",
            left: 150,
            top: 120,
            rotate: "-90deg",
          }}
        >
          <circle
            cx="180"
            cy="180"
            r="151"
            fill="none"
            stroke="#eef4f8"
            strokeWidth="19"
          />
          <circle
            cx="180"
            cy="180"
            r="151"
            fill="none"
            stroke={accentColor}
            strokeWidth="19"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 151}
            strokeDashoffset={2 * Math.PI * 151 * (1 - progress)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 225,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 98,
              letterSpacing: -7,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(progress * 100)}
            <span style={{ fontSize: 42, letterSpacing: -1 }}>%</span>
          </div>
          <div style={{ fontSize: 21, color: "#7c8b96" }}>
            {progress < 0.999
              ? "Finding the flow"
              : "A clear head. A fresh start."}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            textAlign: "center",
            color: "#8b9aa5",
            fontSize: 18,
          }}
        >
          Illustrative progress preview
        </div>
      </Interactive.Div>
    </Shell>
  );
};
export const Focus = Interactive.withSchema({
  Component: FocusInner,
  componentName: "<Focus>",
  schema: sceneSchema,
  wrapInSequence: true,
});
