import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  softShadows,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 17,
  rings: 11,
});

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();

  //   const lightHelper = useHelper(
  //     directionalLight,
  //     THREE.DirectionalLightHelper,
  //     1,
  //   );

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <BakeShadows />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-right={5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
