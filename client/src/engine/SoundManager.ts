/**
 * SoundManager.ts — The Hollow Man
 * Positional 3D audio engine built on Howler.js + Web Audio API.
 * Handles ambient soundscapes, SFX, footsteps, monster audio.
 */

import { Howl, Howler } from 'howler';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SurfaceType = 'grass' | 'gravel' | 'wood' | 'concrete' | 'dirt' | 'metal' | 'leaves';

export interface AudioPosition {
  x: number;
  y: number;
  z: number;
}

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
  rate?: number;
  position?: AudioPosition;
  maxDistance?: number;
  onEnd?: () => void;
}

interface AmbientLayer {
  id: string;
  howl: Howl;
  baseVolume: number;
  currentVolume: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const AUDIO_BASE = '/audio';

const FOOTSTEP_SOUNDS: Record<SurfaceType, string[]> = {
  grass:    ['sfx/footstep_grass_1.mp3', 'sfx/footstep_grass_2.mp3', 'sfx/footstep_grass_3.mp3'],
  gravel:   ['sfx/footstep_gravel_1.mp3', 'sfx/footstep_gravel_2.mp3'],
  wood:     ['sfx/footstep_wood_1.mp3', 'sfx/footstep_wood_2.mp3', 'sfx/footstep_wood_3.mp3'],
  concrete: ['sfx/footstep_concrete_1.mp3', 'sfx/footstep_concrete_2.mp3'],
  dirt:     ['sfx/footstep_dirt_1.mp3', 'sfx/footstep_dirt_2.mp3'],
  metal:    ['sfx/footstep_metal_1.mp3', 'sfx/footstep_metal_2.mp3'],
  leaves:   ['sfx/footstep_leaves_1.mp3', 'sfx/footstep_leaves_2.mp3', 'sfx/footstep_leaves_3.mp3'],
};

const AMBIENT_PATHS = {
  wind:          `${AUDIO_BASE}/ambient/wind_low.mp3`,
  crickets:      `${AUDIO_BASE}/ambient/crickets_night.mp3`,
  forest:        `${AUDIO_BASE}/ambient/forest_deep.mp3`,
  heartbeat_bg:  `${AUDIO_BASE}/ambient/heartbeat_faint.mp3`,
};

const SFX_PATHS: Record<string, string> = {
  page_collect:    `${AUDIO_BASE}/sfx/page_reveal.mp3`,
  monster_breath:  `${AUDIO_BASE}/sfx/monster_breathing.mp3`,
  monster_growl:   `${AUDIO_BASE}/sfx/monster_growl.mp3`,
  monster_scream:  `${AUDIO_BASE}/sfx/monster_scream.mp3`,
  monster_step:    `${AUDIO_BASE}/sfx/monster_footstep.mp3`,
  random_scare:    `${AUDIO_BASE}/sfx/random_scare.mp3`,
  sanity_drain:    `${AUDIO_BASE}/sfx/sanity_drain.mp3`,
  door_creak:      `${AUDIO_BASE}/sfx/door_creak.mp3`,
  static_burst:    `${AUDIO_BASE}/sfx/static_burst.mp3`,
};

// ─── SoundManager ─────────────────────────────────────────────────────────────

export class SoundManager {
  private listenerPosition: AudioPosition = { x: 0, y: 0, z: 0 };
  private ambientLayers: Map<string, AmbientLayer> = new Map();
  private loadedSfx: Map<string, Howl> = new Map();
  private footstepHowls: Map<SurfaceType, Howl[]> = new Map();
  private lastFootstepIndex: Map<SurfaceType, number> = new Map();
  private masterVolume = 1.0;
  private sfxVolume = 1.0;
  private ambientVolume = 1.0;
  private initialized = false;
  private randomScareTimer: ReturnType<typeof setTimeout> | null = null;

  async init(): Promise<void> {
    if (this.initialized) return;
    Howler.usingWebAudio = true;
    Howler.pos(0, 0, 0);
    Howler.orientation(0, 0, -1, 0, 1, 0);
    await Promise.all([this.preloadSfx(), this.preloadFootsteps()]);
    this.startAmbientLayers();
    this.startRandomScareCycle();
    this.initialized = true;
    console.log('[SoundManager] Initialized — darkness has ears now.');
  }

  // ── Preloading ──────────────────────────────────────────────────────────────

  private preloadSfx(): Promise<void> {
    return new Promise((resolve) => {
      const entries = Object.entries(SFX_PATHS);
      let loaded = 0;
      for (const [key, src] of entries) {
        const howl = new Howl({
          src: [src],
          preload: true,
          onload: () => { if (++loaded >= entries.length) resolve(); },
          onloaderror: () => { if (++loaded >= entries.length) resolve(); },
        });
        this.loadedSfx.set(key, howl);
      }
      if (entries.length === 0) resolve();
    });
  }

