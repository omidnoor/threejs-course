import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls: OrbitControls });

const Experience = () => {
  const cubeRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.z += delta;
    cubeRef.current.rotation.x += delta;
    cubeRef.current.rotation.y += delta;
  }, []);

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <group>
        <mesh position-x={2} ref={cubeRef}>
          <boxGeometry />
          <meshBasicMaterial color={"mediumpurple"} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color={"orange"} />
        </mesh>
      </group>
      <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 5]} />
        <meshBasicMaterial color={"blue"} />
      </mesh>
    </>
  );
};
export default Experience;
