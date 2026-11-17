# Make room — silent workspace motion study

Approved route: Remotion in the existing Studio project, without voiceover. This is an original, unbranded workspace concept inspired by the supplied reference, with fictional interface content. It does not advertise verified capabilities of an actual product.

Format: 1920 × 1080, 30 fps, 600 frames / 20 seconds. No speech, music, or sound effects in this version. Transcription and speech synchronization are not applicable after the user's clarification.

## Complete timeline

Times are seconds. Frames are zero-based. The 0.4-second scene overlaps are included in the total of 600 frames.

| Section | Time / frames | Visual concept and on-screen text | Movement and pacing | Transition | Optional future sound |
| --- | --- | --- | --- | --- | --- |
| 01 — Gather | 0.0–4.4 / 0–131 | "Space for / your next idea." Two original idea cards and a confirmation widget float above a pale-blue field. | Headline lines reveal in order; cards enter on staggered springs, then drift gently. Hold the headline while the camera slowly pushes. | Reuse card shapes and the pale-blue surface in the board scene. A white surface wipes across over 0.4 s. | Soft paper-like arrivals; omitted in this silent version. |
| 02 — Organize | 4.0–8.4 / 120–251 | "Everything. In its right place." Three columns: Ideas, In progress, Ready. | Cards arrive loosely and align into separate columns. Selected accents, numbered column badges, and a restrained camera pan establish hierarchy. | The selected blue card motivates the next large design preview. 0.4 s white-surface wipe, alternating direction between scenes. | Three quiet alignment ticks; omitted. |
| 03 — Refine | 8.0–12.4 / 240–371 | "Good ideas. / Better versions." An editable design preview with Version 1, Version 2, Version 3. Supporting line: "Keep the good. Refine the rest." | A selector slides to successive versions. The preview changes layout and color emphasis, a pointer presses the selector, and a Saved badge settles. Hold Version 3. | The selected circular detail anticipates the focus ring. 0.4 s white-surface wipe, alternating direction between scenes. | Two soft UI taps and one confirmation; omitted. |
| 04 — Focus | 12.0–16.4 / 360–491 | "Less noise. / More momentum." Task checklist plus a progress ring explicitly marked as an illustrative preview. | Three checks complete in sequence; the ring counts from 0 to 100. Gentle camera push. Hold the completed state before the transition. | Carry the rounded interface vocabulary and completed check into the final phone composition. 0.4 s white-surface wipe, alternating direction between scenes. | Subtle completion tones; omitted. |
| 05 — Resolve | 16.0–20.0 / 480–599 | "Make room for / what matters." An original phone workspace, floating task and focus widgets, and "An original workspace motion study." | Phone rises with a small controlled settle, foreground cards move at different rates, final headline reveals. All important elements settle before the last 1.5 s reading hold. | End on the finished frame; no forced fade to black. | Gentle final arrival; omitted. |

## Editable organization

- Main composition: `MakeRoom`.
- Five separately named scene nodes; each is also a connected composition in `MakeRoom-Scenes`.
- Each scene exposes its headline and accent color. Cards expose title, subtitle, accent, and status.
- All movement is frame-driven, so scrubbing, replay, and still rendering produce the same result.
- Existing user changes in the five-bar chart remain separate and untouched.

## Backup and verification

Source/config backup saved under `animated-bar-chart/out/backups/pre-workspace-motion-20261117/` before implementation. This output folder is excluded from Git.

Verify lint/TypeScript, sample every scene and transition, inspect readable holds and the final frame, confirm connected scenes work independently, and confirm Studio playback before delivery. Studio is the primary editable deliverable; full MP4 export can be started with its Render button.

## Delivery checks

Lint and TypeScript passed. Rendered sample frames from all five scenes, all four transition boundaries, and the final reading hold. Replaced text-overlapping crossfades with clean horizontal surface wipes. Rendered Refine independently to verify its connected scene. Studio opened successfully at http://localhost:3001/MakeRoom without a visible error overlay. Full video export has not been started; the editable Studio composition is the deliverable.
