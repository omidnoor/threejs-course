import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

THREE.ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obsticleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
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
function BlockSpiner({ position = [0, 0, 0] }) {
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
        <RigidBody type="kinematicPosition" restitution={0.2} friction={0}>
          <mesh
            geometry={boxGeometry}
            material={obsticleMaterial}
            scale={[3.5, 0.3, 0.3]}
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
      <BlockStart position={[0, 0, 4]} />
      <BlockSpiner position={[0, 0, 0]} />
    </>
  );
};
export default Level;
