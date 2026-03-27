/**
 * MusicController.ts — The Hollow Man
 * Dynamic layered music system with smooth crossfades between states.
 */
import { Howl } from 'howler';

export type MusicState = 'silent' | 'explore' | 'tension' | 'chase' | 'death' | 'safe' | 'victory';

interface MusicLayer { id: string; howl: Howl; targetVolume: number; currentVolume: number; }

const MUSIC_BASE = '/audio/music';
const LOOP_FILES: Record<string, string> = {
  explore_base:    `${MUSIC_BASE}/explore_base.mp3`,
  explore_melody:  `${MUSIC_BASE}/explore_melody.mp3`,
  tension_strings: `${MUSIC_BASE}/tension_strings.mp3`,
  tension_bass:    `${MUSIC_BASE}/tension_bass.mp3`,
  tension_hits:    `${MUSIC_BASE}/tension_percussive.mp3`,
  chase_full:      `${MUSIC_BASE}/chase_full.mp3`,
  chase_perc:      `${MUSIC_BASE}/chase_percussion.mp3`,
};
const STINGER_FILES: Record<string, string> = {
  stinger_found:   `${MUSIC_BASE}/stinger_monster_found.mp3`,
  stinger_escape:  `${MUSIC_BASE}/stinger_escape.mp3`,
  stinger_death:   `${MUSIC_BASE}/stinger_death.mp3`,
  stinger_page:    `${MUSIC_BASE}/stinger_page_collect.mp3`,
  stinger_solve:   `${MUSIC_BASE}/stinger_puzzle_solve.mp3`,
};

const STATE_VOLUMES: Record<MusicState, Record<string, number>> = {
  silent:  { explore_base:0, explore_melody:0, tension_strings:0, tension_bass:0, tension_hits:0, chase_full:0, chase_perc:0 },
  explore: { explore_base:0.25, explore_melody:0, tension_strings:0, tension_bass:0, tension_hits:0, chase_full:0, chase_perc:0 },
  tension: { explore_base:0.15, explore_melody:0, tension_strings:0.55, tension_bass:0.35, tension_hits:0, chase_full:0, chase_perc:0 },
  chase:   { explore_base:0, explore_melody:0, tension_strings:0.3, tension_bass:0.5, tension_hits:0.6, chase_full:0.85, chase_perc:0.7 },
  death:   { explore_base:0, explore_melody:0, tension_strings:0, tension_bass:0, tension_hits:0, chase_full:0, chase_perc:0 },
  safe:    { explore_base:0.2, explore_melody:0.15, tension_strings:0, tension_bass:0, tension_hits:0, chase_full:0, chase_perc:0 },
  victory: { explore_base:0.2, explore_melody:0.3, tension_strings:0, tension_bass:0, tension_hits:0, chase_full:0, chase_perc:0 },
};

const TRANSITION_MS: Partial<Record<string, number>> = {
  'explore->tension': 4000, 'tension->explore': 6000,
  'tension->chase': 800, 'chase->tension': 2000,
  'chase->safe': 3000, 'explore->safe': 2000, 'safe->explore': 4000,
};
const FALLBACK_MS: Partial<Record<MusicState, number>> = { death: 200, silent: 2000 };

