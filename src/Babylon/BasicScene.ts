import {
  Color3,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export default class BasicScene {
  engine: Engine;
  scene: Scene;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.5, 0.5, 0.5);

    this.defineCamera();
    this.initLight();
    this.initPilot();
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
  }

  initPilot() {
    const pilot = MeshBuilder.CreateCylinder(
      "pilot",
      {
        height: 0.75,
        diameterTop: 0.2,
        diameterBottom: 0.5,
        tessellation: 6,
        subdivisions: 1,
      },
      this.scene
    );
    const greyMat = new StandardMaterial("grey", this.scene);
    greyMat.emissiveColor = new Color3(0.2, 0.2, 0.2);
    pilot.material = greyMat;

    const arm = MeshBuilder.CreateBox(
      "arm",
      { height: 0.75, width: 0.3, depth: 0.1875 },
      this.scene
    );
    arm.material = greyMat;
    arm.position.x = 0.125;
    arm.parent = pilot;
    // rotation order
    // pilot.rotation.z = Math.PI / 2;
    // pilot.rotation.x = Math.PI / 2;
    pilot.rotation.y = Math.PI / 2;
  }
}