  private preloadFootsteps(): Promise<void> {
    return new Promise((resolve) => {
      let total = 0;
      let loaded = 0;
      for (const paths of Object.values(FOOTSTEP_SOUNDS)) total += paths.length;

      for (const surface of (Object.keys(FOOTSTEP_SOUNDS) as SurfaceType[])) {
        const paths = FOOTSTEP_SOUNDS[surface];
        const howls: Howl[] = [];
        for (const src of paths) {
          const howl = new Howl({
            src: [`${AUDIO_BASE}/${src}`],
            preload: true,
            volume: 0.7,
            onload: () => { if (++loaded >= total) resolve(); },
            onloaderror: () => { if (++loaded >= total) resolve(); },
          });
          howls.push(howl);
        }
        this.footstepHowls.set(surface, howls);
        this.lastFootstepIndex.set(surface, 0);
      }
      if (total === 0) resolve();
    });
  }

  // ── Ambient Soundscape ──────────────────────────────────────────────────────

  private startAmbientLayers(): void {
    const defs = [
      { id: 'wind',     src: AMBIENT_PATHS.wind,     volume: 0.35 },
      { id: 'crickets', src: AMBIENT_PATHS.crickets,  volume: 0.20, delay: 2000 },
      { id: 'forest',   src: AMBIENT_PATHS.forest,    volume: 0.15, delay: 1000 },
    ];

    for (const def of defs) {
      const start = () => {
        const howl = new Howl({ src: [def.src], loop: true, volume: 0, autoplay: true });
        howl.on('play', () => howl.fade(0, def.volume * this.ambientVolume, 3000));
        this.ambientLayers.set(def.id, { id: def.id, howl, baseVolume: def.volume, currentVolume: def.volume });
      };
      if (def.delay) setTimeout(start, def.delay); else start();
    }
  }

  private startRandomScareCycle(): void {
    const schedule = () => {
      const delay = 45_000 + Math.random() * 135_000;
      this.randomScareTimer = setTimeout(async () => {
        this.playRandomAmbientScare();
        schedule();
      }, delay);
    };
    schedule();
  }

  private playRandomAmbientScare(): void {
    const scares = [
      () => this.playSfxAt('monster_breath', { volume: 0.3, position: this.randomNearbyPosition() }),
      () => new Howl({ src: [`${AUDIO_BASE}/ambient/distant_scream.mp3`], volume: 0.4, autoplay: true }),
      () => this.playSfxAt('random_scare', { volume: 0.25 }),
    ];
    scares[Math.floor(Math.random() * scares.length)]();
  }

  private randomNearbyPosition(): AudioPosition {
    const angle = Math.random() * Math.PI * 2;
    const dist = 3 + Math.random() * 5;
    return {
      x: this.listenerPosition.x + Math.cos(angle) * dist,
      y: this.listenerPosition.y,
      z: this.listenerPosition.z + Math.sin(angle) * dist,
    };
  }

  // ── Listener ────────────────────────────────────────────────────────────────

  setListenerPosition(pos: AudioPosition, orientation?: AudioPosition): void {
    this.listenerPosition = pos;
    Howler.pos(pos.x, pos.y, pos.z);
    if (orientation) Howler.orientation(orientation.x, orientation.y, orientation.z, 0, 1, 0);
  }

  // ── SFX Playback ────────────────────────────────────────────────────────────

  playSfx(key: string, opts: SoundOptions = {}): number | null {
    const howl = this.loadedSfx.get(key);
    if (!howl) { console.warn(`[SoundManager] SFX "${key}" not loaded`); return null; }
    howl.volume((opts.volume ?? 1) * this.sfxVolume * this.masterVolume);
    if (opts.rate) howl.rate(opts.rate);
    if (opts.loop !== undefined) howl.loop(opts.loop);
    const id = howl.play();
    if (opts.onEnd) howl.once('end', opts.onEnd, id);
    return id;
  }

  playSfxAt(key: string, opts: SoundOptions = {}): number | null {
    const howl = this.loadedSfx.get(key);
    if (!howl) return null;
    howl.volume((opts.volume ?? 1) * this.sfxVolume * this.masterVolume);
    const id = howl.play();
    if (opts.position) {
      const dist = opts.maxDistance ?? 20;
      howl.pannerAttr({ refDistance: 1, rolloffFactor: 1, maxDistance: dist }, id);
      howl.pos(opts.position.x, opts.position.y, opts.position.z, id);
    }
    return id;
  }

  stopSfx(key: string): void { this.loadedSfx.get(key)?.stop(); }

  // ── Footsteps ───────────────────────────────────────────────────────────────

