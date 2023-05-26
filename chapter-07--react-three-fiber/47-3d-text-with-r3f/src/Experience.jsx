import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect } from "react";
import { useState } from "react";

export default function Experience() {
  const [geometry, setGeometry] = useState(null);

  const [textMatcapTexture] = useMatcapTexture(
    "605352_E9CCC5_C7A8A3_A89291",
    256,
  );
  const [donutMatcapTexture] = useMatcapTexture(
    "1C70C6_09294C_0F3F73_52B3F6",
    256,
  );

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          I LOVE R3F !
          <meshMatcapMaterial matcap={textMatcapTexture} />
        </Text3D>
      </Center>
      <torusKnotGeometry ref={setGeometry} args={[1, 0.4, 64, 64]} />
      {[...Array(100)].map((_, key) => {
        return (
          <mesh
            key={key}
            geometry={geometry}
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
          >
            <meshMatcapMaterial matcap={donutMatcapTexture} />
          </mesh>
        );
      })}
    </>
  );
}
