import * as THREE from "three";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";
import Camera from "./Camera.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    window.experience = this;
    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // Sizes resize event listener
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event listener
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.camera.update();
  }
}
