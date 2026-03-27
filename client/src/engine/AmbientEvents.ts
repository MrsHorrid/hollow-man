/** AmbientEvents.ts - Random ambient scares and events system */
import * as THREE from 'three';

export type AmbientEventType = 
  | 'branch_snap'
  | 'whisper'
  | 'wind_gust'
  | 'distant_footstep'
  | 'twig_break'
  | 'owl_hoot'
  | 'leaf_rustle'
  | 'shadow_movement'
  | 'distant_scream'
  | 'static_burst'
  | 'tree_creak'
  | 'heart_beat';

export interface AmbientEvent {
  type: AmbientEventType;
  position: THREE.Vector3;
  intensity: number; // 0-1
  duration: number; // ms
}

export type AmbientEventCallback = (event: AmbientEvent) => void;

export class AmbientEventsManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private callbacks: AmbientEventCallback[] = [];
  private lastEventTime: number = 0;
  private eventCooldown: number = 5000; // ms
  private isActive: boolean = false;
  private eventWeights: Map<AmbientEventType, number> = new Map();
  private shadowObjects: THREE.Object3D[] = [];

  // Event probabilities (weights)
  private readonly DEFAULT_WEIGHTS: Record<AmbientEventType, number> = {
    branch_snap: 0.15,
    whisper: 0.12,
    wind_gust: 0.20,
    distant_footstep: 0.15,
    twig_break: 0.10,
    owl_hoot: 0.08,
    leaf_rustle: 0.12,
    shadow_movement: 0.05,
    distant_scream: 0.02,
    static_burst: 0.03,
    tree_creak: 0.10,
    heart_beat: 0.08,
  };

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;
    
    // Initialize weights
    Object.entries(this.DEFAULT_WEIGHTS).forEach(([type, weight]) => {
      this.eventWeights.set(type as AmbientEventType, weight);
    });

    this.setupShadowObjects();
  }

  private setupShadowObjects(): void {
    // Create shadow objects for movement events
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.PlaneGeometry(2, 4);
      const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      this.scene.add(mesh);
      this.shadowObjects.push(mesh);
    }
  }

  subscribe(callback: AmbientEventCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  private triggerEvent(event: AmbientEvent): void {
    this.callbacks.forEach(cb => cb(event));
    this.lastEventTime = Date.now();

    // Visual effects for certain events
    if (event.type === 'shadow_movement') {
      this.triggerShadowMovement(event.position);
    } else if (event.type === 'static_burst') {
      this.triggerStaticBurst();
    }
  }

  private triggerShadowMovement(position: THREE.Vector3): void {
    const shadow = this.shadowObjects.find(s => !s.visible);
    if (!shadow) return;

    shadow.position.copy(position);
    shadow.lookAt(this.camera.position);
    shadow.visible = true;
    
    const material = (shadow as THREE.Mesh).material as THREE.MeshBasicMaterial;
    material.opacity = 0.6;

    // Fade out
    let opacity = 0.6;
    const fade = () => {
      opacity -= 0.02;
      material.opacity = opacity;
      if (opacity > 0) {
        requestAnimationFrame(fade);
      } else {
        shadow.visible = false;
      }
    };
    fade();
  }

  private triggerStaticBurst(): void {
    // Create static overlay effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: white;
      opacity: 0.3;
      pointer-events: none;
      z-index: 9998;
      mix-blend-mode: overlay;
    `;
    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 100);
  }

  update(deltaTime: number, stressLevel: number = 0): void {
    if (!this.isActive) return;

    const now = Date.now();
    const timeSinceLastEvent = now - this.lastEventTime;

    // Adjust cooldown based on stress level (more stressed = more events)
    const adjustedCooldown = this.eventCooldown * (1 - stressLevel * 0.5);

    if (timeSinceLastEvent > adjustedCooldown) {
      // Chance to trigger event
      const chance = 0.3 + stressLevel * 0.4;
      if (Math.random() < chance * deltaTime) {
        this.tryTriggerRandomEvent(stressLevel);
      }
    }
  }

  private tryTriggerRandomEvent(stressLevel: number): void {
    // Select event type based on weights
    const types = Array.from(this.eventWeights.keys());
    const weights = Array.from(this.eventWeights.values());
    
    // Increase intensity events probability with stress
    if (stressLevel > 0.5) {
      weights[types.indexOf('distant_scream')] *= 2;
      weights[types.indexOf('static_burst')] *= 1.5;
      weights[types.indexOf('shadow_movement')] *= 1.5;
    }

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    let selectedType: AmbientEventType = 'branch_snap';
    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedType = types[i];
        break;
      }
    }

    // Position event near player but not visible
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 25;
    const position = new THREE.Vector3(
      this.camera.position.x + Math.cos(angle) * distance,
      0,
      this.camera.position.z + Math.sin(angle) * distance
    );

    const event: AmbientEvent = {
      type: selectedType,
      position,
      intensity: 0.3 + Math.random() * 0.4 + stressLevel * 0.3,
      duration: 1000 + Math.random() * 2000,
    };

    this.triggerEvent(event);
  }

  forceEvent(type: AmbientEventType, intensity: number = 0.5): void {
    const angle = Math.random() * Math.PI * 2;
    const distance = 10 + Math.random() * 20;
    const position = new THREE.Vector3(
      this.camera.position.x + Math.cos(angle) * distance,
      0,
      this.camera.position.z + Math.sin(angle) * distance
    );

    this.triggerEvent({
      type,
      position,
      intensity,
      duration: 2000,
    });
  }

  setActive(active: boolean): void {
    this.isActive = active;
  }

  setEventWeight(type: AmbientEventType, weight: number): void {
    this.eventWeights.set(type, weight);
  }

  resetWeights(): void {
    Object.entries(this.DEFAULT_WEIGHTS).forEach(([type, weight]) => {
      this.eventWeights.set(type as AmbientEventType, weight);
    });
  }

  destroy(): void {
    this.shadowObjects.forEach(obj => {
      this.scene.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
    });
    this.shadowObjects = [];
    this.callbacks = [];
  }
}

export default AmbientEventsManager;
