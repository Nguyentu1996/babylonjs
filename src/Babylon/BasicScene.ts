import {
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Animation,
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
    const camera = new FreeCamera("cam", new Vector3(0, 1, -5), this.scene);
    camera.attachControl(this.scene);
  }

  initLight() {
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    const light2 = new DirectionalLight(
      "DirectionalLight",
      new Vector3(0, -1, 1),
      this.scene
    );
    light.intensity = 0.75;
    light2.intensity = 0.5;
  }

  initBox() {
    const box = MeshBuilder.CreateBox("box", {}, this.scene);
    const frameRate = 10; // The frames per second of the animation
    const xSlide = new Animation(
      "xSlide",
      "position.x",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keyFrames = [];
    keyFrames.push({
      frame: 0,
      value: 2,
    });

    keyFrames.push({
      frame: frameRate,
      value: -2,
    });

    keyFrames.push({
      frame: 2 * frameRate,
      value: 2,
    });

    xSlide.setKeys(keyFrames);
    this.scene.beginDirectAnimation(box, [xSlide], 0, 2 * frameRate, true);
  }
}
