import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect } from "react";
import { useState } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const textMaterial = new THREE.MeshMatcapMaterial();
const donutMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
  //   const [geometry, setGeometry] = useState(null);
  //   const [material, setMaterial] = useState(null);

  const [textMatcapTexture] = useMatcapTexture(
    "605352_E9CCC5_C7A8A3_A89291",
    256,
  );
  const [donutMatcapTexture] = useMatcapTexture(
    "1C70C6_09294C_0F3F73_52B3F6",
    256,
  );

  useEffect(() => {
    textMatcapTexture.outputColor = THREE.SRGBColorSpace;
    donutMatcapTexture.outputColor = THREE.SRGBColorSpace;
    textMaterial.matcap = textMatcapTexture;
    textMaterial.needsUpdate = true;
    donutMaterial.matcap = donutMatcapTexture;
    donutMaterial.needsUpdate = true;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          material={textMaterial}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          I LOVE R3F !{/* <meshMatcapMaterial matcap={textMatcapTexture} /> */}
        </Text3D>
      </Center>

      {/* <torusGeometry ref={setGeometry} args={[1, 0.4, 64, 64]} />
      <meshMatcapMaterial ref={setMaterial} matcap={donutMatcapTexture} /> */}

      {[...Array(100)].map((_, key) => {
        return (
          <mesh
            key={key}
            geometry={torusGeometry}
            material={donutMaterial}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={Math.random() * 0.2 + 0.2}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
          />
        );
      })}
    </>
  );
}
