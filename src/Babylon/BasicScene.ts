import {
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  Engine,
  FreeCamera,
  GizmoManager,
  HemisphericLight,
  Light,
  LightGizmo,
  MeshBuilder,
  PointLight,
  Scene,
  SpotLight,
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
    this.initGround();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  defineCamera() {
    const camera = new FreeCamera("cam", new Vector3(0, 1, -4), this.scene);
    camera.speed = 0.2;
    camera.attachControl(this.scene);
  }

  initLight() {
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene
    );
    // light.diffuse = new Color3(1, 0, 0);
    // light.groundColor = new Color3(0, 0, 1);
    // light.specular = new Color3(0, 1, 0);
    // const light = new DirectionalLight(
    //   "direct",
    //   new Vector3(-1, -2, 0),
    //   this.scene
    // );
    // const light = new PointLight("point", new Vector3(1, 1, -1), this.scene);
    // const splot = new SpotLight(
    //   "spot",
    //   new Vector3(0, 2, 0),
    //   new Vector3(0, -1, 0),
    //   Math.PI / 2,
    //   10,
    //   this.scene
    // );
    this.createGizmos(light);
    // light.intensity = 0.5;
  }
  createGizmos(light: Light) {
    const lightGizmo = new LightGizmo();
    lightGizmo.scaleRatio = 2;
    lightGizmo.light = light;
    const gizmoManager = new GizmoManager(this.scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.usePointerToAttachGizmos = false;
    gizmoManager.attachToMesh(lightGizmo.attachedMesh);
  }

  initBox() {
    const ball = MeshBuilder.CreateSphere(
      "Ball",
      { diameter: 0.5 },
      this.scene
    );
    ball.position = new Vector3(0, 1, 0);
  }
  initGround() {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
  }
}
