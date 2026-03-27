import { GamePhase, GameRoom, Monster, Page, Puzzle, SocketEvents } from '@shared/types/game';
import { Player } from '@shared/types/player';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'reconnecting' | 'error';

export interface LocalGameState {
  phase: GamePhase;
  roomId: string | null;
  roomName: string | null;
  playerId: string | null;
  playerName: string;
  players: Map<string, Player>;
  pages: Page[];
  puzzles: Puzzle[];
  monster: Monster | null;
  pagesCollected: number;
  totalPages: number;
  availableRooms: RoomInfo[];
  myPlayer: Player | null;
  showInteraction: string | null;
  monsterDistance: number;
  isConnected: boolean;
  connectionState: ConnectionState;
  connectionError?: string;
  latency: number;
  isLoading: boolean;
  loadingMessage: string;
  loadingProgress: number;
}

export interface RoomInfo {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  phase: string;
}

type GameStateListener = (state: LocalGameState) => void;

class GameStateManager {
  private socket: Socket | null = null;
  private state: LocalGameState = {
    phase: GamePhase.LOBBY,
    roomId: null,
    roomName: null,
    playerId: null,
    playerName: 'Player',
    players: new Map(),
    pages: [],
    puzzles: [],
    monster: null,
    pagesCollected: 0,
    totalPages: 8,
    availableRooms: [],
    myPlayer: null,
    showInteraction: null,
    monsterDistance: Infinity,
    isConnected: false,
    connectionState: 'disconnected',
    latency: 0,
    isLoading: false,
    loadingMessage: '',
    loadingProgress: 0,
  };
  private listeners: Set<GameStateListener> = new Set();
  private latencyInterval: ReturnType<typeof setInterval> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;

  connect(): void {
    // Don't create a second socket if one already exists (handles React StrictMode double-invoke)
    if (this.socket) return;

    this.update({ connectionState: 'connecting', isLoading: true, loadingMessage: 'Connecting to server...' });

    this.socket = io(SERVER_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      this.update({ 
        playerId: this.socket!.id ?? null, 
        isConnected: true, 
        connectionState: 'connected',
        connectionError: undefined,
        isLoading: false,
        loadingProgress: 100,
      });
      this.fetchRooms();
      this.startLatencyCheck();
    });

    this.socket.on('connect_error', (err) => {
      console.error('[GameState] Connection error:', err.message);
      this.update({ 
        connectionState: 'error', 
        connectionError: err.message,
        isLoading: false,
      });
    });

    this.socket.on('disconnect', (reason) => {
      this.update({ 
        isConnected: false, 
        connectionState: reason === 'io client disconnect' ? 'disconnected' : 'reconnecting',
      });
      this.stopLatencyCheck();
    });

    this.socket.io.on('reconnect_attempt', (attempt) => {
      this.reconnectAttempts = attempt;
      this.update({ 
        connectionState: 'reconnecting',
        isLoading: true,
        loadingMessage: `Reconnecting... (${attempt}/${this.maxReconnectAttempts})`,
        loadingProgress: (attempt / this.maxReconnectAttempts) * 100,
      });
    });

    this.socket.io.on('reconnect_failed', () => {
      this.update({ 
        connectionState: 'error',
        connectionError: 'Failed to reconnect after multiple attempts',
        isLoading: false,
      });
    });

    this.socket.on(SocketEvents.ROOM_STATE, (data: { room: GameRoom; players: Player[] }) => {
      const playerMap = new Map<string, Player>();
      data.players.forEach(p => playerMap.set(p.id, p));

      const myPlayer = playerMap.get(this.socket?.id || '') || null;
      this.update({
        roomId: data.room.id,
        roomName: data.room.name,
        phase: data.room.phase,
        pages: data.room.pages,
        puzzles: data.room.puzzles,
        monster: data.room.monster,
        pagesCollected: data.room.pagesCollected,
        totalPages: data.room.totalPages,
        players: playerMap,
        myPlayer,
        isLoading: false,
        loadingProgress: 100,
      });
    });

    this.socket.on(SocketEvents.GAME_START, (data: { room: GameRoom; players: Player[] }) => {
      const playerMap = new Map<string, Player>();
      data.players.forEach(p => playerMap.set(p.id, p));
      const myPlayer = playerMap.get(this.socket?.id || '') || null;

      this.update({
        phase: GamePhase.PLAYING,
        pages: data.room.pages,
        puzzles: data.room.puzzles,
        monster: data.room.monster,
        pagesCollected: 0,
        players: playerMap,
        myPlayer,
        isLoading: false,
        loadingProgress: 100,
      });
    });

    this.socket.on(SocketEvents.PLAYER_JOINED, ({ player }: { player: Player }) => {
      const players = new Map(this.state.players);
      players.set(player.id, player);
      this.update({ players });
    });

    this.socket.on(SocketEvents.PLAYER_LEFT, ({ playerId }: { playerId: string }) => {
      const players = new Map(this.state.players);
      players.delete(playerId);
      this.update({ players });
    });

