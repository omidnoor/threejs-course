import * as THREE from "three";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";

export default class Experience {
  constructor(canvas) {
    window.experience = this;
    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();

    // Sizes resize event listener
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event listener
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {}

  update() {
    console.log("updated experinece");
  }
}
