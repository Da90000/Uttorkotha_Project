"""Generate four editable Bengali narration clips using edge-tts.
Run with out/audio-env/Scripts/python.exe tools/generate-route-voice.py.
"""
import asyncio
import json
from pathlib import Path
import subprocess
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "audio" / "coast-to-coast"
VOICE = "bn-BD-PradeepNeural"
LINES = [
    ("01-departure", 15, "লস অ্যাঞ্জেলেস থেকে যাত্রা শুরু।"),
    ("02-journey", 120, "পশ্চিম থেকে পূর্বে এগিয়ে চলি।"),
    ("03-distance", 231, "প্রায় চার হাজার কিলোমিটার পেরিয়ে।"),
    ("04-arrival", 351, "পৌঁছে যাই নিউ ইয়র্কে।"),
]

async def main():
    DEST.mkdir(parents=True, exist_ok=True)
    voices = await edge_tts.list_voices()
    if not any(v["ShortName"] == VOICE for v in voices):
        raise RuntimeError(f"Requested Bengali voice unavailable: {VOICE}")
    segments = []
    for name, start_frame, text in LINES:
        output = DEST / f"{name}.mp3"
        events = []
        if not output.exists() or output.stat().st_size < 5000:
            for attempt in range(3):
                try:
                    events = []
                    with output.open("wb") as audio:
                        async for event in edge_tts.Communicate(text, VOICE, rate="-4%").stream():
                            if event["type"] == "audio":
                                audio.write(event["data"])
                            elif event["type"] in ("WordBoundary", "SentenceBoundary"):
                                events.append({k: v for k, v in event.items() if k != "data"})
                    break
                except edge_tts.exceptions.NoAudioReceived:
                    if attempt == 2:
                        raise
                    await asyncio.sleep(1)
        duration = float(subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", str(output)
        ], text=True).strip())
        segments.append({"file": f"{name}.mp3", "from": start_frame, "text": text,
                         "durationSeconds": duration, "boundaries": events})
        print(f"{name}: {duration:.3f}s at frame {start_frame}")
    for i, segment in enumerate(segments):
        limit = segments[i+1]["from"] / 30 if i+1 < len(segments) else 15.7
        if segment["from"] / 30 + segment["durationSeconds"] > limit:
            raise RuntimeError(f"Narration exceeds its slot: {segment['file']}")
    manifest = {"provider": "Microsoft Edge online speech via edge-tts", "voice": VOICE,
                "rate": "-4%", "fps": 30, "segments": segments}
    (DEST / "narration.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    asyncio.run(main())
