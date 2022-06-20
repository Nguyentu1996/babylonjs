import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  UniversalCamera,
  StandardMaterial,
  Texture,
  Mesh,
  Color3,
  TransformNode,
  Color4,
} from "@babylonjs/core";

export class BasicScene {
  scene: Scene;
  engine: Engine;
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.createRoom();
    this.buildArt();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  createScene(): Scene {
    const scene = new Scene(this.engine);
    // scene.clearColor = new Color4(255, 255, 255, 1);
    scene.ambientColor = new Color3(1, 1, 1);

    scene.gravity = new Vector3(0, -0.9, 0);
    const camera = new UniversalCamera(
      "camera",
      new Vector3(0, 2, 1),
      this.scene
    );
    camera.minZ = 0;
    camera.speed = 0.25;
    camera.applyGravity = true;
    camera.checkCollisions = true;

    camera.attachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    // hemiLight.diffuse = new Color3(15, 15, 15);
    // hemiLight.intensity = 0.7;
    return scene;
  }
  createRoom() {
    this.buildGround();
    this.buildWall();
  }
  buildGround(): Mesh {
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 20, height: 20 },
      this.scene
    );
    const groundMat = new StandardMaterial("groundMat", this.scene);
    const groundTexture = new Texture("./texture/Floor_DIF.jpg");
    groundMat.diffuseTexture = groundTexture;
    groundTexture.uScale = 10;
    groundTexture.vScale = 10;
    ground.material = groundMat;
    ground.checkCollisions = true;
    ground.isPickable = false;
    return ground;
  }
  buildWall(): void {
    const wallMat = new StandardMaterial("wallMat", this.scene);
    const wallTexture = new Texture("./texture/Wall.jpg");
    wallMat.diffuseTexture = wallTexture;
    wallMat.ambientColor = new Color3(15, 15, 15);
    const wall = MeshBuilder.CreatePlane(
      "wall",
      { width: 20, height: 10 },
      this.scene
    );
    wall.material = wallMat;
    wall.position = new Vector3(0, 0, 10);
    wall.checkCollisions = true;
    const places = [];
    // places.push([0, 0, 10]); // front
    places.push([0, 0, -10, Math.PI]); // back
    places.push([10, 0, 0, Math.PI / 2]); // right
    places.push([-10, 0, 0, -Math.PI / 2]); // left
    const walls = [];
    for (let i = 0; i < places.length; i++) {
      walls[i] = wall.clone("wall" + i);
      const x = places[i][0];
      const y = places[i][1];
      const z = places[i][2];
      const rotationY = places[i][3];
      walls[i].position = new Vector3(x, y, z);
      walls[i].rotation.y = rotationY;
    }
  }
  buildArt() {
    const art = MeshBuilder.CreateBox("art", {
      width: 1.325,
      height: 2,
      depth: 0.02,
    });
    const artMat = new StandardMaterial("artMat", this.scene);
    // artMat.diffuseColor = Color3.Black();
    artMat.emissiveColor = Color3.White();
    // artMat.ambientColor = Color3.White();
    art.material = artMat;
    const image = MeshBuilder.CreatePlane("img", { width: 1.325, height: 2 });
    const imgMat = new StandardMaterial("imgMat", this.scene);
    const imgTexture = new Texture("./texture/art1.jpeg", this.scene);
    imgMat.ambientColor = new Color3(1, 1, 1);
    imgMat.diffuseTexture = imgTexture;
    image.material = imgMat;
    image.translate(new Vector3(0, 0, -0.02), 1);
    const group = new TransformNode(`artwork`);
    image.parent = group;
    art.parent = group;
    group.position = new Vector3(0, 2, 10);
  }
}
