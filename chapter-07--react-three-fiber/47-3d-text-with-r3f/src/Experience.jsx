import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [textMatcapTexture] = useMatcapTexture(
    "605352_E9CCC5_C7A8A3_A89291",
    256,
  );
  const [donutMatcapTexture] = useMatcapTexture(
    "8A3B3D_DA5F62_461F20_BC7F81",
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

      <mesh scale={1.5}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshMatcapMaterial matcap={donutMatcapTexture} />
      </mesh>
    </>
  );
}
