import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
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
