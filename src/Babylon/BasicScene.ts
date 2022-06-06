import {
  ArcRotateCamera,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export default class BasicScene {
  engine: Engine;
  scene: Scene;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);
    this.defineCamera();
    this.initLight();
    this.initBox();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  defineCamera() {
    const camera = new ArcRotateCamera(
      "cam",
      -Math.PI / 2,
      Math.PI / 2,
      10,
      new Vector3(0, 0, 0),
      this.scene
    );
    camera.attachControl(this.scene);
  }

  initLight() {
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    // light.intensity = 0.5;
  }

  initBox() {
    const ball = MeshBuilder.CreateBox("Box", {}, this.scene);
    ball.position = new Vector3(0, 1, 0);
  }
}
