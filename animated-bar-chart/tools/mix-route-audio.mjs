import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = path.join(root, 'public/audio/coast-to-coast');
const manifest = JSON.parse(readFileSync(path.join(dest, 'narration.json'), 'utf8'));
function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], {stdio: 'inherit'});
  if (result.status !== 0) throw new Error('Audio processing failed');
}
for (const s of manifest.segments) {
  ffmpeg(['-i', path.join(dest,s.file), '-af', 'loudnorm=I=-17:TP=-2:LRA=9', '-ar', '48000', '-ac', '2', path.join(dest,s.file.replace('.mp3','-normalized.wav'))]);
}
// A standalone voiceover stem mirrors the four editable Remotion voice tracks.
const names = manifest.segments.map(s => s.file.replace('.mp3','-normalized.wav'));
const inputs = names.flatMap(file => ['-i', path.join(dest,file)]);
const filters = manifest.segments.map((s,i) => `[${i}:a]adelay=${Math.round(s.from / 30 * 1000)}:all=1[v${i}]`);
filters.push('[v0][v1][v2][v3]amix=inputs=4:normalize=0,apad,atrim=duration=16[vo]');
ffmpeg([...inputs, '-filter_complex', filters.join(';'), '-map', '[vo]', '-ar', '48000', path.join(dest,'voiceover-bengali.wav')]);
console.log('Bengali narration normalized; standalone 16-second voiceover stem exported.');
