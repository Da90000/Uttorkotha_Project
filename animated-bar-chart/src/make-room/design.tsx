import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  spring,
  type InteractivitySchema,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type SceneProps = {
  heading: string;
  accentColor: string;
  style?: CSSProperties;
};
export const sceneSchema = {
  heading: {
    type: "text-content",
    default: "Make room.",
    description: "Headline (use a new line for each reveal)",
  },
  accentColor: {
    type: "color",
    default: "#45a7e3",
    description: "Accent color",
  },
} as const satisfies InteractivitySchema;

export const ease = (frame: number, fps: number, start: number, end: number) =>
  interpolate(frame, [start * fps, end * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

export const settle = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 18, stiffness: 150, mass: 0.8 },
  });

export const Mark = ({
  accent = "#45a7e3",
  size = 40,
}: {
  accent?: string;
  size?: number;
}) => (
  <div
    style={{
      width: size,
      height: size,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: size * 0.1,
      rotate: "-8deg",
    }}
  >
    <div style={{ background: accent, borderRadius: size * 0.12 }} />
    <div
      style={{ background: accent, opacity: 0.45, borderRadius: size * 0.12 }}
    />
    <div
      style={{ background: accent, opacity: 0.7, borderRadius: size * 0.12 }}
    />
    <div style={{ background: accent, borderRadius: size * 0.12 }} />
  </div>
);

