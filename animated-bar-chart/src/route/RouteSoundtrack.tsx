import {Audio} from "@remotion/media";
import {interpolate, staticFile, useCurrentFrame} from "remotion";

const audio = (file: string) => staticFile(`audio/coast-to-coast/${file}`);

// Four separate narration clips preserve natural pauses and editable sync points.
export const RouteSoundtrack = () => {
  const frame = useCurrentFrame();
  const musicLevel = interpolate(frame, [0, 25, 420, 479], [0, 0.22, 0.22, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <>
    <Audio name="Original music — soft travel score" src={audio("music-original.wav")} volume={musicLevel} />
    <Audio name="বাংলা — যাত্রা শুরু" from={15} src={audio("01-departure-normalized.wav")} />
    <Audio name="বাংলা — পশ্চিম থেকে পূর্বে" from={120} src={audio("02-journey-normalized.wav")} />
    <Audio name="বাংলা — চার হাজার কিলোমিটার" from={231} src={audio("03-distance-normalized.wav")} />
    <Audio name="বাংলা — নিউ ইয়র্কে পৌঁছানো" from={351} src={audio("04-arrival-normalized.wav")} />
    <Audio name="Departure — soft lift" from={53} src={audio("sfx-departure.wav")} volume={0.24} />
    <Audio name="Camera pass — gentle whoosh" from={209} src={audio("sfx-pass.wav")} volume={0.25} />
    <Audio name="Arrival — resolved chime" from={360} src={audio("sfx-arrival.wav")} volume={0.28} />
  </>;
};