    this.socket.on(SocketEvents.MONSTER_UPDATE, (data: { monster: Monster; players: any[] }) => {
      // Update monster
      const myId = this.socket?.id;
      let monsterDist = Infinity;

      const players = new Map(this.state.players);
      data.players.forEach((p: any) => {
        const existing = players.get(p.id);
        if (existing) {
          players.set(p.id, { ...existing, ...p });
        }
        if (myId && p.id === myId) {
          const myP = players.get(myId);
          if (myP && data.monster) {
            const dx = myP.position.x - data.monster.position.x;
            const dz = myP.position.z - data.monster.position.z;
            monsterDist = Math.sqrt(dx * dx + dz * dz);
          }
        }
      });

      const myPlayer = players.get(myId || '') || this.state.myPlayer;
      this.update({
        monster: data.monster,
        players,
        myPlayer: myPlayer || null,
        monsterDistance: monsterDist,
      });
    });

    this.socket.on(SocketEvents.PAGE_COLLECTED, (data: {
      pageId: string;
      playerId: string;
      pagesCollected: number;
      totalPages: number;
    }) => {
      const pages = this.state.pages.map(p =>
        p.id === data.pageId ? { ...p, collected: true, collectedBy: data.playerId } : p
      );
      this.update({ pages, pagesCollected: data.pagesCollected });
    });

    this.socket.on(SocketEvents.PUZZLE_UPDATE, (data: { puzzle: Puzzle; solved?: boolean }) => {
      const puzzles = this.state.puzzles.map(p =>
        p.id === data.puzzle.id ? data.puzzle : p
      );
      this.update({ puzzles });
    });

    this.socket.on(SocketEvents.GAME_OVER, () => {
      this.update({ phase: GamePhase.GAME_OVER });
    });

    this.socket.on(SocketEvents.GAME_WIN, () => {
      this.update({ phase: GamePhase.WIN });
    });

    this.socket.on('error', (err: { message: string }) => {
      console.error('[GameState] Server error:', err.message);
      this.update({ connectionError: err.message });
    });
  }

  private startLatencyCheck(): void {
    this.latencyInterval = setInterval(() => {
      const start = Date.now();
      this.socket?.emit('ping', () => {
        const latency = Date.now() - start;
        this.update({ latency });
      });
    }, 5000);
  }

  private stopLatencyCheck(): void {
    if (this.latencyInterval) {
      clearInterval(this.latencyInterval);
      this.latencyInterval = null;
    }
  }

  setLoading(loading: boolean, message: string = '', progress: number = 0): void {
    this.update({ isLoading: loading, loadingMessage: message, loadingProgress: progress });
  }

  private update(partial: Partial<LocalGameState>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach(l => l(this.state));
  }

  subscribe(listener: GameStateListener): () => void {
    this.listeners.add(listener);
    listener(this.state); // immediate call
    return () => this.listeners.delete(listener);
  }

  getState(): LocalGameState {
    return this.state;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  async fetchRooms(): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${SERVER_URL}/rooms`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) return;
      const rooms = await res.json();
      this.update({ availableRooms: rooms });
    } catch (e) {
      clearTimeout(timeout);
      console.error('[GameState] Failed to fetch rooms:', e);
    }
  }

  async createRoom(name: string): Promise<string | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    try {
      const res = await fetch(`${SERVER_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        console.error('[GameState] createRoom HTTP error:', res.status);
        return null;
      }
      const data = await res.json();
      return data.id ?? null;
    } catch (err: unknown) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === 'AbortError') {
        console.error('[GameState] createRoom timed out - is the server running?');
      } else {
        console.error('[GameState] createRoom failed:', err);
      }
      return null;
    }
  }

  joinRoom(roomId: string, playerName: string): void {
    this.update({ playerName });
    this.socket?.emit(SocketEvents.JOIN_ROOM, { roomId, playerName });
  }

  startGame(roomId: string): void {
    fetch(`${SERVER_URL}/rooms/${roomId}/start`, { method: 'POST' });
  }

  sendPlayerMove(position: { x: number; y: number; z: number }, rotation: number, pitch: number, isSprinting: boolean): void {
    this.socket?.emit(SocketEvents.PLAYER_MOVE, { position, rotation, pitch, isSprinting });
    
    // Update local player state optimistically
    if (this.state.myPlayer) {
      const myPlayer = { ...this.state.myPlayer, position, rotation, pitch, isSprinting };
      const players = new Map(this.state.players);
      players.set(myPlayer.id, myPlayer);
      this.state.myPlayer = myPlayer;
      this.state.players = players;
    }
  }

  sendCollectPage(pageId: string): void {
    this.socket?.emit(SocketEvents.COLLECT_PAGE, { pageId });
  }

  sendPuzzleInteract(puzzleId: string, code?: string): void {
    this.socket?.emit(SocketEvents.PUZZLE_INTERACT, { puzzleId, code });
  }

  sendLookingAtMonster(isLooking: boolean): void {
    this.socket?.emit(SocketEvents.PLAYER_LOOKING_AT_MONSTER, { isLooking });
  }

  sendVoiceData(audioData: ArrayBuffer): void {
    this.socket?.emit(SocketEvents.VOICE_DATA, audioData);
  }

  reconnect(): void {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connect();
    }
  }

  setInteractionPrompt(prompt: string | null): void {
    if (this.state.showInteraction !== prompt) {
      this.update({ showInteraction: prompt });
    }
  }

  disconnect(): void {
    this.stopLatencyCheck();
    this.socket?.disconnect();
    this.socket = null;
    this.update({ 
      isConnected: false, 
      connectionState: 'disconnected',
      connectionError: undefined,
    });
  }
}

export const gameState = new GameStateManager();