export const Tick = ({
  color = "#45a7e3",
  size = 26,
}: {
  color?: string;
  size?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M7 16.5 13 22 25 9"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Shell = ({
  children,
  index,
  accent,
  style,
}: {
  children: ReactNode;
  index: string;
  accent: string;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      data-scene={index}
      style={{
        background: "#f8fafc",
        color: "#11181e",
        overflow: "hidden",
        fontFamily: '"Segoe UI", Arial, sans-serif',
        clipPath:
          index === "03" || index === "05"
            ? `inset(0 0 0 ${(1 - ease(frame, fps, 0, 0.4)) * 100}%)`
            : `inset(0 ${(1 - ease(frame, fps, 0, 0.4)) * 100}% 0 0)`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: 900,
          top: 30,
          background: `radial-gradient(circle, ${accent}16, transparent 68%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 85,
          display: "flex",
          gap: 18,
          alignItems: "center",
        }}
      >
        <Mark accent={accent} size={32} />
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 3 }}>
          MAKE ROOM
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 87,
          fontSize: 21,
          color: "#73818b",
          letterSpacing: 2,
        }}
      >
        A WORKSPACE MOTION STUDY
      </div>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 4.4 * fps], [1, 1.025], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 140,
          bottom: 66,
          fontSize: 20,
          letterSpacing: 2,
          color: "#6b7b86",
        }}
      >
        {index} / 05
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          bottom: 72,
          display: "flex",
          gap: 10,
        }}
      >
        {["01", "02", "03", "04", "05"].map((n) => (
          <div
            key={n}
            style={{
              width: n === index ? 44 : 10,
              height: 6,
              borderRadius: 5,
              background: n === index ? accent : "#dbe3e8",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Headline = ({
  children,
  style,
  centered = false,
}: {
  children: string;
  style?: CSSProperties;
  centered?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-headline
      style={{
        position: "absolute",
        left: 148,
        top: 250,
        width: 790,
        fontSize: 106,
        lineHeight: 1.07,
        letterSpacing: -5,
        fontWeight: 600,
        textAlign: centered ? "center" : "left",
        ...style,
      }}
    >
      {children.split("\n").map((line, i) => (
        <div key={i} style={{ overflow: "hidden", paddingBottom: 12 }}>
          <div
            style={{
              opacity: ease(frame, fps, 0.12 + i * 0.14, 0.65 + i * 0.14),
              translate: `0px ${(1 - ease(frame, fps, 0.12 + i * 0.14, 0.95 + i * 0.14)) * 100}px`,
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};

type CardProps = {
  title: string;
  subtitle: string;
  accent: string;
  tag: string;
  style?: CSSProperties;
};
const CardInner: React.FC<CardProps> = ({
  title,
  subtitle,
  accent,
  tag,
  style,
}) => (
  <Interactive.Div
    style={{
      position: "absolute",
      width: 440,
      padding: "28px 32px",
      borderRadius: 24,
      background: "#ffffff",
      border: "1px solid #e7edf2",
      boxShadow: "0 24px 60px #213d5212, 0 4px 12px #213d5205",
      fontFamily: '"Segoe UI", Arial, sans-serif',
      color: "#17212b",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#6b7b86",
          fontSize: 18,
        }}
      >
        <span
          style={{ width: 9, height: 9, borderRadius: 9, background: accent }}
        />
        {tag}
      </span>
      <span style={{ color: "#94a3ad", fontSize: 20 }}>···</span>
    </div>
    <div
      style={{
        fontSize: 32,
        lineHeight: 1.2,
        fontWeight: 600,
        letterSpacing: -0.7,
      }}
    >
      {title}
    </div>
    <div style={{ marginTop: 12, color: "#73818b", fontSize: 22 }}>
      {subtitle}
    </div>
    <div
      style={{
        marginTop: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          padding: "7px 13px",
          background: `${accent}14`,
          color: accent,
          borderRadius: 9,
          fontSize: 17,
          fontWeight: 600,
        }}
      >
        Creative workspace
      </div>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          background: "#eef3f7",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Tick size={20} color={accent} />
      </div>
    </div>
  </Interactive.Div>
);
export const TaskCard = Interactive.withSchema({
  Component: CardInner,
  componentName: "<TaskCard>",
  wrapInSequence: true,
  schema: {
    title: {
      type: "text-content",
      default: "A new idea",
      description: "Card title",
    },
    subtitle: {
      type: "text-content",
      default: "Capture the spark.",
      description: "Subtitle",
    },
    accent: { type: "color", default: "#45a7e3", description: "Card accent" },
    tag: { type: "text-content", default: "IDEA", description: "Status label" },
  },
});

export const Phone = ({
  accent,
  style,
}: {
  accent: string;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      width: 352,
      height: 690,
      padding: 11,
      borderRadius: 58,
      background: "#1c252c",
      boxShadow: "0 38px 80px #1d476c30, inset 0 0 0 2px #ffffff80",
      ...style,
    }}
  >
    <div
      style={{
        height: "100%",
        background: "#fbfcfe",
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 13,
          left: 113,
          width: 104,
          height: 29,
          borderRadius: 28,
          background: "#17212b",
        }}
      />
      <div style={{ padding: "22px 24px", fontSize: 15, fontWeight: 600 }}>
        9:41
      </div>
      <div style={{ padding: "38px 24px 0" }}>
        <div style={{ fontSize: 15, color: "#71818e" }}>
          A little space to think.
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 34,
            letterSpacing: -1.5,
            fontWeight: 650,
          }}
        >
          My workspace
        </div>
        <div
          style={{
            background: `${accent}13`,
            borderRadius: 20,
            padding: "22px 20px",
            marginTop: 25,
          }}
        >
          <Mark accent={accent} size={32} />
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 22 }}>
            A fresh perspective
          </div>
          <div style={{ marginTop: 7, fontSize: 15, color: "#71818e" }}>
            One good idea at a time.
          </div>
          <div
            style={{
              height: 5,
              borderRadius: 5,
              background: "#dbe5ec",
              marginTop: 25,
            }}
          >
            <div
              style={{
                width: "76%",
                height: 5,
                borderRadius: 5,
                background: accent,
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: 30,
            marginBottom: 12,
          }}
        >
          Today, made simple
        </div>
        {["Gather inspiration", "Shape the idea", "Make something good"].map(
          (t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "17px 0",
                borderBottom: "1px solid #e9eff3",
                fontSize: 15,
              }}
            >
              <div
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 8,
                  background: i < 2 ? `${accent}18` : "#edf2f6",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {i < 2 ? <Tick size={17} color={accent} /> : null}
              </div>
              {t}
            </div>
          ),
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 111,
          width: 110,
          height: 5,
          background: "#1c252c",
          borderRadius: 10,
        }}
      />
    </div>
  </div>
);
