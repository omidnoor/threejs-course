import { OrbitControls, useGLTF } from "@react-three/drei";
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
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const twister = useRef();
  const [hitSound, setHitSound] = useState(() => {
    return new Audio("./hit.mp3");
  });

  const cubeJump = () => {
    console.log(cube.current.applyImpulse);
    const cubeMass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: cubeMass * 5, z: 0 });
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

  useFrame((state) => {
    // console.log(state.clock.getElapsedTime());
    const time = state.clock.getElapsedTime();

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random() * 0.2 + 0.8;
    // hitSound.play();
  };

  const hamburger = useGLTF("./hamburger.glb");

  const cubesCount = 3;

  const cubes = useRef();

  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([i * 2, 0, 0]);
      rotations.push([0, 0, 0]);
      scales.push([1, 1, 1]);
    }

    return { positions, rotations, scales };
  }, []);

  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         new THREE.Vector3(i * 2, 0, 0),
  //         new THREE.Quaternion(),
  //         new THREE.Vector3(1, 1, 1),
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []);

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

        <RigidBody
          ref={cube}
          friction={0.7}
          colliders={false}
          position={[1.5, 2, 0]}
          scale={1}
          onCollisionEnter={collisionEnter}
          //   onCollisionExit={() => {
          //     console.log("exit");
          //   }}
          //   onSleep={() => {
          //     console.log("sleep");
          //   }}
          //   onWake={() => {
          //     console.log("wake");
          //   }}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={0.4} />
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
        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          friction={0.7}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, 4, 0]} colliders={false}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 1.5, 0.25]} position={[0, 0, -5.25]} />
          <CuboidCollider args={[5, 1.5, 0.25]} position={[0, 0, 5.25]} />
          <CuboidCollider args={[0.25, 1.5, 5]} position={[-5.25, 0, 0]} />
          <CuboidCollider args={[0.25, 1.5, 5]} position={[5.25, 0, 0]} />
        </RigidBody>
        <InstancedRigidBodies
          positions={cubeTransforms.positions}
          rotations={cubeTransforms.rotations}
          scales={cubeTransforms.scales}
        >
          <instancedMesh castShadow ref={cubes} args={[null, null, cubesCount]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="salmon" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
