import * as THREE from 'three';
import { Monster, Page, Puzzle } from '@shared/types/game';
import { Player } from '@shared/types/player';

const MAP_SIZE = 120;
const TREE_COUNT = 200;
const ROCK_COUNT = 30;
const FOG_NEAR = 5;
const FOG_FAR = 35;

export class ForestScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;

  // Objects
  private monsterMesh: THREE.Group | null = null;
  private pageMeshes: Map<string, THREE.Mesh> = new Map();
  private puzzleMeshes: Map<string, THREE.Group> = new Map();
  private playerMeshes: Map<string, THREE.Group> = new Map();
  private flashlight: THREE.SpotLight | null = null;
  private flashlightTarget: THREE.Object3D | null = null;

  // Player state
  private moveState = { forward: false, back: false, left: false, right: false, sprint: false };
  private mouseX = 0;
  private mouseY = 0;
  private yaw = 0;
  private pitch = 0;
  private isPointerLocked = false;

  private playerHeight = 1.7;
  private footstepTimer = 0;
  private footstepInterval = 0.5;

  // Callbacks
  public onMove?: (pos: THREE.Vector3, yaw: number, pitch: number, sprint: boolean) => void;
  public onCollectPage?: (pageId: string) => void;
  public onPuzzleInteract?: (puzzleId: string) => void;
  public onLookingAtMonster?: (looking: boolean) => void;
  public onFootstep?: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 300);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.clock = new THREE.Clock();

    this.setupRenderer();
    this.setupLighting();
    this.buildEnvironment();
    this.setupMonster();
    this.setupInputHandlers(canvas);
  }

  private setupRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.3; // Dark!

    // Dark foggy atmosphere
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.04);
    this.scene.background = new THREE.Color(0x0a0a0f);
  }

  private setupLighting(): void {
    // Extremely dim moonlight
    const moon = new THREE.DirectionalLight(0x1a2340, 0.15);
    moon.position.set(50, 100, 50);
    moon.castShadow = true;
    this.scene.add(moon);

    // Slight ambient
    const ambient = new THREE.AmbientLight(0x080810, 0.3);
    this.scene.add(ambient);

    // Player flashlight
    this.flashlight = new THREE.SpotLight(0xfff5d0, 0, 20, Math.PI / 8, 0.3, 1.5);
    this.flashlight.castShadow = true;
    this.flashlight.shadow.mapSize.set(512, 512);

    this.flashlightTarget = new THREE.Object3D();
    this.scene.add(this.flashlightTarget);
    this.flashlight.target = this.flashlightTarget;
    this.camera.add(this.flashlight);
    this.flashlight.position.set(0.15, -0.1, -0.3);
    this.scene.add(this.camera);
  }

  private buildEnvironment(): void {
    // Ground
    const groundGeo = new THREE.PlaneGeometry(MAP_SIZE * 2, MAP_SIZE * 2, 50, 50);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x0d1a0a });
    
    // Slightly deform ground
    const posArr = groundGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < posArr.length; i += 3) {
      posArr[i + 2] += (Math.random() - 0.5) * 0.5;
    }
    groundGeo.computeVertexNormals();

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Trees
    for (let i = 0; i < TREE_COUNT; i++) {
      this.addTree(
        (Math.random() - 0.5) * MAP_SIZE * 1.8,
        (Math.random() - 0.5) * MAP_SIZE * 1.8
      );
    }

    // Rocks
    for (let i = 0; i < ROCK_COUNT; i++) {
      this.addRock(
        (Math.random() - 0.5) * MAP_SIZE,
        (Math.random() - 0.5) * MAP_SIZE
      );
    }

    // Abandoned cabin (landmark)
    this.addCabin(-20, -20);

    // Some scattered planks and debris
    this.addDebris();
  }

  private addTree(x: number, z: number): void {
    const group = new THREE.Group();

    // Trunk
    const trunkH = 4 + Math.random() * 6;
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, trunkH, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x1a0f08 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkH / 2;
    trunk.castShadow = true;
    group.add(trunk);

    // Foliage layers
    const leafColor = new THREE.Color(0x0a1a08);
    const leafMat = new THREE.MeshLambertMaterial({ color: leafColor });

    for (let layer = 0; layer < 3; layer++) {
      const size = 1.5 - layer * 0.3;
      const coneGeo = new THREE.ConeGeometry(size + Math.random() * 0.5, 2 + Math.random(), 6);
      const cone = new THREE.Mesh(coneGeo, leafMat);
      cone.position.y = trunkH - layer * 1.2 + 1;
      cone.rotation.y = Math.random() * Math.PI;
      cone.castShadow = true;
      group.add(cone);
    }

    // Slight random tilt
    group.rotation.z = (Math.random() - 0.5) * 0.15;
    group.rotation.x = (Math.random() - 0.5) * 0.1;
    group.position.set(x, 0, z);
    this.scene.add(group);
  }

  private addRock(x: number, z: number): void {
    const geo = new THREE.DodecahedronGeometry(0.3 + Math.random() * 1.2, 0);
    const mat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const rock = new THREE.Mesh(geo, mat);
    rock.position.set(x, Math.random() * 0.3, z);
    rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    rock.castShadow = true;
    rock.receiveShadow = true;
    this.scene.add(rock);
  }

  private addCabin(x: number, z: number): void {
    const group = new THREE.Group();

    // Walls
    const wallMat = new THREE.MeshLambertMaterial({ color: 0x1a1008 });
    const wallGeo = new THREE.BoxGeometry(8, 4, 8);
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 2;
    walls.castShadow = true;
    walls.receiveShadow = true;
    group.add(walls);

    // Roof
    const roofGeo = new THREE.ConeGeometry(6, 3, 4);
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x0d0a06 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 5.5;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);

    // Door (dark opening)
    const doorGeo = new THREE.BoxGeometry(1.2, 2.2, 0.1);
    const doorMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 1.1, 4.05);
    group.add(door);

    group.position.set(x, 0, z);
    group.rotation.y = Math.random() * Math.PI;
    this.scene.add(group);
  }

  private addDebris(): void {
    const planks = [
      { x: 5, z: 10 }, { x: -15, z: 5 }, { x: 20, z: -8 },
      { x: -5, z: -25 }, { x: 30, z: 15 },
    ];

    const plankMat = new THREE.MeshLambertMaterial({ color: 0x0f0a05 });
    for (const { x, z } of planks) {
      const geo = new THREE.BoxGeometry(0.15, 0.08, 1.2 + Math.random());
      const plank = new THREE.Mesh(geo, plankMat);
      plank.position.set(x, 0.04, z);
      plank.rotation.y = Math.random() * Math.PI;
      this.scene.add(plank);
    }
  }

  private setupMonster(): void {
    this.monsterMesh = new THREE.Group();

    // Tall thin figure (Slender-like)
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x050505 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x220011, transparent: true, opacity: 0.3 });

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.2, 0.3, 3, 8);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.5;
    this.monsterMesh.add(body);

    // Very long arms
    const armGeo = new THREE.CylinderGeometry(0.05, 0.08, 2.5, 6);
    const armMat = new THREE.MeshLambertMaterial({ color: 0x030303 });
    
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-1.2, 1.8, 0);
    leftArm.rotation.z = Math.PI / 4;
    this.monsterMesh.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(1.2, 1.8, 0);
    rightArm.rotation.z = -Math.PI / 4;
    this.monsterMesh.add(rightArm);

    // Head (oval, featureless)
    const headGeo = new THREE.SphereGeometry(0.3, 8, 8);
    headGeo.scale(0.8, 1.2, 0.8);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.y = 3.2;
    this.monsterMesh.add(head);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.5, 6);
    const leftLeg = new THREE.Mesh(legGeo, bodyMat);
    leftLeg.position.set(-0.2, 0.75, 0);
    this.monsterMesh.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, bodyMat);
    rightLeg.position.set(0.2, 0.75, 0);
    this.monsterMesh.add(rightLeg);

    // Glow aura
    const auraGeo = new THREE.SphereGeometry(1.5, 8, 8);
    const aura = new THREE.Mesh(auraGeo, glowMat);
    aura.position.y = 1.5;
    this.monsterMesh.add(aura);

    // Static distortion light
    const monsterLight = new THREE.PointLight(0x220022, 0.5, 8);
    monsterLight.position.y = 2;
    this.monsterMesh.add(monsterLight);

    this.monsterMesh.position.set(-50, 0, -50);
    this.monsterMesh.visible = false; // Hidden at start
    this.scene.add(this.monsterMesh);
  }

  setupPages(pages: Page[]): void {
    // Remove old
    for (const mesh of this.pageMeshes.values()) {
      this.scene.remove(mesh);
    }
    this.pageMeshes.clear();

    for (const page of pages) {
      if (page.collected) continue;

      // White glowing page
      const geo = new THREE.PlaneGeometry(0.3, 0.4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(page.position.x, 1.2, page.position.z);

      // Slight random lean
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.x = (Math.random() - 0.5) * 0.3;
      mesh.userData.pageId = page.id;

      // Glow effect
      const light = new THREE.PointLight(0xffffcc, 0.4, 3);
      light.position.copy(mesh.position);
      this.scene.add(light);
      mesh.userData.light = light;

      this.pageMeshes.set(page.id, mesh);
      this.scene.add(mesh);
    }
  }

  setupPuzzles(puzzles: Puzzle[]): void {
    for (const puzzle of puzzles) {
      const group = new THREE.Group();

      let color = puzzle.solved ? 0x004400 : 0x440000;
      if (puzzle.type === 'switch') color = puzzle.solved ? 0x004400 : 0x333300;
      if (puzzle.type === 'code') color = puzzle.solved ? 0x003300 : 0x330033;

      const baseMat = new THREE.MeshLambertMaterial({ color });

      if (puzzle.type === 'pressure_plate') {
        // Flat plate on ground
        const plateGeo = new THREE.BoxGeometry(2, 0.1, 2);
        const plate = new THREE.Mesh(plateGeo, baseMat);
        plate.position.y = 0.05;
        group.add(plate);
      } else if (puzzle.type === 'lever') {
        // Lever mechanism
        const baseGeo = new THREE.BoxGeometry(0.3, 0.5, 0.3);
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.25;
        group.add(base);

        const leverGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
        const leverMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
        const lever = new THREE.Mesh(leverGeo, leverMat);
        lever.position.y = 0.9;
        lever.rotation.z = puzzle.solved ? 0 : Math.PI / 3;
        group.add(lever);
      } else if (puzzle.type === 'code') {
        // Keypad box
        const boxGeo = new THREE.BoxGeometry(0.5, 0.8, 0.3);
        const box = new THREE.Mesh(boxGeo, baseMat);
        box.position.y = 1.2;
        group.add(box);
      } else {
        // Switch
        const boxGeo = new THREE.BoxGeometry(0.3, 0.6, 0.3);
        const box = new THREE.Mesh(boxGeo, baseMat);
        box.position.y = 0.3;
        group.add(box);
      }

      // Interaction glow
      const glowMat = new THREE.MeshBasicMaterial({
        color: puzzle.solved ? 0x00ff44 : 0xff3300,
        transparent: true,
        opacity: 0.3,
      });
      const glowGeo = new THREE.SphereGeometry(0.5, 8, 8);
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.y = 0.5;
      group.add(glow);
      group.userData.glowMesh = glow;
      group.userData.glowMat = glowMat;

      // Label
      group.userData.puzzleId = puzzle.id;
      group.userData.requiresPlayers = puzzle.requiresPlayers;
      group.userData.type = puzzle.type;

      group.position.set(puzzle.position.x, 0, puzzle.position.z);
      this.puzzleMeshes.set(puzzle.id, group);
      this.scene.add(group);
    }
  }

  updateMonster(monster: Monster): void {
    if (!this.monsterMesh) return;

    this.monsterMesh.position.set(monster.position.x, 0, monster.position.z);
    this.monsterMesh.rotation.y = monster.rotation;

    // Calculate distance to camera
    const dist = this.camera.position.distanceTo(this.monsterMesh.position);

    // Monster visible beyond 5 units
    this.monsterMesh.visible = dist < 80;

    // Animate arms when hunting
    const time = Date.now() / 1000;
    if (monster.state === 'hunting' || monster.state === 'attacking') {
      // Swaying arms animation
      const leftArm = this.monsterMesh.children[1];
      const rightArm = this.monsterMesh.children[2];
      if (leftArm) leftArm.rotation.x = Math.sin(time * 3) * 0.3;
      if (rightArm) rightArm.rotation.x = Math.cos(time * 3) * 0.3;
    }

    // Teleport effect - flicker
    if (monster.teleporting) {
      this.monsterMesh.visible = Math.random() > 0.5;
    }

    // Check if looking at monster
    if (this.onLookingAtMonster) {
      const toMonster = new THREE.Vector3()
        .subVectors(this.monsterMesh.position, this.camera.position)
        .normalize();
      const camDir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      const dot = camDir.dot(toMonster);
      this.onLookingAtMonster(dot > 0.5 && dist < 50);
    }
  }

  updateOtherPlayers(players: Map<string, Player>, myId: string): void {
    // Add/update other player meshes
    for (const [id, player] of players) {
      if (id === myId) continue;

      let group = this.playerMeshes.get(id);
      if (!group) {
        group = this.createPlayerMesh(player.color);
        this.playerMeshes.set(id, group);
        this.scene.add(group);
      }

      group.position.set(player.position.x, 0, player.position.z);
      group.rotation.y = player.rotation;
      group.visible = player.isAlive;
    }

    // Remove disconnected players
    for (const [id, group] of this.playerMeshes) {
      if (!players.has(id) || id === myId) {
        this.scene.remove(group);
        this.playerMeshes.delete(id);
      }
    }
  }

  private createPlayerMesh(color: string): THREE.Group {
    const group = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({ color });

    // Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.2, 8), mat);
    body.position.y = 0.8;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), mat);
    head.position.y = 1.6;
    group.add(head);

    // Player name tag light
    const light = new THREE.PointLight(new THREE.Color(color), 0.3, 5);
    light.position.y = 2;
    group.add(light);

    return group;
  }

  setFlashlight(on: boolean): void {
    if (this.flashlight) {
      this.flashlight.intensity = on ? 3 : 0;
    }
  }

  markPageCollected(pageId: string): void {
    const mesh = this.pageMeshes.get(pageId);
    if (mesh) {
      // Collect animation
      if (mesh.userData.light) {
        this.scene.remove(mesh.userData.light);
      }
      this.scene.remove(mesh);
      this.pageMeshes.delete(pageId);
    }
  }

  updatePuzzle(puzzleId: string, solved: boolean): void {
    const group = this.puzzleMeshes.get(puzzleId);
    if (!group) return;

    const glowMat = group.userData.glowMat as THREE.MeshBasicMaterial;
    if (glowMat) {
      glowMat.color.set(solved ? 0x00ff44 : 0xff3300);
    }
  }

  private setupInputHandlers(canvas: HTMLCanvasElement): void {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.moveState.forward = true; break;
        case 'KeyS': case 'ArrowDown': this.moveState.back = true; break;
        case 'KeyA': case 'ArrowLeft': this.moveState.left = true; break;
        case 'KeyD': case 'ArrowRight': this.moveState.right = true; break;
        case 'ShiftLeft': this.moveState.sprint = true; break;
        case 'KeyF': this.toggleFlashlight(); break;
        case 'KeyE': this.checkInteraction(); break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.moveState.forward = false; break;
        case 'KeyS': case 'ArrowDown': this.moveState.back = false; break;
        case 'KeyA': case 'ArrowLeft': this.moveState.left = false; break;
        case 'KeyD': case 'ArrowRight': this.moveState.right = false; break;
        case 'ShiftLeft': this.moveState.sprint = false; break;
      }
    });

    // Pointer lock
    canvas.addEventListener('click', () => {
      canvas.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
      this.isPointerLocked = document.pointerLockElement === canvas;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isPointerLocked) return;
      const sensitivity = 0.002;
      this.yaw -= e.movementX * sensitivity;
      this.pitch -= e.movementY * sensitivity;
      this.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.pitch));
    });
  }

  private flashlightOn = false;
  private toggleFlashlight(): void {
    this.flashlightOn = !this.flashlightOn;
    this.setFlashlight(this.flashlightOn);
  }

  private checkInteraction(): void {
    // Check for nearby pages
    for (const [pageId, mesh] of this.pageMeshes) {
      const dist = this.camera.position.distanceTo(mesh.position);
      if (dist < 2.5) {
        this.onCollectPage?.(pageId);
        return;
      }
    }

    // Check for nearby puzzles
    for (const [puzzleId, group] of this.puzzleMeshes) {
      const dist = this.camera.position.distanceTo(group.position);
      if (dist < 4) {
        this.onPuzzleInteract?.(puzzleId);
        return;
      }
    }
  }

  private getInteractionPrompt(): string | null {
    for (const [, mesh] of this.pageMeshes) {
      const dist = this.camera.position.distanceTo(mesh.position);
      if (dist < 2.5) return '[E] Pick up page';
    }
    for (const [puzzleId, group] of this.puzzleMeshes) {
      const dist = this.camera.position.distanceTo(group.position);
      if (dist < 4) {
        const type = group.userData.type;
        const req = group.userData.requiresPlayers > 1 ? ` (needs ${group.userData.requiresPlayers} players)` : '';
        return `[E] Interact with ${type}${req}`;
      }
    }
    return null;
  }

  update(myPlayer: { stamina: number; isAlive: boolean } | null): string | null {
    const delta = this.clock.getDelta();

    // Move camera (first person)
    if (myPlayer?.isAlive) {
      const speed = this.moveState.sprint && (myPlayer.stamina > 0) ? 7 : 4;
      const moveDir = new THREE.Vector3();

      if (this.moveState.forward) moveDir.z -= 1;
      if (this.moveState.back) moveDir.z += 1;
      if (this.moveState.left) moveDir.x -= 1;
      if (this.moveState.right) moveDir.x += 1;

      moveDir.normalize().multiplyScalar(speed * delta);
      moveDir.applyEuler(new THREE.Euler(0, this.yaw, 0));

      this.camera.position.add(moveDir);

      // Clamp to map
      this.camera.position.x = Math.max(-MAP_SIZE / 2, Math.min(MAP_SIZE / 2, this.camera.position.x));
      this.camera.position.z = Math.max(-MAP_SIZE / 2, Math.min(MAP_SIZE / 2, this.camera.position.z));
      this.camera.position.y = this.playerHeight;

      // Apply rotation
      this.camera.rotation.order = 'YXZ';
      this.camera.rotation.y = this.yaw;
      this.camera.rotation.x = this.pitch;

      // Update flashlight target
      if (this.flashlightTarget) {
        const forward = new THREE.Vector3(0, 0, -5);
        forward.applyQuaternion(this.camera.quaternion);
        this.flashlightTarget.position.copy(this.camera.position).add(forward);
      }

      // Footstep sounds
      const isMoving = this.moveState.forward || this.moveState.back || this.moveState.left || this.moveState.right;
      if (isMoving) {
        this.footstepTimer -= delta;
        if (this.footstepTimer <= 0) {
          this.onFootstep?.();
          this.footstepTimer = this.moveState.sprint ? 0.3 : 0.5;
        }
      }

      // Report position
      this.onMove?.(
        this.camera.position.clone(),
        this.yaw,
        this.pitch,
        this.moveState.sprint
      );
    }

    // Animate pages
    const time = Date.now() / 1000;
    for (const mesh of this.pageMeshes.values()) {
      mesh.rotation.y += delta * 0.5;
      mesh.position.y = 1.2 + Math.sin(time * 1.5) * 0.1;
    }

    // Animate puzzle glows
    for (const group of this.puzzleMeshes.values()) {
      const glow = group.userData.glowMesh as THREE.Mesh;
      if (glow) {
        glow.rotation.y += delta * 0.8;
        (glow.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(time * 2) * 0.1;
      }
    }

    this.renderer.render(this.scene, this.camera);

    return this.getInteractionPrompt();
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  applyScreenShake(intensity: number): void {
    const shake = () => {
      const i = Math.random() - 0.5;
      this.camera.position.x += i * intensity * 0.1;
      this.camera.position.y += (Math.random() - 0.5) * intensity * 0.05;
    };
    let count = 0;
    const interval = setInterval(() => {
      shake();
      count++;
      if (count > 15) clearInterval(interval);
    }, 16);
  }

  getPosition(): THREE.Vector3 {
    return this.camera.position.clone();
  }

  destroy(): void {
    this.renderer.dispose();
  }
}
