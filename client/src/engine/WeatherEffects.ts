/** WeatherEffects.ts - Weather system for the forest */
import * as THREE from 'three';

export type WeatherType = 'clear' | 'foggy' | 'rainy' | 'stormy';

export interface WeatherConfig {
  type: WeatherType;
  intensity: number; // 0-1
  windDirection: THREE.Vector3;
  windSpeed: number;
}

export class WeatherEffects {
  private scene: THREE.Scene;
  private rainParticles: THREE.Points | null = null;
  private rainGeometry: THREE.BufferGeometry | null = null;
  private rainCount: number = 0;
  private rainVelocities: Float32Array | null = null;
  private fogDensity: number = 0.04;
  private lightningLight: THREE.PointLight | null = null;
  private currentWeather: WeatherConfig;
  private isActive: boolean = false;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.currentWeather = {
      type: 'clear',
      intensity: 0,
      windDirection: new THREE.Vector3(1, 0, 0),
      windSpeed: 0,
    };
  }

  setWeather(weather: Partial<WeatherConfig>): void {
    this.currentWeather = { ...this.currentWeather, ...weather };
    this.applyWeather();
  }

  private applyWeather(): void {
    switch (this.currentWeather.type) {
      case 'clear':
        this.stopRain();
        this.setFogDensity(0.04);
        break;
      case 'foggy':
        this.stopRain();
        this.setFogDensity(0.08 + this.currentWeather.intensity * 0.04);
        break;
      case 'rainy':
        this.startRain();
        this.setFogDensity(0.05 + this.currentWeather.intensity * 0.02);
        break;
      case 'stormy':
        this.startRain();
        this.setFogDensity(0.06 + this.currentWeather.intensity * 0.03);
        this.setupLightning();
        break;
    }
  }

  private setFogDensity(density: number): void {
    this.fogDensity = density;
    if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.density = density;
    }
  }

  private startRain(): void {
    if (this.rainParticles) return;

    const count = 15000;
    this.rainCount = count;
    
    this.rainGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    this.rainVelocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = Math.random() * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      this.rainVelocities[i] = 0.5 + Math.random() * 0.5;
    }

    this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x8888aa,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.rainParticles = new THREE.Points(this.rainGeometry, material);
    this.scene.add(this.rainParticles);
    this.isActive = true;
  }

  private stopRain(): void {
    if (this.rainParticles) {
      this.scene.remove(this.rainParticles);
      this.rainGeometry?.dispose();
      (this.rainParticles.material as THREE.Material).dispose();
      this.rainParticles = null;
      this.rainGeometry = null;
      this.rainVelocities = null;
    }
    this.isActive = false;
  }

  private setupLightning(): void {
    if (this.lightningLight) return;
    
    this.lightningLight = new THREE.PointLight(0xffffff, 0, 200);
    this.lightningLight.position.set(0, 50, 0);
    this.scene.add(this.lightningLight);
  }

  triggerLightning(): void {
    if (!this.lightningLight || this.currentWeather.type !== 'stormy') return;

    // Random position
    this.lightningLight.position.x = (Math.random() - 0.5) * 100;
    this.lightningLight.position.z = (Math.random() - 0.5) * 100;
    
    // Flash
    this.lightningLight.intensity = 2;
    
    // Fade out
    const fadeOut = () => {
      if (this.lightningLight) {
        this.lightningLight.intensity *= 0.7;
        if (this.lightningLight.intensity > 0.01) {
          requestAnimationFrame(fadeOut);
        } else {
          this.lightningLight.intensity = 0;
        }
      }
    };
    
    setTimeout(fadeOut, 50);
  }

  update(cameraPosition: THREE.Vector3): void {
    if (!this.isActive || !this.rainParticles || !this.rainGeometry || !this.rainVelocities) return;

    const positions = this.rainGeometry.attributes.position.array as Float32Array;
    const intensity = this.currentWeather.intensity;
    const windX = this.currentWeather.windDirection.x * this.currentWeather.windSpeed;
    const windZ = this.currentWeather.windDirection.z * this.currentWeather.windSpeed;

    // Update rain positions
    for (let i = 0; i < this.rainCount; i++) {
      const idx = i * 3;
      const velocity = this.rainVelocities[i] * (1 + intensity);

      positions[idx + 1] -= velocity; // Fall down
      positions[idx] += windX * 0.1; // Wind X
      positions[idx + 2] += windZ * 0.1; // Wind Z

      // Reset if below ground
      if (positions[idx + 1] < 0) {
        positions[idx] = cameraPosition.x + (Math.random() - 0.5) * 100;
        positions[idx + 1] = 50 + Math.random() * 50;
        positions[idx + 2] = cameraPosition.z + (Math.random() - 0.5) * 100;
      }
    }

    this.rainGeometry.attributes.position.needsUpdate = true;

    // Random lightning in storm
    if (this.currentWeather.type === 'stormy' && Math.random() < 0.001 * intensity) {
      this.triggerLightning();
    }
  }

  getCurrentWeather(): WeatherConfig {
    return this.currentWeather;
  }

  isRaining(): boolean {
    return this.currentWeather.type === 'rainy' || this.currentWeather.type === 'stormy';
  }

  destroy(): void {
    this.stopRain();
    if (this.lightningLight) {
      this.scene.remove(this.lightningLight);
      this.lightningLight = null;
    }
  }
}

// Enhanced lighting effects manager
export class LightingEffects {
  private scene: THREE.Scene;
  private flickerLights: THREE.Light[] = [];
  private originalIntensities: number[] = [];
  private flickerTimers: number[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  addFlickerLight(light: THREE.Light, flickerChance: number = 0.02): void {
    this.flickerLights.push(light);
    this.originalIntensities.push(light.intensity);
    this.flickerTimers.push(flickerChance);
  }

  update(): void {
    const time = Date.now() / 1000;

    for (let i = 0; i < this.flickerLights.length; i++) {
      const light = this.flickerLights[i];
      const original = this.originalIntensities[i];
      const chance = this.flickerTimers[i];

      // Random flicker
      if (Math.random() < chance) {
        light.intensity = original * (0.5 + Math.random() * 0.5);
      } else {
        // Smooth return to original
        light.intensity += (original - light.intensity) * 0.1;
      }

      // Occasional dramatic flicker
      if (Math.random() < 0.001) {
        light.intensity = original * 0.1;
      }
    }
  }

  createLantern(position: THREE.Vector3, color: number = 0xffaa44): THREE.PointLight {
    const light = new THREE.PointLight(color, 1, 15);
    light.position.copy(position);
    light.position.y += 2;
    
    // Visual lantern mesh
    const geometry = new THREE.SphereGeometry(0.3, 8, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color,
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(light.position);
    
    this.scene.add(light);
    this.scene.add(mesh);
    this.addFlickerLight(light, 0.05);

    return light;
  }

  destroy(): void {
    this.flickerLights = [];
    this.originalIntensities = [];
    this.flickerTimers = [];
  }
}

export default WeatherEffects;
