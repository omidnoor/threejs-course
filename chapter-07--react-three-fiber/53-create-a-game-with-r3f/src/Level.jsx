import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

THREE.ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor1Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </group>
    </>
  );
}
function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);
  const [speed, setSpeed] = useState(() => {
    return (Math.random() + 0.4) * (Math.random() < 0.5 ? -1 : 1);
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor2Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          castShadow
          receiveShadow
        />
        <RigidBody
          type="kinematicPosition"
          restitution={0.2}
          friction={0}
          ref={obstacle}
        >
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[3.5, 0.4, 0.3]}
            position={[0, 0.2, 0]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

function BlockLimbo({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);
  const [timeOffset, setTimeOffset] = useState(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.2;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: y,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor2Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          castShadow
          receiveShadow
        />
        <RigidBody
          type="kinematicPosition"
          restitution={0.2}
          friction={0}
          ref={obstacle}
        >
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[3.5, 0.4, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 12]} />
      <BlockSpinner position={[0, 0, 8]} />
      <BlockLimbo position={[0, 0, 4]} />
    </>
  );
};
export default Level;
