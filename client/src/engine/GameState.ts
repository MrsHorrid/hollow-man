import { GamePhase, GameRoom, Monster, Page, Puzzle, SocketEvents } from '@shared/types/game';
import { Player } from '@shared/types/player';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

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
  };
  private listeners: Set<GameStateListener> = new Set();

  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(SERVER_URL, { autoConnect: true });

    this.socket.on('connect', () => {
      this.update({ playerId: this.socket!.id ?? null, isConnected: true });
      this.fetchRooms();
    });

    this.socket.on('disconnect', () => {
      this.update({ isConnected: false });
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
    });
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
    try {
      const res = await fetch(`${SERVER_URL}/rooms`);
      const rooms = await res.json();
      this.update({ availableRooms: rooms });
    } catch (e) {
      console.error('Failed to fetch rooms', e);
    }
  }

  async createRoom(name: string): Promise<string | null> {
    try {
      const res = await fetch(`${SERVER_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      return data.id;
    } catch {
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

  setInteractionPrompt(prompt: string | null): void {
    if (this.state.showInteraction !== prompt) {
      this.update({ showInteraction: prompt });
    }
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}

export const gameState = new GameStateManager();
