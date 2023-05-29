import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  BallCollider,
  RoundCuboidCollider,
  CylinderCollider,
  CapsuleCollider,
  ConeCollider,
  ConvexHullCollider,
  TrimeshCollider,
  HeightfieldCollider,
} from "@react-three/rapier";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  const cubeJump = () => {
    console.log(cube.current.applyImpulse);
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const sphereJump = () => {
    sphere.current.applyImpulse({ x: 0, y: 30, z: 0 });
    sphere.current.applyTorqueImpulse({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
    });
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.8, 0]}>
        <Debug />
        <RigidBody
          colliders="ball"
          gravityScale={1}
          ref={sphere}
          restitution={1}
        >
          <mesh castShadow position={[-1.5, 2, 0]} onClick={sphereJump}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody ref={cube} friction={0}>
          <mesh castShadow position={[1.5, 2, 0]} scale={1} onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* <RigidBody colliders="hull">
          <mesh rotation-x={Math.PI * 0.5 * 0.1} position={[1, -0.5, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        {/* <RigidBody colliders="trimesh">
          <mesh rotation={[Math.PI * 0.5, 0, 0]} position={[0, 1, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        {/* <RigidBody
          colliders={false}
          rotation={[Math.PI * 0.5, 0, 0]}
          position={[0, 1, 0]}
        > */}
        {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[Math.PI * 0.5 * 0.1, 0, 0]}
          /> */}
        {/* <BallCollider
            args={[1.5]}
            // position={[0, 0, 1]}
            // rotation={[Math.PI * 0.5 * 0.1, 0, 0]}
          /> */}
        {/* <mesh>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        {/* <RigidBody type="fixed" restitution={1}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody> */}
        <RigidBody type="fixed" friction={0}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
