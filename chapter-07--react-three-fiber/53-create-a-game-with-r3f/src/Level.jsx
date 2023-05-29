import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";

THREE.ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export function BlockStart({ position = [0, 0, 0] }) {
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

export function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor1Material}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
        <RigidBody
          type="fixed"
          colliders="hull"
          position={[0, 0.25, 0]}
          restitution={0.2}
          friction={0}
        >
          <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>
      </group>
    </>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
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

export function BlockLimbo({ position = [0, 0, 0] }) {
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

function BlockAxe({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);
  const [timeOffset, setTimeOffset] = useState(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
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
            scale={[1.5, 1.5, 0.3]}
            castShadow
            receiveShadow
          />
        </RigidBody>
      </group>
    </>
  );
}

export const Level = ({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
}) => {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
    </>
  );
};
