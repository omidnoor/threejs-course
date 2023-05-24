import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas>
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial color="#00ff00" />
      </mesh>
    </Canvas>
  </>,
);
