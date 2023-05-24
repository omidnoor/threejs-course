import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    // flat // no toneMapping
    // dpr={[1, 2]} // it's by default
    gl={{
      toneMapping: THREE.CineonToneMapping,
      // outputColorSpace: THREE.LinearSRGBColorSpace,
      // antialias: false,
    }}
    camera={{
      zoom: 1,
      fov: 65,
      near: 0.1,
      far: 200,
      position: [5, 5, 5],
    }}
  >
    <Experience />
  </Canvas>,
);
