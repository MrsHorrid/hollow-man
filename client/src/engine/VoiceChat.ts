/**
 * VoiceChat.ts — The Hollow Man
 * Proximity-based WebRTC voice chat with horror audio effects.
 * Voice degrades/distorts as monster gets closer.
 * Players only hear nearby players (positional 3D audio).
 */

export interface VoicePeer {
  id: string;
  displayName: string;
  position: { x: number; y: number; z: number };
  stream: MediaStream | null;
  sourceNode: MediaStreamAudioSourceNode | null;
  pannerNode: PannerNode | null;
  gainNode: GainNode | null;
  distortionNode: WaveShaperNode | null;
  filterNode: BiquadFilterNode | null;
  distance: number;
}

export interface VoiceChatConfig {
  signalingServerUrl: string;
  maxHearingDistance: number;
  proximityDistortionStart: number;
  roomId: string;
  playerId: string;
  playerName: string;
}

export type VoiceChatEvent = 'peer-joined' | 'peer-left' | 'peer-speaking' | 'connection-error' | 'local-muted' | 'local-unmuted';
type VoiceChatListener = (event: VoiceChatEvent, data?: unknown) => void;

export class VoiceChat {
  private config: VoiceChatConfig | null = null;
  private localStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private peers: Map<string, VoicePeer> = new Map();
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private signalingSocket: WebSocket | null = null;
  private listeners: VoiceChatListener[] = [];
  private localGain: GainNode | null = null;
  private localAnalyser: AnalyserNode | null = null;
  private isMuted = false;
  private isSpeaking = false;
  private monsterProximity = 0;
  private vadInterval: ReturnType<typeof setInterval> | null = null;
  private tremorInterval: ReturnType<typeof setInterval> | null = null;

  async init(config: VoiceChatConfig): Promise<void> {
    this.config = config;
    this.audioCtx = new AudioContext();
    this.localStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
    this.setupLocalChain();
    this.connectSignaling();
    this.startVAD();
  }

  private setupLocalChain(): void {
    if (!this.audioCtx || !this.localStream) return;
    const ctx = this.audioCtx;
    const src = ctx.createMediaStreamSource(this.localStream);
    this.localGain = ctx.createGain();
    this.localAnalyser = ctx.createAnalyser();
    this.localAnalyser.fftSize = 256;
    src.connect(this.localGain).connect(this.localAnalyser);
  }

  private setupPeerChain(peer: VoicePeer): void {
    if (!this.audioCtx || !peer.stream) return;
    const ctx = this.audioCtx;
    peer.sourceNode = ctx.createMediaStreamSource(peer.stream);
    peer.gainNode = ctx.createGain();
    peer.distortionNode = ctx.createWaveShaper();
    peer.distortionNode.curve = this.distortionCurve(0);
    peer.distortionNode.oversample = '4x';
    peer.filterNode = ctx.createBiquadFilter();
    peer.filterNode.type = 'bandpass';
    peer.filterNode.frequency.value = 1800;
    peer.filterNode.Q.value = 0.5;
    peer.pannerNode = ctx.createPanner();
    peer.pannerNode.panningModel = 'HRTF';
    peer.pannerNode.distanceModel = 'inverse';
    peer.pannerNode.refDistance = 1;
    peer.pannerNode.maxDistance = this.config?.maxHearingDistance ?? 50;
    peer.pannerNode.rolloffFactor = 2;
    peer.sourceNode.connect(peer.distortionNode).connect(peer.filterNode).connect(peer.gainNode).connect(peer.pannerNode).connect(ctx.destination);
    this.updatePeerPosition(peer.id, peer.position);
  }

  updatePeerPosition(peerId: string, pos: { x: number; y: number; z: number }): void {
    const peer = this.peers.get(peerId);
    if (!peer || !peer.pannerNode || !this.audioCtx) return;
    peer.position = pos;
    const t = this.audioCtx.currentTime;
    peer.pannerNode.positionX.setTargetAtTime(pos.x, t, 0.1);
    peer.pannerNode.positionY.setTargetAtTime(pos.y, t, 0.1);
    peer.pannerNode.positionZ.setTargetAtTime(pos.z, t, 0.1);
    this.recalcPeer(peer);
  }

