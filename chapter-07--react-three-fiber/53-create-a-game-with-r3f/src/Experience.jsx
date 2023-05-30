// import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level, BlockLimbo, BlockSpinner } from "./Level.jsx";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} />
        <Player />
      </Physics>
    </>
  );
}
