// Shared game types between client and server

export enum GamePhase {
  LOBBY = 'lobby',
  PLAYING = 'playing',
  GAME_OVER = 'game_over',
  WIN = 'win',
}

export enum MonsterState {
  IDLE = 'idle',
  STALKING = 'stalking',
  HUNTING = 'hunting',
  TELEPORTING = 'teleporting',
  ATTACKING = 'attacking',
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Page {
  id: string;
  position: Vector3;
  collected: boolean;
  collectedBy?: string;
}

export interface Puzzle {
  id: string;
  type: 'switch' | 'code' | 'lever' | 'pressure_plate';
  position: Vector3;
  solved: boolean;
  requiresPlayers: number; // how many players needed to solve
  activatedBy: string[]; // player IDs currently on it
  code?: string; // for code puzzles
  rewardDescription: string;
}

export interface Monster {
  position: Vector3;
  rotation: number; // Y rotation in radians
  state: MonsterState;
  targetPlayerId?: string;
  teleporting: boolean;
  speed: number;
  visibleToPlayers: string[]; // player IDs who can see the monster
}

export interface GameRoom {
  id: string;
  name: string;
  players: string[];
  maxPlayers: number;
  phase: GamePhase;
  pages: Page[];
  puzzles: Puzzle[];
  monster: Monster;
  pagesCollected: number;
  totalPages: number;
  startTime?: number;
  endTime?: number;
  ambientEventTimer: number;
}

export interface JumpscareEvent {
  type: 'monster_close' | 'peripheral' | 'puzzle_fail' | 'ambient' | 'player_scream';
  intensity: number; // 0-1
  playerId: string;
  position?: Vector3;
}

export interface AmbientEvent {
  type: 'branch_snap' | 'whisper' | 'wind' | 'footstep' | 'breathing';
  position: Vector3;
  volume: number;
}

// Socket event types
export enum SocketEvents {
  // Client -> Server
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  PLAYER_MOVE = 'player_move',
  COLLECT_PAGE = 'collect_page',
  PUZZLE_INTERACT = 'puzzle_interact',
  PLAYER_DIED = 'player_died',
  VOICE_DATA = 'voice_data',
  PLAYER_LOOKING_AT_MONSTER = 'player_looking_at_monster',

  // Server -> Client
  ROOM_STATE = 'room_state',
  PLAYER_JOINED = 'player_joined',
  PLAYER_LEFT = 'player_left',
  GAME_START = 'game_start',
  GAME_OVER = 'game_over',
  GAME_WIN = 'game_win',
  MONSTER_UPDATE = 'monster_update',
  PAGE_COLLECTED = 'page_collected',
  PUZZLE_UPDATE = 'puzzle_update',
  JUMPSCARE = 'jumpscare',
  AMBIENT_EVENT = 'ambient_event',
  VOICE_RECEIVE = 'voice_receive',
  PLAYER_SCREAMED = 'player_screamed',
}
