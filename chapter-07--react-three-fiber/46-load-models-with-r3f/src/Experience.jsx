import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Suspense } from "react";
import Model from "./Model";
import Placeholder from "./Placeholder";
import Hamburger from "./Hamburger";

export default function Experience() {
  //   const model = useLoader(GLTFLoader, "./hamburger.glb");
  //   const model = useLoader(GLTFLoader, "./hamburger-draco.glb", (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   });
  //   const model = useLoader(
  //     GLTFLoader,
  //     "./FlightHelmet/glTF/FlightHelmet.gltf",
  //     (loader) => {
  //       const dracoLoader = new DRACOLoader();
  //       dracoLoader.setDecoderPath("./draco/");
  //       loader.setDRACOLoader(dracoLoader);
  //     },
  //   );

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.2} />
      </Suspense>
      {/* <primitive object={model.scene} scale={0.35} position={[-3, -1, 0]} /> */}
    </>
  );
}
