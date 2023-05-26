import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useGLTF } from "@react-three/drei";

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
  return <primitive object={model.scene} scale={0.35} position-y={-1} />;
};

useGLTF.preload("./hamburger-draco.glb");

export default Model;
