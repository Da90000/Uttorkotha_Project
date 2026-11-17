# Coast to Coast — Bengali sound edit

Open `CoastToCoastBengali` in Studio for the sound version. The original `CoastToCoast` composition remains silent. Both run for 480 frames / 16 seconds at 30 fps.

## Narration

Voice: `bn-BD-PradeepNeural`, synthesized using Microsoft Edge online speech through the open-source `edge-tts` library at -4% rate. No cloned voice. These are generated narration clips, not a transcription of a supplied recording.

| Start | Actual file duration | Bengali script |
| --- | --- | --- |
| 0.500 s / frame 15 | 2.928 s | লস অ্যাঞ্জেলেস থেকে যাত্রা শুরু। |
| 4.000 s / frame 120 | 2.880 s | পশ্চিম থেকে পূর্বে এগিয়ে চলি। |
| 7.700 s / frame 231 | 2.928 s | প্রায় চার হাজার কিলোমিটার পেরিয়ে। |
| 11.700 s / frame 351 | 2.472 s | পৌঁছে যাই নিউ ইয়র্কে। |

The roughly four-thousand-kilometer line rounds the existing Turf great-circle distance (3,936 km); it does not claim a road distance.

Each clip has a separate normalized WAV in `public/audio/coast-to-coast/`, targeted to -17 LUFS with a -2 dBTP ceiling. The unprocessed MP3s and generation manifest are retained. `voiceover-bengali.wav` is an optional standalone narration stem with the same pauses and offsets.

## Music and effects

Original procedural instrumental, composed in `tools/compose-route-audio.mjs`: soft stereo pads, plucked melody, a restrained pulse, and a fading close. No third-party samples, artist imitation, or vocals. Sound effects are synthesized from deterministic noise sweeps and sine tones.

`src/route/RouteSoundtrack.tsx` contains all editable placements and levels:

- Music: starts at 0; volume 0.22 with entrance and exit fades.
- Departure lift: frame 53, volume 0.24.
- Camera pass: frame 209, volume 0.25.
- Arrival chime: frame 360, volume 0.28.

## Regenerate

An isolated environment under ignored `out/audio-env/` contains `edge-tts==7.3.1`. The generated files are included, so preview/render do not require this Python environment or a speech-service connection. Map tiles still require internet.

```powershell
python -m venv out/audio-env
out/audio-env/Scripts/python.exe -m pip install edge-tts==7.3.1
out/audio-env/Scripts/python.exe tools/generate-route-voice.py
node tools/compose-route-audio.mjs
node tools/mix-route-audio.mjs
npx remotion render CoastToCoastBengali out/coast-to-coast-bengali.mp4 --gl=angle --concurrency=1
```

The voice generator reuses existing nonempty MP3s. When changing copy, rename the segment before regenerating so the previous recording remains available. FFmpeg is required to measure and normalize audio.

Speech tool documentation: https://github.com/rany2/edge-tts
