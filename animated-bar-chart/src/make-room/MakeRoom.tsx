import { AbsoluteFill, Composition, Folder, useVideoConfig } from "remotion";
import { Gather } from "./Gather";
import { Organize } from "./Organize";
import { Refine } from "./Refine";
import { Focus } from "./Focus";
import { ResolveScene } from "./ResolveScene";

const MakeRoom: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#f8fafc" }}>
      <Gather
        name="01 — Gather ideas"
        from={0}
        durationInFrames={4.4 * fps}
        premountFor={fps}
        heading={"Space for\nyour next idea."}
        accentColor="#45a7e3"
      />
      <Organize
        name="02 — Organize the board"
        from={4 * fps}
        durationInFrames={4.4 * fps}
        premountFor={fps}
        heading="Everything. In its right place."
        accentColor="#45a7e3"
      />
      <Refine
        name="03 — Refine the versions"
        from={8 * fps}
        durationInFrames={4.4 * fps}
        premountFor={fps}
        heading={"Good ideas.\nBetter versions."}
        accentColor="#45a7e3"
      />
      <Focus
        name="04 — Find the focus"
        from={12 * fps}
        durationInFrames={4.4 * fps}
        premountFor={fps}
        heading={"Less noise.\nMore momentum."}
        accentColor="#45a7e3"
      />
      <ResolveScene
        name="05 — Make room"
        from={16 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
        heading={"Make room for\nwhat matters."}
        accentColor="#45a7e3"
      />
    </AbsoluteFill>
  );
};

export const MakeRoomCompositions = () => (
  <>
    <Composition
      id="MakeRoom"
      component={MakeRoom}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="MakeRoom-Scenes">
      <Composition
        id="Gather"
        component={Gather}
        durationInFrames={132}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          heading: "Space for\nyour next idea.",
          accentColor: "#45a7e3",
        }}
      />
      <Composition
        id="Organize"
        component={Organize}
        durationInFrames={132}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          heading: "Everything. In its right place.",
          accentColor: "#45a7e3",
        }}
      />
      <Composition
        id="Refine"
        component={Refine}
        durationInFrames={132}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          heading: "Good ideas.\nBetter versions.",
          accentColor: "#45a7e3",
        }}
      />
      <Composition
        id="Focus"
        component={Focus}
        durationInFrames={132}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          heading: "Less noise.\nMore momentum.",
          accentColor: "#45a7e3",
        }}
      />
      <Composition
        id="ResolveScene"
        component={ResolveScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          heading: "Make room for\nwhat matters.",
          accentColor: "#45a7e3",
        }}
      />
    </Folder>
  </>
);
