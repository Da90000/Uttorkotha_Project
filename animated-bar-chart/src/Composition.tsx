import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  type InteractivitySchema,
  useCurrentFrame,
  useVideoConfig,
  Track,
} from "remotion";

type BarProps = {
  label: string;
  value: number;
  color: string;
  style?: CSSProperties;
};

const BarInner: React.FC<BarProps> = ({ label, value, color, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, 1.35 * fps], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const height = Math.min(100, Math.max(0, value)) * 5 * progress;

  return (
    <Interactive.Div
      style={{
        position: "absolute",
        top: 350,
        width: 160,
        height: 500,
        fontFamily: '"Segoe UI", Arial, sans-serif',
        ...style,
      }}
    >
      <div
        data-chart-bar={label}
        style={{
          position: "absolute",
          bottom: 0,
          width: 160,
          height,
          background: color,
          borderRadius: "14px 14px 0 0",
          boxShadow: "inset 0 2px 0 #ffffff30",
        }}
      />
      <div
        data-chart-value={label}
        style={{
          position: "absolute",
          bottom: height + 18,
          width: 160,
          textAlign: "center",
          color,
          fontSize: 52,
          fontWeight: 650,
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {Math.round(Math.min(100, Math.max(0, value)) * progress)}
      </div>
      <div
        style={{
          position: "absolute",
          top: 528,
          left: -36,
          width: 232,
          textAlign: "center",
          color: "#ced8df",
          fontSize: 32,
          fontWeight: 500,
          opacity: interpolate(frame, [0, 0.35 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {label}
      </div>
    </Interactive.Div>
  );
};

const barSchema = {
  label: { type: "text-content", default: "Category A", description: "Label" },
  value: {
    type: "number",
    default: 35,
    description: "Value (0–100)",
    min: 0,
    max: 100,
    step: 1,
    hiddenFromList: false,
  },
  color: { type: "color", default: "#72e1d1", description: "Bar color" },
} as const satisfies InteractivitySchema;

const ChartBar = Interactive.withSchema({
  Component: BarInner,
  componentName: "<ChartBar>",
  schema: barSchema,
  wrapInSequence: true,
});

const FiveBarChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor: "#101b23",
          color: "#f4f7f9",
          fontFamily: '"Segoe UI", Arial, sans-serif',
        }}
      >
        <Interactive.Div
          name="Chart heading"
          premountFor={fps}
          style={{
            position: "absolute",
            left: 160,
            top: 104,
            opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [0, 0.8 * fps],
              ["0px 20px", "0px 0px"],
              {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div
            style={{
              color: "#72e1d1",
              fontSize: 24,
              letterSpacing: 5,
              fontWeight: 600,
            }}
          >
            FIVE-BAR COMPARISON
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 650,
              letterSpacing: -4,
              marginTop: 14,
            }}
          >
            Five bars. One story.
          </div>
        </Interactive.Div>
      
        <Interactive.Div
          name="Chart grid"
          premountFor={fps}
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(frame, [0.3 * fps, 0.85 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[0, 25, 50, 75, 100].map((tick) => (
            <div
              key={tick}
              style={{
                position: "absolute",
                left: 290,
                top: 850 - tick * 5,
                width: 1380,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -102,
                  top: -21,
                  width: 68,
                  textAlign: "right",
                  fontSize: 28,
                  color: "#889aa8",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {tick}
              </div>
              <div
                style={{
                  height: tick === 0 ? 2 : 1,
                  background: tick === 0 ? "#617280" : "#2c3a45",
                }}
              />
            </div>
          ))}
        </Interactive.Div>
      
        <ChartBar
          name="Bar A"
          from={0.8 * fps}
          premountFor={fps}
          label="Category A"
          value={35}
          color="#72e1d1"
          style={{ left: 360 }}
        />
        <ChartBar
          name="Bar B"
          from={1 * fps}
          premountFor={fps}
          label="Category B"
          value={52}
          color="#8cb9ef"
          style={{ left: 620 }}
        />
        <ChartBar
          name="Bar C"
          from={1.2 * fps}
          premountFor={fps}
          label="Category C"
          value={68}
          color="#b8a8ed"
          style={{ left: 880 }}
        />
        <ChartBar
          name="Bar D"
          from={1.4 * fps}
          premountFor={fps}
          label="Category D"
          value={81}
          color="#ffad81"
          style={{ left: 1140 }}
        />
        <ChartBar
          name="Bar E"
          from={1.6 * fps}
          premountFor={fps}
          label={"New Category"}
          value={85}
          color="#f1d97c"
          style={{ left: 1400 }}
        />
      
        <Interactive.Div
          name="Sample data note"
          premountFor={fps}
          style={{
            position: "absolute",
            left: 160,
            right: 160,
            bottom: 100,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#889aa8",
            opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span>Illustrative sample data</span>
          <span>VALUE / 0–100</span>
        </Interactive.Div>
      </AbsoluteFill>
      <Track />
    </>
  );
};

export const MyComposition = () => (
  <Composition
    id="FiveBarChart"
    component={FiveBarChart}
    durationInFrames={210}
    fps={30}
    width={1920}
    height={1080}
  />
);
