import { useControls, button } from "leva";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  const { position, color, visible } = useControls("Sphere", {
    position: {
      value: {
        x: -2,
        y: 0,
      },
      min: -4,
      max: 4,
      step: 0.01,
      joystick: "invertY",
    },
    color: {
      value: "#ff0000",
    },
    visible: {
      value: true,
    },
    clickMe: button(() => {
      console.log("clicked");
    }),
    choice: {
      options: ["a", "b", "c"],
    },
  });

  const { scale } = useControls("Cube", {
    scale: {
      value: 1.5,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" transparent={true} />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
