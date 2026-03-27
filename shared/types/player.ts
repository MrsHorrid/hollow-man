import { Vector3 } from './game';

export interface Player {
  id: string;
  name: string;
  position: Vector3;
  rotation: number; // Y rotation
  pitch: number; // X rotation (looking up/down)
  pagesCollected: number;
  isAlive: boolean;
  isFlashlightOn: boolean;
  stamina: number; // 0-100
  isSprinting: boolean;
  roomId?: string;
  color: string; // player color for identification
}

export interface PlayerStats {
  playerId: string;
  gamesPlayed: number;
  gamesWon: number;
  pagesCollected: number;
  totalSurvivalTime: number;
  deaths: number;
  puzzlesSolved: number;
}
