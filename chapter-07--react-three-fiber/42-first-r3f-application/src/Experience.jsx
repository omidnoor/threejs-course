import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls });

const Experience = () => {
  const cubeRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.z += delta;
    cubeRef.current.rotation.x += delta;
    cubeRef.current.rotation.y += delta;
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 1, 1]} color={"white"} intensity={1} />
      <ambientLight intensity={0.5} />

      <group>
        <mesh position-x={2} ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color={"mediumpurple"} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>
      <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
      <CustomObject />
    </>
  );
};
export default Experience;
