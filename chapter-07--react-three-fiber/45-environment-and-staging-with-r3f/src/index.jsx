import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";
import { useControls } from "leva";
import { SoftShadows } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const created = (state) => {
  //   console.log(state.gl);
  //   state.gl.setClearColor("#ff0000", 1); // change background color
  //   console.log(state.scene);
  //   state.scene.background = new THREE.Color("#ff0000");
};

root.render(
  <Canvas
    shadows={false}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    onCreated={created}
  >
    <color args={["ivory"]} attach="background" />
    <Experience />
  </Canvas>,
);
