import {
  ArcRotateCamera,
  Color3,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  Scene,
  StandardMaterial,
  Texture,
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
      Math.PI / 3,
      5,
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
  }

  initBox() {
    const ground = MeshBuilder.CreateGround(
      "Ground",
      { width: 10, height: 10 },
      this.scene
    );

    const ball = MeshBuilder.CreateSphere("Ball", { diameter: 1 }, this.scene);
    ball.position.y = 1;
    const standardMaterial = new StandardMaterial("material", this.scene);
    standardMaterial.diffuseTexture = new Texture(
      "./textures/metal_plate_diff_4k.png",
      this.scene
    );
    standardMaterial.emissiveColor = new Color3(0.2, 0.2, 0.2);
    // standardMaterial.bumpTexture = new Texture(
    //   "./textures/snow_02_nor_gl_4k.jpeg",
    //   this.scene
    // );
    // standardMaterial.specularTexture = new Texture(
    //   "./textures/snow_02_spec_4k.jpeg",
    //   this.scene
    // );
    // standardMaterial.ambientTexture = new Texture(
    //   "./textures/snow_02_ao_4k.jpeg",
    //   this.scene
    // );
    ball.material = standardMaterial;
    // ball.position = new Vector3(0, 1, 0);
  }
}
