import { MyComposition } from "./Composition";
import { MakeRoomCompositions } from "./make-room/MakeRoom";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MakeRoomCompositions />
    </>
  );
};
