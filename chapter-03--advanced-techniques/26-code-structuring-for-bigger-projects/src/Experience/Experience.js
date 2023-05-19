import Sizes from "./Utils/Sizes.js";

export default class Experience {
  constructor(canvas) {
    window.experience = this;
    this.canvas = canvas;

    this.sizes = new Sizes();

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    console.log(this);
  }
}
