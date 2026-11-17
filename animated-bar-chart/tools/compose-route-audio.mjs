// Original deterministic score and effects. No samples or third-party recordings.
import {mkdirSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = path.join(root, 'public/audio/coast-to-coast');
mkdirSync(dest, {recursive: true});
const sr = 48000;
const hz = midi => 440 * 2 ** ((midi - 69) / 12);
const tau = 2 * Math.PI;
function wav(name, seconds, synth) {
  const count = Math.ceil(sr * seconds);
  const buffer = Buffer.alloc(44 + count * 4);
  buffer.write('RIFF', 0); buffer.writeUInt32LE(36 + count * 4, 4);
  buffer.write('WAVEfmt ', 8); buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(2, 22);
  buffer.writeUInt32LE(sr, 24); buffer.writeUInt32LE(sr * 4, 28);
  buffer.writeUInt16LE(4, 32); buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36); buffer.writeUInt32LE(count * 4, 40);
  let peak = 0;
  for (let i = 0; i < count; i++) {
    const pair = synth(i / sr, i);
    for (let ch = 0; ch < 2; ch++) {
      peak = Math.max(peak, Math.abs(pair[ch]));
      buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, pair[ch])) * 32767), 44 + i * 4 + ch * 2);
    }
  }
  writeFileSync(path.join(dest, name), buffer);
  console.log(`${name}: ${seconds}s, peak ${peak.toFixed(3)}`);
}
const chords = [[50,57,61,66], [47,54,57,62], [43,50,54,59], [45,52,57,61]];
const melody = [74, 69, 78, 76, 74, 71, 69, 66, 67, 74, 78, 81, 76, 73, 69, 74];
wav('music-original.wav', 16, t => {
  const stereo = [0, 0];
  for (let c = 0; c < 4; c++) {
    const local = t - c * 4;
    if (local < 0 || local > 5) continue;
    const env = Math.min(1, local / .7) * Math.min(1, (5 - local) / 1.2);
    chords[c].forEach((note, n) => {
      for (let ch = 0; ch < 2; ch++) {
        const f = hz(note) * (1 + (ch === 0 ? -.0008 : .0008));
        stereo[ch] += .075 * env * (Math.sin(tau*f*t + n) + .15*Math.sin(tau*2*f*t + n));
      }
    });
  }
  for (let n = 0; n < melody.length; n++) {
    const local = t - (1 + n * .75);
    if (local < 0 || local > 2.2) continue;
    const f = hz(melody[n]);
    const env = Math.min(1, local / .012) * Math.exp(-local*3.5);
    const pluck = .13 * env * (Math.sin(tau*f*local) + .25*Math.sin(tau*f*2*local));
    stereo[0] += pluck * (n % 2 ? .7 : 1);
    stereo[1] += pluck * (n % 2 ? 1 : .7);
    const echo = local - .22;
    if (echo > 0) stereo[n % 2] += .025*Math.sin(tau*f*echo)*Math.exp(-echo*3);
  }
  const beat = (t - 2) % .75;
  if (t > 2 && t < 13 && beat < .18) {
    const kick = .055*Math.sin(tau*(55*beat+5*(1-Math.exp(-beat*30))))*Math.exp(-beat*28);
    stereo[0] += kick; stereo[1] += kick;
  }
  const fade = Math.min(1, t/.8) * Math.max(0, Math.min(1, (16-t)/1.6));
  return stereo.map(v => v * fade);
});
let seed = 73129;
const noise = () => {seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 2147483648 - 1;};
let smooth = 0;
wav('sfx-departure.wav', 1.8, t => {
  smooth = .88*smooth + .12*noise();
  const env = Math.sin(Math.PI*t/1.8)**2;
  const sweep = .13*Math.sin(tau*(100*t+150*t*t))*env;
  return [(smooth*.7+sweep)*env, (smooth*.65+sweep)*env];
});
wav('sfx-pass.wav', 1.4, t => {
  smooth = .83*smooth + .17*noise();
  const env = Math.sin(Math.PI*t/1.4)**3;
  return [smooth*env*.6*(1-t/1.4), smooth*env*.6*t/1.4];
});
wav('sfx-arrival.wav', 2.8, t => {
  let v = 0;
  [74,78,81].forEach((n,i) => {
    const dt = t-i*.12;
    if (dt >= 0) v += .14*Math.sin(tau*hz(n)*dt)*Math.exp(-dt*2.8)*Math.min(1,dt/.008);
  });
  const fade = Math.min(1, (2.8-t)/.35);
  return [v*fade, v*fade*.95];
});
