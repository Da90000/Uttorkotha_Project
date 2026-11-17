# Reference-led motion graphics — creative direction

Status: reference analysis complete; narration timing and editor selection pending.

## Supplied reference

One image inspected: `C:/Users/Motion Designer/Downloads/4cfc3c1d7f850dcce23f1f9d1ce47bd8.jpg`.

The image is a tall promotional layout containing a website mockup. Its marketing text and logos are reference content, not approved copy or evidence of capabilities for the new video.

| Aspect | Observed in the reference | Direction for the video |
| --- | --- | --- |
| Layout | Left-aligned promotional heading above a white-framed website; centered hero; paired feature cards below | Build one clear focal point per shot. Alternate centered hero shots with spacious two-card layouts. |
| Typography | Very bold black display heading; lighter sans-serif hero text; small, understated supporting labels | Use sharp sans-serif headlines with short line lengths. Distinguish headline, widget label, and supporting text by scale and weight. |
| Color | Muted blue-gray outer field; white sections; vivid sky-blue hero fading to pale blue; black text | Mostly white or near-white frames, ice-blue accents, dark text. Reserve stronger blue for the main action or a key phrase. |
| Depth | Soft card shadows, layered task cards, a phone overlapping the hero, translucent panels | Use soft contact shadows, modest layer separation, and small differences in movement speed. |
| Hierarchy | Large headline first, phone/product second, floating widgets third; generous space between sections | Make the spoken idea visually dominant. Use interface details only when they explain that idea. |
| Shape | Rounded panels, pill controls, rounded phone silhouette | Repeat a consistent rounded-card and pill vocabulary. |

## Working design system

Colors below are approximate art-direction choices, not sampled brand tokens.

- Background: `#FAFBFC`; card: `#FFFFFF`; primary text: `#101418`; secondary text: `#667580`.
- Accent: `#4CA9E5`; pale accent: `#E8F4FC`; optional outer blue-gray: `#ADC4CF`.
- Use a subtle pale-blue glow behind hero objects; keep text on a sufficiently solid surface.
- Use generous margins and consistent card padding. Choose output dimensions from the supplied timeline when available; otherwise propose 1920 × 1080 before production.
- Rounded cards should share a common radius; use smaller radii for nested controls and pill radii for selectors.
- Main text should remain legible at normal playback size. Avoid carrying the reference's tiny website copy into the video.
- Create original interface elements; do not reproduce third-party logos or the reference's promotional claims by default.

## Motion language

These are proposed motion ranges, to be adjusted against the actual recording.

- Text: reveal by meaningful phrase, typically 60–100 ms between words and 400–650 ms for the overall entrance. Use a small upward move and opacity, not a continuous stream of flying text.
- Cards: offset entrances by 80–140 ms; move 24–56 px before settling. Limit the short overshoot to approximately 2–4% of travel.
- Widgets: animate the state change that communicates the sentence—sorting, checking, grouping, selecting a version, or tracking progress.
- Camera: occasional 3–5% pushes and slow pans between related objects. Keep important reading passages stable.
- Depth: use restrained foreground/background movement differences. Keep labels attached to their objects.
- Transitions: carry a shared card, pill, edge, or movement direction into the next scene; reserve a simple cut or dissolve for a change of subject.
- Pacing: alternate short action beats with longer reading holds. Determine hold lengths from the spoken phrase and on-screen word count, rather than forcing every sentence into the same duration.
- Sound: consider quiet taps for selection, a short soft swish for major movement, and a gentle confirmation tone for a completed state. Place cues only after identifying the actual phrase timings, and keep speech intelligible.

## Meaning-to-visual examples

These are possible treatments, not claims about an unprovided narration.

| If the recording discusses… | Possible visual |
| --- | --- |
| Organizing ideas | Loose idea cards align into named groups, then settle into a tidy board. |
| Revisions | A version selector advances between visibly different editable states. |
| Saving time | A time widget resolves while repeated steps collapse into one action. |
| Collaboration | Related cards converge into a shared workspace with a clear handoff. |
| A final outcome | A clean hero composition assembles from objects already introduced. |

## Recording and scene plan

No voiceover was attached or found in the current project's media folders during the initial check. Duration, transcript, sentence timings, uncertain words, and full-recording scene coverage are therefore unverified. Do not invent them.

After the recording is identified, create the transcript with sentence and important-phrase start/end times. Mark uncertain speech explicitly and retain the full original audio. Build the complete scene plan with these fields:

`Scene | Audio in/out | Verbatim phrase | Visual concept | On-screen text | Main movement | Transition | Optional sound cue | Editable controls`

Each row must refer to real recording times. Check for gaps, overlaps, and preservation of the entire voiceover, including its start and end.

## Editor check and production gate

- The user tagged Remotion and separately requested native Resolve/Fusion construction. Editor selection needs clarification before implementation.
- No Resolve process or window was found. Standard Resolve executable and scripting README paths were absent; no Resolve entry was returned by the installed-app registry check. No usable Resolve connector was returned by plugin search. This does not exclude a custom installation elsewhere.
- Resolve version, current project, timeline settings, media pool, and native scripting controls remain unverified.
- If Resolve is supplied: inspect its actual version and controls, inspect the existing project/timeline/media pool, save a backup, then build named Fusion scenes using editable text, shapes, masks, transforms, and curves supported by that installation.
- If Remotion is selected: use the existing local Studio toolchain and build a separate composition with editable graphics; retain the five-bar chart and the user's current source edits.
- An existing uncommitted change was observed in `animated-bar-chart/src/Composition.tsx`. Do not overwrite or include it in this planning change.

No timeline or video source was modified during this initial planning pass. No finished video or timecoded animation plan has been produced yet.
