/** PerformanceOptimizer.ts - Performance optimization utilities */
import * as THREE from 'three';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  textureMemory: number;
}

export class PerformanceOptimizer {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  
  // Metrics
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private lastFpsUpdate: number = performance.now();
  private currentFPS: number = 60;
  private metrics: PerformanceMetrics = {
    fps: 60,
    frameTime: 16.67,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    textureMemory: 0,
  };

  // Optimization settings
  private lodDistances = {
    high: 30,
    medium: 60,
    low: 100,
  };
  private cullingEnabled: boolean = true;
  private frustum = new THREE.Frustum();
  private projScreenMatrix = new THREE.Matrix4();

  // Object pools
  private objectPools: Map<string, THREE.Object3D[]> = new Map();

  // Texture cache
  private textureCache: Map<string, THREE.Texture> = new Map();

  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    
    this.setupRendererOptimizations();
  }

  private setupRendererOptimizations(): void {
    // Optimize renderer settings
    this.renderer.powerPreference = 'high-performance';
    this.renderer.sortObjects = false; // Disable automatic sorting for performance
    
    // Enable frustum culling
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.frustumCulled = true;
      }
    });
  }

  update(): PerformanceMetrics {
    const now = performance.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;

    // Update FPS
    this.frameCount++;
    if (now - this.lastFpsUpdate >= 1000) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // Update metrics
    this.metrics.fps = this.currentFPS;
    this.metrics.frameTime = deltaTime;
    
    // Get memory info if available
    if (performance.memory) {
      this.metrics.memory = (performance as any).memory.usedJSHeapSize / 1048576; // MB
    }

    // Get renderer info
    const info = this.renderer.info;
    this.metrics.drawCalls = info.render.calls;
    this.metrics.triangles = info.render.triangles;
    this.metrics.textureMemory = info.memory.textures;

    // Apply dynamic optimizations
    this.applyDynamicOptimizations();

    // Frustum culling
    if (this.cullingEnabled) {
      this.updateFrustumCulling();
    }

    return { ...this.metrics };
  }

  private applyDynamicOptimizations(): void {
    // Adjust quality based on FPS
    if (this.currentFPS < 30) {
      this.reduceQuality();
    } else if (this.currentFPS > 55) {
      this.increaseQuality();
    }
  }

  private reduceQuality(): void {
    // Reduce shadow quality
    this.renderer.shadowMap.setSize(512, 512);
    
    // Disable certain effects
    this.scene.traverse((object) => {
      if (object instanceof THREE.PointLight || object instanceof THREE.SpotLight) {
        object.castShadow = false;
      }
    });
  }

  private increaseQuality(): void {
    // Can restore higher quality settings
    this.renderer.shadowMap.setSize(1024, 1024);
  }

  private updateFrustumCulling(): void {
    this.projScreenMatrix.multiplyMatrices(
      this.camera.projectionMatrix,
      this.camera.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const distance = object.position.distanceTo(this.camera.position);
        
        // LOD switching
        this.updateLOD(object, distance);
        
        // Frustum culling
        if (object.geometry.boundingSphere) {
          const sphere = object.geometry.boundingSphere.clone();
          sphere.applyMatrix4(object.matrixWorld);
          object.visible = this.frustum.intersectsSphere(sphere);
        }
      }
    });
  }

  private updateLOD(object: THREE.Mesh, distance: number): void {
    // Simple LOD - scale down distant objects
    if (distance > this.lodDistances.low) {
      object.visible = false;
    } else if (distance > this.lodDistances.medium) {
      // Use low poly version if available
      object.visible = true;
    } else {
      object.visible = true;
    }
  }

  // Object pooling
  getFromPool(type: string): THREE.Object3D | null {
    const pool = this.objectPools.get(type);
    if (pool && pool.length > 0) {
      return pool.pop()!;
    }
    return null;
  }

  returnToPool(type: string, object: THREE.Object3D): void {
    if (!this.objectPools.has(type)) {
      this.objectPools.set(type, []);
    }
    object.visible = false;
    this.objectPools.get(type)!.push(object);
  }

  // Texture caching
  getCachedTexture(key: string): THREE.Texture | undefined {
    return this.textureCache.get(key);
  }

  cacheTexture(key: string, texture: THREE.Texture): void {
    this.textureCache.set(key, texture);
  }

  // Garbage collection helper
  cleanup(): void {
    // Dispose of unused textures
    this.textureCache.forEach((texture) => {
      if (!texture.image) {
        texture.dispose();
      }
    });

    // Clear empty pools
    this.objectPools.forEach((pool, type) => {
      if (pool.length > 50) {
        const toDispose = pool.splice(0, pool.length - 50);
        toDispose.forEach((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
    });

    // Force texture cleanup
    this.renderer.renderLists.dispose();
  }

  // Network optimization
  compressPosition(pos: THREE.Vector3): Float32Array {
    // Compress position to 3 floats with reduced precision
    const compressed = new Float32Array(3);
    compressed[0] = Math.fround(pos.x * 100) / 100;
    compressed[1] = Math.fround(pos.y * 100) / 100;
    compressed[2] = Math.fround(pos.z * 100) / 100;
    return compressed;
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Dispose
  dispose(): void {
    this.textureCache.forEach((texture) => texture.dispose());
    this.textureCache.clear();
    this.objectPools.clear();
  }
}

// Network sync optimization
export class NetworkSyncOptimizer {
  private lastSyncTime: number = 0;
  private syncInterval: number = 50; // ms - 20 updates per second
  private positionBuffer: Map<string, THREE.Vector3> = new Map();
  private rotationBuffer: Map<string, number> = new Map();
  private dirtyPlayers: Set<string> = new Set();

  shouldSync(): boolean {
    const now = performance.now();
    if (now - this.lastSyncTime >= this.syncInterval) {
      this.lastSyncTime = now;
      return true;
    }
    return false;
  }

  bufferPlayerState(playerId: string, position: THREE.Vector3, rotation: number): void {
    this.positionBuffer.set(playerId, position.clone());
    this.rotationBuffer.set(playerId, rotation);
    this.dirtyPlayers.add(playerId);
  }

  getDirtyPlayers(): Array<{ id: string; position: THREE.Vector3; rotation: number }> {
    const players: Array<{ id: string; position: THREE.Vector3; rotation: number }> = [];
    
    for (const id of this.dirtyPlayers) {
      const pos = this.positionBuffer.get(id);
      const rot = this.rotationBuffer.get(id);
      if (pos && rot !== undefined) {
        players.push({ id, position: pos, rotation: rot });
      }
    }
    
    this.dirtyPlayers.clear();
    return players;
  }

  // Delta compression for network packets
  compressDelta(oldPos: THREE.Vector3, newPos: THREE.Vector3): { dx: number; dy: number; dz: number } | null {
    const dx = Math.fround((newPos.x - oldPos.x) * 100) / 100;
    const dy = Math.fround((newPos.y - oldPos.y) * 100) / 100;
    const dz = Math.fround((newPos.z - oldPos.z) * 100) / 100;

    // Only send if significant change
    if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01 && Math.abs(dz) < 0.01) {
      return null;
    }

    return { dx, dy, dz };
  }
}

// Memory management
export class MemoryManager {
  private cleanupInterval: number = 30000; // 30 seconds
  private lastCleanup: number = performance.now();
  private trackedObjects: WeakRef<THREE.Object3D>[] = [];

  trackObject(object: THREE.Object3D): void {
    this.trackedObjects.push(new WeakRef(object));
  }

  update(): void {
    const now = performance.now();
    if (now - this.lastCleanup >= this.cleanupInterval) {
      this.performCleanup();
      this.lastCleanup = now;
    }
  }

  private performCleanup(): void {
    // Remove dead references
    this.trackedObjects = this.trackedObjects.filter(ref => ref.deref() !== undefined);

    // Check memory pressure
    if (performance.memory && (performance as any).memory.usedJSHeapSize > 200 * 1048576) {
      // Memory usage > 200MB, trigger aggressive cleanup
      this.aggressiveCleanup();
    }
  }

  private aggressiveCleanup(): void {
    // Dispose textures and geometries that haven't been used
    // This is a simplified version - real implementation would track usage
    console.log('[Performance] Running aggressive memory cleanup');
    
    if (globalThis.gc) {
      globalThis.gc();
    }
  }

  getTrackedCount(): number {
    return this.trackedObjects.length;
  }
}

export default {
  PerformanceOptimizer,
  NetworkSyncOptimizer,
  MemoryManager,
};
