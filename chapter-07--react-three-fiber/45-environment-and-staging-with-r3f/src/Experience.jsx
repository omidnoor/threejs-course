import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  PivotControls,
  ContactShadows,
  Sky,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();

  //   const lightHelper = useHelper(
  //     directionalLight,
  //     THREE.DirectionalLightHelper,
  //     1,
  //   );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.rotation.y += delta * 0.2;
    // cube.current.position.x = 2 + Math.sin(time);
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: {
      min: 0,
      max: 1,
      value: 0.4,
      step: 0.01,
    },
    blur: {
      min: 0,
      max: 10,
      value: 2.8,
      step: 0.01,
    },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  return (
    <>
      {/* <BakeShadows /> */}

      {/* <SoftShadows
        frustum={3.8}
        size={0.001}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color={0x316d39}
        opacity={0.8}
        frames={600}
        temporal
        blend={100}
      >
        <RandomizedLight
          ref={directionalLight}
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          intensity={1}
          ambient={0.5}
          bias={0.01}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={1024}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1} // 1 frame means shadow is baked
      />

      <directionalLight
        ref={directionalLight}
        position={sunPosition}
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

      <Sky sunPosition={sunPosition} />

      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <PivotControls> */}
      <mesh ref={cube} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* </PivotControls> */}

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        // receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
