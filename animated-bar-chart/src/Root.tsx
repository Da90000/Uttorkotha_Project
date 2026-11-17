import { MyComposition } from "./Composition";
import { MakeRoomCompositions } from "./make-room/MakeRoom";
import { RouteCompositions } from "./route/CoastToCoast";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MakeRoomCompositions />
      <RouteCompositions />
    </>
  );
};
