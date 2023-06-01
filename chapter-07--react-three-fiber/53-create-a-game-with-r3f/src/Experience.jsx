// import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level, BlockLimbo, BlockSpinner } from "./Level.jsx";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame";
import Effects from "./Effects.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={["#252731"]} />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
        <Effects />
      </Physics>
    </>
  );
}
