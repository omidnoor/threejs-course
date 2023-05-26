import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useGLTF, Clone } from "@react-three/drei";

const Model = () => {
  const model = useGLTF("./hamburger-draco.glb");

  //   const model = useLoader(GLTFLoader, "./hamburger.glb");

  //   const model = useLoader(
  //     GLTFLoader,
  //     "./FlightHelmet/glTF/FlightHelmet.gltf",
  //     (loader) => {
  //       const dracoLoader = new DRACOLoader();
  //       dracoLoader.setDecoderPath("./draco/");
  //       loader.setDRACOLoader(dracoLoader);
  //     },
  //   );
  //   return <primitive object={model.scene} scale={0.35} position-y={-1} />;
  return (
    <>
      <Clone object={model.scene} scale={0.2} position-y={-1} />;
      <Clone object={model.scene} scale={0.2} position-x={4} />;
      <Clone object={model.scene} scale={0.2} position-x={-2} />;
    </>
  );
};

useGLTF.preload("./hamburger-draco.glb");

export default Model;
