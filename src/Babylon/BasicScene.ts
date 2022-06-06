import {
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
    this.initBall();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  defineCamera() {
    const camera = new FreeCamera("cam", new Vector3(0, 1, -5), this.scene);
    camera.attachControl(this.scene);
  }

  initLight() {
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.8;
  }

  initBall() {
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, this.scene);
    ball.position = new Vector3(0, 1, 0);
  }
}
