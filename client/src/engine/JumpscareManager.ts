/**
 * JumpscareManager.ts — The Hollow Man
 * Orchestrates every terrifying jumpscare effect:
 * screen shake, monster face flash, audio stingers,
 * heartbeat pulse, CSS glitch distortion, controller vibration.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type JumpscareIntensity = 'mild' | 'medium' | 'full';

export interface JumpscareConfig {
  intensity: JumpscareIntensity;
  imagePath?: string;
  duration?: number;
  onComplete?: () => void;
}

interface IntensitySettings {
  shakeMagnitude: number;
  shakeDuration: number;
  flashDuration: number;
  faceVisible: boolean;
  faceDuration: number;
  stingerVolume: number;
  rumbleDuration: number;
  glitchIntensity: number;
}

const JUMPSCARE_IMAGES = [
  '/audio/jumpscares/monster_face_1.jpg',
  '/audio/jumpscares/monster_face_2.jpg',
  '/audio/jumpscares/monster_face_3.jpg',
];

const INTENSITY_SETTINGS: Record<JumpscareIntensity, IntensitySettings> = {
  mild:   { shakeMagnitude: 4,  shakeDuration: 400,  flashDuration: 120, faceVisible: false, faceDuration: 0,   stingerVolume: 0.5,  rumbleDuration: 200, glitchIntensity: 0.3 },
  medium: { shakeMagnitude: 10, shakeDuration: 700,  flashDuration: 200, faceVisible: true,  faceDuration: 400, stingerVolume: 0.85, rumbleDuration: 500, glitchIntensity: 0.6 },
  full:   { shakeMagnitude: 20, shakeDuration: 1000, flashDuration: 350, faceVisible: true,  faceDuration: 700, stingerVolume: 1.0,  rumbleDuration: 800, glitchIntensity: 1.0 },
};

// ─── Inject CSS ───────────────────────────────────────────────────────────────

function injectStyles(): void {
  if (document.getElementById('hollow-jumpscare-styles')) return;
  const style = document.createElement('style');
  style.id = 'hollow-jumpscare-styles';
  style.textContent = `
    @keyframes hollow-shake {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      10%  { transform: translate(-8px,4px) rotate(-0.5deg); }
      20%  { transform: translate(8px,-4px) rotate(0.5deg); }
      30%  { transform: translate(-10px,6px) rotate(-0.3deg); }
      40%  { transform: translate(10px,-6px) rotate(0.3deg); }
      50%  { transform: translate(-6px,8px) rotate(-0.4deg); }
      60%  { transform: translate(6px,-8px) rotate(0.4deg); }
      80%  { transform: translate(4px,-4px) rotate(0.2deg); }
      90%  { transform: translate(-2px,2px); }
    }
    .hollow-shake-mild   { animation: hollow-shake 0.4s cubic-bezier(.36,.07,.19,.97); }
    .hollow-shake-medium { animation: hollow-shake 0.7s cubic-bezier(.36,.07,.19,.97); }
    .hollow-shake-full   { animation: hollow-shake 1.0s cubic-bezier(.36,.07,.19,.97); }

    @keyframes hollow-glitch {
      0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
      5%   { clip-path: inset(20% 0 60% 0); opacity: 1; transform: skewX(-5deg); }
      20%  { clip-path: inset(0 0 0 0); opacity: 1; transform: skewX(0); }
      80%  { clip-path: inset(0 0 0 0); opacity: 1; }
      90%  { clip-path: inset(30% 0 50% 0); opacity: 0.7; }
      100% { clip-path: inset(0 0 100% 0); opacity: 0; }
    }

    #hollow-flash-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:white;opacity:0;pointer-events:none;z-index:9998;transition:opacity 0.05s; }
    #hollow-flash-overlay.flash-active { opacity:1; }
    #hollow-face-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:black;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;pointer-events:none;transition:opacity 0.03s; }
    #hollow-face-overlay.face-active { opacity:1; }
    #hollow-face-overlay img { width:100%;height:100%;object-fit:cover;animation:hollow-glitch 0.7s forwards; }
    #hollow-vignette-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.9) 100%);pointer-events:none;z-index:9990;opacity:0;transition:opacity 0.5s; }
    #hollow-vignette-overlay.active { opacity:1; }
    @keyframes hollow-heartbeat {
      0%,40%,100% { transform:scale(1);opacity:0; }
      10% { transform:scale(1.04);opacity:0.7; }
      30% { transform:scale(1.02);opacity:0.4; }
    }
    #hollow-heartbeat-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at center,rgba(180,0,0,0.4) 0%,transparent 70%);pointer-events:none;z-index:9991;opacity:0; }
    #hollow-heartbeat-overlay.pulse { animation:hollow-heartbeat 0.8s ease-out; }
    @keyframes hollow-static { 0%,100%{opacity:0} 25%{opacity:0.15} 50%{opacity:0.08} 75%{opacity:0.12} }
    #hollow-static-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:9992;opacity:0;mix-blend-mode:overlay; }
    #hollow-static-overlay.active { animation:hollow-static 0.5s ease-out; }
  `;
  document.head.appendChild(style);
}

// ─── JumpscareManager ─────────────────────────────────────────────────────────

export class JumpscareManager {
  private flashOverlay: HTMLElement | null = null;
  private faceOverlay: HTMLElement | null = null;
  private vignetteOverlay: HTMLElement | null = null;
  private heartbeatOverlay: HTMLElement | null = null;
  private staticOverlay: HTMLElement | null = null;
  private gameContainer: HTMLElement | null = null;
  private isActive = false;
  private currentAbort: AbortController | null = null;

  init(gameContainer?: HTMLElement): void {
    injectStyles();
    this.gameContainer = gameContainer ?? document.body;
    this.createOverlays();
  }

  private createOverlays(): void {
    const mk = (id: string) => { let e = document.getElementById(id); if (!e) { e = document.createElement('div'); e.id = id; document.body.appendChild(e); } return e; };
    this.flashOverlay = mk('hollow-flash-overlay');
    this.faceOverlay = mk('hollow-face-overlay');
    this.vignetteOverlay = mk('hollow-vignette-overlay');
    this.heartbeatOverlay = mk('hollow-heartbeat-overlay');
    this.staticOverlay = mk('hollow-static-overlay');
    if (this.faceOverlay && !this.faceOverlay.querySelector('img')) {
      const img = document.createElement('img'); img.id = 'hollow-face-img'; img.alt = ''; this.faceOverlay.appendChild(img);
    }
  }

  async trigger(config: JumpscareConfig): Promise<void> {
    this.currentAbort?.abort();
    const abort = new AbortController();
    this.currentAbort = abort;
    this.isActive = true;
    const { intensity = 'full', onComplete } = config;
    const s = INTENSITY_SETTINGS[intensity];
    const img = document.getElementById('hollow-face-img') as HTMLImageElement | null;
    if (img && s.faceVisible) img.src = config.imagePath ?? JUMPSCARE_IMAGES[Math.floor(Math.random() * JUMPSCARE_IMAGES.length)];
    try {
      await Promise.all([
        this.runFlash(s.flashDuration, abort.signal),
        this.runShake(intensity, s.shakeDuration, abort.signal),
        s.faceVisible ? this.runFace(s.faceDuration, abort.signal) : Promise.resolve(),
        this.runGlitch(s.glitchIntensity, abort.signal),
        this.runHeartbeat(abort.signal),
        this.runVibration(s.rumbleDuration, abort.signal),
      ]);
      if (!abort.signal.aborted) await this.sleep(2000, abort.signal);
    } catch { /* aborted */ }
    this.cleanUp();
    this.isActive = false;
    onComplete?.();
  }

  private runFlash(dur: number, sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted || !this.flashOverlay) { res(); return; }
      this.flashOverlay.classList.add('flash-active');
      const t = setTimeout(() => { this.flashOverlay?.classList.remove('flash-active'); res(); }, dur);
      sig.addEventListener('abort', () => { clearTimeout(t); this.flashOverlay?.classList.remove('flash-active'); res(); });
    });
  }

  private runShake(intensity: JumpscareIntensity, dur: number, sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted || !this.gameContainer) { res(); return; }
      const cls = `hollow-shake-${intensity}`;
      this.gameContainer.classList.add(cls);
      const t = setTimeout(() => { this.gameContainer?.classList.remove(cls); res(); }, dur + 50);
      sig.addEventListener('abort', () => { clearTimeout(t); this.gameContainer?.classList.remove(cls); res(); });
    });
  }

  private runFace(dur: number, sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted || !this.faceOverlay) { res(); return; }
      const t1 = setTimeout(() => {
        if (sig.aborted) { res(); return; }
        this.faceOverlay!.classList.add('face-active');
        const t2 = setTimeout(() => { this.faceOverlay?.classList.remove('face-active'); res(); }, dur);
        sig.addEventListener('abort', () => { clearTimeout(t2); this.faceOverlay?.classList.remove('face-active'); res(); });
      }, 60);
      sig.addEventListener('abort', () => clearTimeout(t1));
    });
  }

  private runGlitch(intensity: number, sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted || !this.staticOverlay || intensity < 0.4) { res(); return; }
      const bursts = Math.floor(intensity * 5); let done = 0;
      for (let i = 0; i < bursts; i++) {
        const t = setTimeout(() => {
          if (sig.aborted) return;
          this.staticOverlay!.classList.remove('active');
          void this.staticOverlay!.offsetWidth;
          this.staticOverlay!.classList.add('active');
          if (++done >= bursts) res();
        }, i * 180);
        sig.addEventListener('abort', () => clearTimeout(t));
      }
      if (!bursts) res();
    });
  }

  private runHeartbeat(sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted || !this.heartbeatOverlay) { res(); return; }
      this.heartbeatOverlay.classList.remove('pulse');
      void this.heartbeatOverlay.offsetWidth;
      this.heartbeatOverlay.classList.add('pulse');
      const t = setTimeout(() => { this.heartbeatOverlay?.classList.remove('pulse'); res(); }, 900);
      sig.addEventListener('abort', () => { clearTimeout(t); this.heartbeatOverlay?.classList.remove('pulse'); res(); });
    });
  }

  private runVibration(dur: number, sig: AbortSignal): Promise<void> {
    return new Promise(res => {
      if (sig.aborted) { res(); return; }
      const gamepads = navigator.getGamepads?.() ?? [];
      for (const gp of gamepads) {
        if (!gp) continue;
        const act = (gp as unknown as { vibrationActuator?: { playEffect: Function } }).vibrationActuator;
        act?.playEffect?.('dual-rumble', { startDelay: 0, duration: dur, weakMagnitude: 0.5, strongMagnitude: 1.0 }).catch(() => {});
      }
      if ('vibrate' in navigator) navigator.vibrate([dur, 100, dur / 2]);
      setTimeout(res, dur);
    });
  }

  setSanityLevel(sanity: number): void {
    if (!this.vignetteOverlay) return;
    this.vignetteOverlay.style.opacity = String((1 - sanity) * 0.8);
  }

  triggerMicroGlitch(): void {
    if (!this.staticOverlay || this.isActive) return;
    this.staticOverlay.classList.remove('active');
    void this.staticOverlay.offsetWidth;
    this.staticOverlay.classList.add('active');
    if (this.gameContainer) {
      this.gameContainer.classList.add('hollow-shake-mild');
      setTimeout(() => this.gameContainer?.classList.remove('hollow-shake-mild'), 450);
    }
  }

  async triggerMonsterPeek(imagePath?: string): Promise<void> {
    if (!this.faceOverlay || this.isActive) return;
    const img = document.getElementById('hollow-face-img') as HTMLImageElement | null;
    if (img) { img.src = imagePath ?? JUMPSCARE_IMAGES[0]; img.style.opacity = '0.3'; }
    this.faceOverlay.style.opacity = '0.15';
    this.faceOverlay.classList.add('face-active');
    await this.sleep(200);
    this.faceOverlay.style.opacity = '';
    this.faceOverlay.classList.remove('face-active');
    if (img) img.style.opacity = '';
  }

  async triggerDeath(): Promise<void> { await this.trigger({ intensity: 'full' }); }
  async triggerMonsterSpotted(): Promise<void> { await this.trigger({ intensity: 'medium' }); }
  triggerEnvironmentalScare(): void { this.trigger({ intensity: 'mild' }); }

  isJumpscareActive(): boolean { return this.isActive; }

  private sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise(res => { const t = setTimeout(res, ms); signal?.addEventListener('abort', () => { clearTimeout(t); res(); }); });
  }

  private cleanUp(): void {
    this.flashOverlay?.classList.remove('flash-active');
    this.faceOverlay?.classList.remove('face-active');
    this.heartbeatOverlay?.classList.remove('pulse');
    this.staticOverlay?.classList.remove('active');
    ['hollow-shake-mild','hollow-shake-medium','hollow-shake-full'].forEach(c => this.gameContainer?.classList.remove(c));
  }

  destroy(): void {
    this.currentAbort?.abort();
    this.cleanUp();
    document.getElementById('hollow-jumpscare-styles')?.remove();
    ['hollow-flash-overlay','hollow-face-overlay','hollow-vignette-overlay','hollow-heartbeat-overlay','hollow-static-overlay'].forEach(id => document.getElementById(id)?.remove());
  }
}

export const jumpscareManagerInstance = new JumpscareManager();
export default jumpscareManagerInstance;