  updateLocalPosition(pos: { x: number; y: number; z: number }): void {
    if (!this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    this.audioCtx.listener.positionX.setTargetAtTime(pos.x, t, 0.1);
    this.audioCtx.listener.positionY.setTargetAtTime(pos.y, t, 0.1);
    this.audioCtx.listener.positionZ.setTargetAtTime(pos.z, t, 0.1);
  }

  updateLocalOrientation(fwd: { x: number; y: number; z: number }): void {
    if (!this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    this.audioCtx.listener.forwardX.setTargetAtTime(fwd.x, t, 0.1);
    this.audioCtx.listener.forwardY.setTargetAtTime(fwd.y, t, 0.1);
    this.audioCtx.listener.forwardZ.setTargetAtTime(fwd.z, t, 0.1);
    this.audioCtx.listener.upX.setTargetAtTime(0, t, 0.1);
    this.audioCtx.listener.upY.setTargetAtTime(1, t, 0.1);
    this.audioCtx.listener.upZ.setTargetAtTime(0, t, 0.1);
  }

  private recalcPeer(peer: VoicePeer): void {
    if (!peer.gainNode || !peer.distortionNode || !peer.filterNode || !this.audioCtx) return;
    const maxD = this.config?.maxHearingDistance ?? 50;
    const dRatio = Math.min(peer.distance / maxD, 1);
    peer.gainNode.gain.setTargetAtTime(Math.max(0, 1 - dRatio), this.audioCtx.currentTime, 0.1);
    const intf = this.monsterProximity * (1 - dRatio * 0.5);
    if (intf > 0.1) {
      peer.distortionNode.curve = this.distortionCurve(intf * 300);
      peer.filterNode.frequency.setTargetAtTime(800 + (1 - intf) * 2200, this.audioCtx.currentTime, 0.2);
      peer.filterNode.Q.setTargetAtTime(0.5 + intf * 8, this.audioCtx.currentTime, 0.2);
    } else {
      peer.distortionNode.curve = this.distortionCurve(0);
      peer.filterNode.frequency.setTargetAtTime(1800, this.audioCtx.currentTime, 0.3);
      peer.filterNode.Q.setTargetAtTime(0.5, this.audioCtx.currentTime, 0.3);
    }
  }

  private distortionCurve(amount: number): Float32Array<ArrayBuffer> {
    const n = 256; const curve = new Float32Array(n) as Float32Array<ArrayBuffer>; const deg = Math.PI / 180;
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = amount === 0 ? x : ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

  setMonsterProximity(proximity: number): void {
    this.monsterProximity = Math.max(0, Math.min(1, proximity));
    for (const [, p] of this.peers) this.recalcPeer(p);
    if (proximity > 0.8 && !this.tremorInterval) this.startTremor();
    else if (proximity <= 0.8 && this.tremorInterval) this.stopTremor();
  }

  private startTremor(): void {
    let t = 0;
    this.tremorInterval = setInterval(() => {
      if (!this.localGain || !this.audioCtx) return;
      t += 0.15;
      this.localGain.gain.setTargetAtTime(1 + Math.sin(t * 12) * 0.05 * this.monsterProximity, this.audioCtx.currentTime, 0.02);
    }, 30);
  }

  private stopTremor(): void {
    if (this.tremorInterval) { clearInterval(this.tremorInterval); this.tremorInterval = null; }
    if (this.localGain && this.audioCtx) this.localGain.gain.setTargetAtTime(1.0, this.audioCtx.currentTime, 0.1);
  }

  private startVAD(): void {
    if (!this.localAnalyser) return;
    const buf = new Uint8Array(this.localAnalyser.frequencyBinCount);
    this.vadInterval = setInterval(() => {
      if (!this.localAnalyser) return;
      this.localAnalyser.getByteFrequencyData(buf);
      const avg = buf.reduce((s, v) => s + v, 0) / buf.length / 255;
      const speaking = avg > 0.02;
      if (speaking !== this.isSpeaking) { this.isSpeaking = speaking; this.emit('peer-speaking', { peerId: this.config?.playerId, speaking }); }
    }, 100);
  }

  mute(): void { this.localStream?.getAudioTracks().forEach(t => (t.enabled = false)); this.isMuted = true; this.emit('local-muted'); }
  unmute(): void { this.localStream?.getAudioTracks().forEach(t => (t.enabled = true)); this.isMuted = false; this.emit('local-unmuted'); }
  toggleMute(): void { this.isMuted ? this.unmute() : this.mute(); }

  private connectSignaling(): void {
    if (!this.config) return;
    try {
      this.signalingSocket = new WebSocket(this.config.signalingServerUrl);
      this.signalingSocket.onopen = () => this.sendSignal('join', { roomId: this.config!.roomId, playerId: this.config!.playerId, playerName: this.config!.playerName });
      this.signalingSocket.onmessage = (e) => { try { this.handleSignal(JSON.parse(e.data)); } catch { /**/ } };
      this.signalingSocket.onclose = () => setTimeout(() => this.connectSignaling(), 3000);
      this.signalingSocket.onerror = (e) => this.emit('connection-error', e);
    } catch (e) { this.emit('connection-error', e); }
  }

  private sendSignal(type: string, data: Record<string, unknown>): void {
    if (this.signalingSocket?.readyState === WebSocket.OPEN) this.signalingSocket.send(JSON.stringify({ type, ...data }));
  }

  private async handleSignal(msg: Record<string, unknown>): Promise<void> {
    switch (msg['type']) {
      case 'peer-joined': await this.onPeerJoined(msg['peerId'] as string, msg['playerName'] as string); break;
      case 'peer-left': this.onPeerLeft(msg['peerId'] as string); break;
      case 'offer': await this.handleOffer(msg['peerId'] as string, msg['sdp'] as RTCSessionDescriptionInit); break;
      case 'answer': await this.handleAnswer(msg['peerId'] as string, msg['sdp'] as RTCSessionDescriptionInit); break;
      case 'ice-candidate': await this.handleIce(msg['peerId'] as string, msg['candidate'] as RTCIceCandidateInit); break;
      case 'position-update': this.updatePeerPosition(msg['peerId'] as string, msg['position'] as { x: number; y: number; z: number }); break;
    }
  }

  private createPC(peerId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    this.localStream?.getTracks().forEach(t => pc.addTrack(t, this.localStream!));
    pc.onicecandidate = (e) => { if (e.candidate) this.sendSignal('ice-candidate', { peerId, candidate: e.candidate as unknown as Record<string, unknown> }); };
    pc.ontrack = (e) => { const p = this.peers.get(peerId); if (p) { p.stream = e.streams[0]; this.setupPeerChain(p); } };
    this.peerConnections.set(peerId, pc);
    return pc;
  }

  private async onPeerJoined(peerId: string, playerName: string): Promise<void> {
    const pc = this.createPC(peerId);
    const offer = await pc.createOffer({ offerToReceiveAudio: true });
    await pc.setLocalDescription(offer);
    this.sendSignal('offer', { peerId, sdp: offer as unknown as Record<string, unknown> });
    this.peers.set(peerId, { id: peerId, displayName: playerName, position: { x: 0, y: 0, z: 0 }, stream: null, sourceNode: null, pannerNode: null, gainNode: null, distortionNode: null, filterNode: null, distance: 999 });
    this.emit('peer-joined', { peerId, playerName });
  }

  private onPeerLeft(peerId: string): void {
    const p = this.peers.get(peerId);
    if (p) { p.sourceNode?.disconnect(); p.pannerNode?.disconnect(); p.gainNode?.disconnect(); p.stream?.getTracks().forEach(t => t.stop()); this.peers.delete(peerId); }
    const pc = this.peerConnections.get(peerId);
    if (pc) { pc.close(); this.peerConnections.delete(peerId); }
    this.emit('peer-left', { peerId });
  }

  private async handleOffer(peerId: string, sdp: RTCSessionDescriptionInit): Promise<void> {
    const pc = this.createPC(peerId);
    await pc.setRemoteDescription(sdp);
    const ans = await pc.createAnswer();
    await pc.setLocalDescription(ans);
    this.sendSignal('answer', { peerId, sdp: ans as unknown as Record<string, unknown> });
  }

  private async handleAnswer(peerId: string, sdp: RTCSessionDescriptionInit): Promise<void> { await this.peerConnections.get(peerId)?.setRemoteDescription(sdp); }
  private async handleIce(peerId: string, candidate: RTCIceCandidateInit): Promise<void> { await this.peerConnections.get(peerId)?.addIceCandidate(candidate); }

  on(cb: VoiceChatListener): () => void { this.listeners.push(cb); return () => { this.listeners = this.listeners.filter(l => l !== cb); }; }
  private emit(event: VoiceChatEvent, data?: unknown): void { this.listeners.forEach(l => l(event, data)); }

  getPeers(): VoicePeer[] { return Array.from(this.peers.values()); }
  isLocalMuted(): boolean { return this.isMuted; }
  isSpeakingNow(): boolean { return this.isSpeaking; }

  destroy(): void {
    if (this.vadInterval) clearInterval(this.vadInterval);
    if (this.tremorInterval) clearInterval(this.tremorInterval);
    this.signalingSocket?.close();
    this.localStream?.getTracks().forEach(t => t.stop());
    for (const [, pc] of this.peerConnections) pc.close();
    this.audioCtx?.close();
  }
}

export const voiceChatInstance = new VoiceChat();
export default voiceChatInstance;