export class MusicController {
  private layers: Map<string, MusicLayer> = new Map();
  private stingers: Map<string, Howl> = new Map();
  private currentState: MusicState = 'silent';
  private previousState: MusicState = 'silent';
  private transitionTimer: ReturnType<typeof setInterval> | null = null;
  private masterVolume = 0.8;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    await Promise.all([this.loadLayers(), this.loadStingers()]);
    for (const [, l] of this.layers) { l.howl.volume(0); l.howl.play(); }
    this.initialized = true;
  }

  private loadLayers(): Promise<void> {
    return new Promise(res => {
      const entries = Object.entries(LOOP_FILES); let done = 0;
      for (const [id, src] of entries) {
        const howl = new Howl({ src: [src], loop: true, volume: 0, preload: true,
          onload: () => { if (++done >= entries.length) res(); },
          onloaderror: () => { if (++done >= entries.length) res(); } });
        this.layers.set(id, { id, howl, targetVolume: 0, currentVolume: 0 });
      }
      if (!entries.length) res();
    });
  }

  private loadStingers(): Promise<void> {
    return new Promise(res => {
      const entries = Object.entries(STINGER_FILES); let done = 0;
      for (const [id, src] of entries) {
        const howl = new Howl({ src: [src], preload: true,
          onload: () => { if (++done >= entries.length) res(); },
          onloaderror: () => { if (++done >= entries.length) res(); } });
        this.stingers.set(id, howl);
      }
      if (!entries.length) res();
    });
  }

  setState(newState: MusicState): void {
    if (newState === this.currentState) return;
    this.previousState = this.currentState;
    this.currentState = newState;
    const key = `${this.previousState}->${newState}`;
    const dur = TRANSITION_MS[key] ?? FALLBACK_MS[newState] ?? 3000;
    const stingerMap: Partial<Record<MusicState, string>> = { chase: 'stinger_found', death: 'stinger_death', safe: 'stinger_escape' };
    const sid = stingerMap[newState];
    if (sid) { const s = this.stingers.get(sid); s?.volume(this.masterVolume); s?.play(); }
    this.crossfade(newState, dur);
  }

  private crossfade(state: MusicState, dur: number): void {
    if (this.transitionTimer) clearInterval(this.transitionTimer);
    const targets = STATE_VOLUMES[state];
    for (const [id, layer] of this.layers) layer.targetVolume = (targets[id] ?? 0) * this.masterVolume;
    const steps = Math.max(1, dur / 16); let step = 0;
    this.transitionTimer = setInterval(() => {
      step++;
      const t = Math.min(step / steps, 1);
      const e = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
      for (const [, l] of this.layers) {
        const v = l.currentVolume + (l.targetVolume - l.currentVolume) * e;
        l.howl.volume(v);
        l.currentVolume = v;
      }
      if (step >= steps) { clearInterval(this.transitionTimer!); this.transitionTimer = null; }
    }, 16);
  }

  setTensionLevel(level: number): void {
    if (this.currentState !== 'explore' && this.currentState !== 'tension') return;
    const t = Math.max(0, Math.min(1, level));
    const ev = STATE_VOLUMES.explore; const tv = STATE_VOLUMES.tension;
    for (const [id, l] of this.layers) {
      const v = ((ev[id] ?? 0) + ((tv[id] ?? 0) - (ev[id] ?? 0)) * t) * this.masterVolume;
      l.howl.fade(l.currentVolume, v, 500);
      l.currentVolume = v; l.targetVolume = v;
    }
    if (t > 0.6 && this.currentState === 'explore') this.currentState = 'tension';
    else if (t < 0.3 && this.currentState === 'tension') this.currentState = 'explore';
  }

  onPageCollected(): void { const s = this.stingers.get('stinger_page'); s?.volume(0.7 * this.masterVolume); s?.play(); if (this.currentState === 'tension') { this.setState('safe'); setTimeout(() => { if (this.currentState === 'safe') this.setState('tension'); }, 8000); } }
  onMonsterNearby(): void { if (this.currentState === 'explore' || this.currentState === 'safe') this.setState('tension'); }
  onMonsterSeesPlayer(): void { this.setState('chase'); }
  onMonsterLost(): void { if (this.currentState === 'chase') { this.setState('tension'); setTimeout(() => { if (this.currentState === 'tension') this.setState('explore'); }, 15000); } }
  onPlayerDied(): void { this.setState('death'); }
  onPuzzleSolved(): void { const s = this.stingers.get('stinger_solve'); s?.volume(0.65 * this.masterVolume); s?.play(); this.setState('safe'); }
  onGameStart(): void { this.setState('explore'); }

  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    for (const [, l] of this.layers) l.howl.volume(l.targetVolume * this.masterVolume);
  }
  getCurrentState(): MusicState { return this.currentState; }

  destroy(): void {
    if (this.transitionTimer) clearInterval(this.transitionTimer);
    for (const [, l] of this.layers) { l.howl.stop(); l.howl.unload(); }
    for (const [, s] of this.stingers) s.unload();
    this.initialized = false;
  }
}

export const musicControllerInstance = new MusicController();
export default musicControllerInstance;
