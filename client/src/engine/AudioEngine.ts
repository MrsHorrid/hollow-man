/**
 * AudioEngine.ts — The Hollow Man
 * Single integration point. Wires SoundManager + MusicController + JumpscareManager + VoiceChat.
 *
 * Usage:
 *   import AudioEngine from './engine/AudioEngine';
 *   await AudioEngine.init({ gameContainer: document.getElementById('game')! });
 *   AudioEngine.setMonsterProximity(0.8);
 *   AudioEngine.onPageCollected();
 *   AudioEngine.triggerJumpscare('full');
 */

import { soundManagerInstance } from './SoundManager';
import { musicControllerInstance } from './MusicController';
import { jumpscareManagerInstance } from './JumpscareManager';
import { voiceChatInstance } from './VoiceChat';

export type { SurfaceType, AudioPosition } from './SoundManager';
export type { JumpscareIntensity } from './JumpscareManager';
export type { MusicState } from './MusicController';

export interface AudioEngineConfig {
  gameContainer?: HTMLElement;
  voiceChat?: {
    signalingServerUrl: string;
    roomId: string;
    playerId: string;
    playerName: string;
    maxHearingDistance?: number;
  };
  masterVolume?: number;
  musicVolume?: number;
  sfxVolume?: number;
  ambientVolume?: number;
}

import type { SurfaceType, AudioPosition } from './SoundManager';
import type { JumpscareIntensity } from './JumpscareManager';

class AudioEngineClass {
  private initialized = false;

  async init(config: AudioEngineConfig = {}): Promise<void> {
    if (this.initialized) return;
    const container = config.gameContainer ?? document.body;
    await Promise.all([soundManagerInstance.init(), musicControllerInstance.init()]);
    jumpscareManagerInstance.init(container);
    if (config.voiceChat) {
      try {
        await voiceChatInstance.init({
          signalingServerUrl: config.voiceChat.signalingServerUrl,
          roomId: config.voiceChat.roomId,
          playerId: config.voiceChat.playerId,
          playerName: config.voiceChat.playerName,
          maxHearingDistance: config.voiceChat.maxHearingDistance ?? 50,
          proximityDistortionStart: 0.5,
        });
      } catch (e) { console.warn('[AudioEngine] Voice chat unavailable:', e); }
    }
    if (config.masterVolume !== undefined) this.setMasterVolume(config.masterVolume);
    if (config.musicVolume !== undefined) musicControllerInstance.setMasterVolume(config.musicVolume);
    if (config.sfxVolume !== undefined) soundManagerInstance.setSfxVolume(config.sfxVolume);
    if (config.ambientVolume !== undefined) soundManagerInstance.setAmbientVolume(config.ambientVolume);
    musicControllerInstance.onGameStart();
    this.initialized = true;
    console.log('[AudioEngine] All systems online. The Hollow Man listens.');
  }

  setPlayerPosition(position: AudioPosition, orientation?: AudioPosition): void {
    soundManagerInstance.setListenerPosition(position, orientation);
    voiceChatInstance.updateLocalPosition(position);
    if (orientation) voiceChatInstance.updateLocalOrientation(orientation);
  }

  setPlayerFootstep(surface: SurfaceType, volume?: number): void {
    soundManagerInstance.playFootstep(surface, volume);
  }

  setMonsterProximity(proximity: number, monsterPosition?: AudioPosition): void {
    soundManagerInstance.setMonsterProximity(proximity);
    musicControllerInstance.setTensionLevel(proximity);
    voiceChatInstance.setMonsterProximity(proximity);
    jumpscareManagerInstance.setSanityLevel(1 - proximity * 0.5);
    if (monsterPosition) soundManagerInstance.updateMonsterPosition(monsterPosition);
    const state = musicControllerInstance.getCurrentState();
    if (proximity > 0.9 && state !== 'chase' && state !== 'death') musicControllerInstance.onMonsterSeesPlayer();
    else if (proximity > 0.3 && state === 'explore') musicControllerInstance.onMonsterNearby();
    else if (proximity < 0.1 && state === 'tension') musicControllerInstance.onMonsterLost();
  }

  onMonsterStartChase(position: AudioPosition): void {
    soundManagerInstance.startMonsterBreathing(position);
    soundManagerInstance.onMonsterSpotted();
    musicControllerInstance.onMonsterSeesPlayer();
  }

  onMonsterEndChase(): void { soundManagerInstance.stopMonsterBreathing(); musicControllerInstance.onMonsterLost(); }
  onMonsterFootstep(pos: AudioPosition): void { soundManagerInstance.playMonsterFootstep(pos); }
  onPageCollected(): void { soundManagerInstance.onPageCollected(); musicControllerInstance.onPageCollected(); }
  onPuzzleSolved(): void { soundManagerInstance.onPuzzleSolved(); musicControllerInstance.onPuzzleSolved(); }
  onPlayerDied(): void { soundManagerInstance.onPlayerDeath(); musicControllerInstance.onPlayerDied(); jumpscareManagerInstance.triggerDeath(); }
  onDoorCreak(): void { soundManagerInstance.onDoorCreak(); }

  async triggerJumpscare(intensity: JumpscareIntensity = 'full', imagePath?: string): Promise<void> {
    await jumpscareManagerInstance.trigger({ intensity, imagePath });
  }
  triggerMicroGlitch(): void { jumpscareManagerInstance.triggerMicroGlitch(); }
  async triggerMonsterPeek(imagePath?: string): Promise<void> {
    await jumpscareManagerInstance.triggerMonsterPeek(imagePath);
    soundManagerInstance.playSfx('monster_breath', { volume: 0.3 });
  }

  updatePeerPosition(peerId: string, position: AudioPosition): void { voiceChatInstance.updatePeerPosition(peerId, position); }
  muteVoiceChat(): void { voiceChatInstance.mute(); }
  unmuteVoiceChat(): void { voiceChatInstance.unmute(); }
  toggleVoiceChat(): void { voiceChatInstance.toggleMute(); }

  setMasterVolume(v: number): void {
    soundManagerInstance.setMasterVolume(v);
    musicControllerInstance.setMasterVolume(v);
  }

  setSanity(sanity: number): void {
    jumpscareManagerInstance.setSanityLevel(sanity);
    soundManagerInstance.setAmbientVolume(0.5 + sanity * 0.5);
  }

  destroy(): void {
    soundManagerInstance.destroy();
    musicControllerInstance.destroy();
    jumpscareManagerInstance.destroy();
    voiceChatInstance.destroy();
    this.initialized = false;
  }
}

export const AudioEngine = new AudioEngineClass();
export default AudioEngine;
export { soundManagerInstance as SoundManager, musicControllerInstance as MusicController, jumpscareManagerInstance as JumpscareManager, voiceChatInstance as VoiceChat };
