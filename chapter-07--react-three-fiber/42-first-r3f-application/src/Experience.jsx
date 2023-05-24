import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Experience = () => {
  const cubeRef = useRef();
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.z += 0.01;
  });

  return (
    <>
      <mesh position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshBasicMaterial color={"mediumpurple"} />
      </mesh>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color={"orange"} />
      </mesh>
      <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 5]} />
        <meshBasicMaterial color={"blue"} />
      </mesh>
    </>
  );
};
export default Experience;