  playFootstep(surface: SurfaceType, volume = 0.7): void {
    const howls = this.footstepHowls.get(surface);
    if (!howls?.length) return;
    const lastIdx = this.lastFootstepIndex.get(surface) ?? 0;
    const idx = (lastIdx + 1) % howls.length;
    this.lastFootstepIndex.set(surface, idx);
    const howl = howls[idx];
    howl.rate(0.9 + Math.random() * 0.2);
    howl.volume(volume * this.sfxVolume * this.masterVolume);
    howl.play();
  }

  // ── Monster Audio ────────────────────────────────────────────────────────────

  startMonsterBreathing(position: AudioPosition): void {
    const howl = this.loadedSfx.get('monster_breath');
    if (!howl) return;
    howl.loop(true);
    howl.volume(0);
    const id = howl.play();
    howl.pos(position.x, position.y, position.z, id);
    howl.pannerAttr({ refDistance: 1, rolloffFactor: 2, maxDistance: 25 }, id);
    howl.fade(0, 0.8 * this.sfxVolume, 1500, id);
  }

  stopMonsterBreathing(): void {
    const howl = this.loadedSfx.get('monster_breath');
    if (!howl) return;
    howl.fade(0.8, 0, 1000);
    setTimeout(() => howl.stop(), 1100);
  }

  updateMonsterPosition(position: AudioPosition): void {
    const howl = this.loadedSfx.get('monster_breath');
    if (!howl) return;
    howl.pos(position.x, position.y, position.z);
  }

  playMonsterScream(position: AudioPosition): void {
    this.playSfxAt('monster_scream', { volume: 1.0, position, maxDistance: 50 });
  }

  playMonsterFootstep(position: AudioPosition): void {
    this.playSfxAt('monster_step', { volume: 0.9, position, maxDistance: 30 });
  }

  // ── Proximity Tension ────────────────────────────────────────────────────────

  setMonsterProximity(proximity: number): void {
    const windLayer = this.ambientLayers.get('wind');
    if (windLayer) {
      const targetVol = windLayer.baseVolume * (1 - proximity * 0.5);
      windLayer.howl.fade(windLayer.currentVolume, targetVol, 500);
      windLayer.currentVolume = targetVol;
    }

    const heartLayer = this.ambientLayers.get('heartbeat');
    if (heartLayer) {
      const targetVol = Math.min(proximity * 0.6, 0.6);
      heartLayer.howl.fade(heartLayer.currentVolume, targetVol, 500);
      heartLayer.currentVolume = targetVol;
    }
  }

  startHeartbeatAmbient(): void {
    if (this.ambientLayers.has('heartbeat')) return;
    const howl = new Howl({ src: [AMBIENT_PATHS.heartbeat_bg], loop: true, volume: 0, autoplay: true });
    this.ambientLayers.set('heartbeat', { id: 'heartbeat', howl, baseVolume: 0.5, currentVolume: 0 });
  }

  stopHeartbeatAmbient(): void {
    const layer = this.ambientLayers.get('heartbeat');
    if (!layer) return;
    layer.howl.fade(layer.currentVolume, 0, 1000);
    setTimeout(() => { layer.howl.stop(); this.ambientLayers.delete('heartbeat'); }, 1100);
  }

  // ── Game Events ──────────────────────────────────────────────────────────────

  onPageCollected(): void { this.playSfx('page_collect', { volume: 0.9 }); }
  onMonsterSpotted(): void { this.playSfx('monster_growl', { volume: 1.0 }); this.startHeartbeatAmbient(); }
  onPlayerDeath(): void { this.stopAllAmbient(); this.playSfx('monster_scream', { volume: 1.0 }); }
  onPuzzleSolved(): void { this.playSfx('sanity_drain', { volume: 0.4, rate: 0.8 }); this.stopHeartbeatAmbient(); }
  onDoorCreak(): void { this.playSfx('door_creak', { volume: 0.85, rate: 0.8 + Math.random() * 0.4 }); }

  // ── Volume ───────────────────────────────────────────────────────────────────

  setMasterVolume(v: number): void { this.masterVolume = Math.max(0, Math.min(1, v)); Howler.volume(this.masterVolume); }
  setSfxVolume(v: number): void { this.sfxVolume = Math.max(0, Math.min(1, v)); }
  setAmbientVolume(v: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, v));
    for (const [, layer] of this.ambientLayers) layer.howl.volume(layer.baseVolume * this.ambientVolume);
  }

  stopAllAmbient(): void {
    for (const [, layer] of this.ambientLayers) {
      layer.howl.fade(layer.currentVolume, 0, 800);
      setTimeout(() => layer.howl.stop(), 900);
    }
    this.ambientLayers.clear();
  }

  destroy(): void {
    if (this.randomScareTimer !== null) clearTimeout(this.randomScareTimer);
    this.stopAllAmbient();
    for (const [, howl] of this.loadedSfx) howl.unload();
    Howler.unload();
    this.initialized = false;
  }
}

export const soundManagerInstance = new SoundManager();
export default soundManagerInstance;

export const soundManager = soundManagerInstance;
