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
