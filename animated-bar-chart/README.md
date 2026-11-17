# Animated five-bar chart

A 7-second, 1920 x 1080 Remotion composition at 30 fps. Five bars rise in sequence with synchronized count-up labels, then hold for reading. Values are illustrative sample data, not historical or performance claims.

## Preview

```powershell
npm ci
npm run dev
```

Open the Studio URL and choose **FiveBarChart**. Press Play to preview; Loop repeats the animation.

## Customize

Select **Bar A** through **Bar E** in Studio to edit each label, value (0-100), or color. The five separate ChartBar nodes in src/Composition.tsx also expose these values directly. Animation is driven entirely by the current frame, so seeking is deterministic.

Default values: A = 35, B = 52, C = 68, D = 81, E = 95. The vertical axis starts at zero and ends at 100. All bars use the same pixel scale and easing.

## Check

```powershell
npm run lint
```

## Optional export

Use Studio's Render button, or run:

```powershell
npx remotion render src/index.ts FiveBarChart out/five-bar-chart.mp4
```

No external image, font, audio, or API key is required.

## Make Room — reference-led motion graphics

Choose **MakeRoom** in Studio for the new 20-second, 1920 x 1080 composition. It is silent, following the user's instruction to work without voiceover. Five original scenes interpret the reference's white, ice-blue, rounded-card visual language: Gather, Organize, Refine, Focus, and Make Room.

The current preview is at http://localhost:3001/MakeRoom. When restarting Studio, use the address it prints; its port may differ.

Double-click a scene in the main timeline, or open it from **MakeRoom-Scenes**, to edit its own timeline. Select the scene to adjust its headline or accent color. Inside Gather, Organize, and ResolveScene, select task-card layers to edit their titles, subtitles, labels, and colors. These edits are saved to the source by Studio.

The scene files are in `src/make-room/`; `design.tsx` contains the shared editable card, phone illustration, type, and motion helpers. The main timing and connected-composition registrations are in `src/make-room/MakeRoom.tsx`.

Full animation plan and reference analysis: `../assets/motion-graphics-planning/`.

Export from Studio with **Render**, or run this when an MP4 is needed:

```powershell
npx remotion render src/index.ts MakeRoom out/make-room.mp4
```

Validation: lint/TypeScript passed; frames from all five scenes, the final hold, and all four transitions rendered successfully. Refine also rendered as a standalone connected composition. The original five-bar chart source was preserved exactly as found at the start of this work.
