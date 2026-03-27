import { v4 as uuidv4 } from 'uuid';
import {
  GameRoom as GameRoomType,
  GamePhase,
  Monster,
  MonsterState,
  Page,
  Puzzle,
  Vector3,
  SocketEvents,
  JumpscareEvent,
  AmbientEvent,
} from '../../../shared/types/game';
import { Player } from '../../../shared/types/player';
import { MonsterController } from '../ai/MonsterController';
import { Server } from 'socket.io';

const MAP_SIZE = 120;
const TOTAL_PAGES = 8;
const UPDATE_INTERVAL = 50; // ms (20 FPS server tick)
const AMBIENT_EVENT_INTERVAL = 8000; // ms

function randomPosition(minDist: number = 10): Vector3 {
  return {
    x: (Math.random() - 0.5) * MAP_SIZE,
    y: 0,
    z: (Math.random() - 0.5) * MAP_SIZE,
  };
}

function distance(a: Vector3, b: Vector3): number {
  return Math.sqrt(
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
  );
}

const PLAYER_COLORS = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];

export class GameRoom {
  public state: GameRoomType;
  private players: Map<string, Player> = new Map();
  private monsterController: MonsterController | null = null;
  private io: Server;
  private updateInterval: ReturnType<typeof setInterval> | null = null;
  private ambientInterval: ReturnType<typeof setInterval> | null = null;
  private lastUpdate: number = Date.now();

  constructor(io: Server, name: string) {
    this.io = io;
    this.state = this.createInitialState(name);
  }

  private createInitialState(name: string): GameRoomType {
    const monster: Monster = {
      position: { x: -50, y: 0, z: -50 },
      rotation: 0,
      state: MonsterState.IDLE,
      teleporting: false,
      speed: 3.5,
      visibleToPlayers: [],
    };

    return {
      id: uuidv4(),
      name,
      players: [],
      maxPlayers: 4,
      phase: GamePhase.LOBBY,
      pages: [],
      puzzles: [],
      monster,
      pagesCollected: 0,
      totalPages: TOTAL_PAGES,
      ambientEventTimer: 0,
    };
  }

  private generatePages(): Page[] {
    const pages: Page[] = [];
    const usedPositions: Vector3[] = [];

    for (let i = 0; i < TOTAL_PAGES; i++) {
      let pos: Vector3;
      let attempts = 0;
      do {
        pos = randomPosition();
        attempts++;
      } while (
        attempts < 20 &&
        usedPositions.some(p => distance(p, pos) < 15)
      );

      pages.push({
        id: `page_${i}`,
        position: pos,
        collected: false,
      });
      usedPositions.push(pos);
    }
    return pages;
  }

  private generatePuzzles(): Puzzle[] {
    const puzzles: Puzzle[] = [];
    const positions: Vector3[] = [
      { x: 20, y: 0, z: 20 },
      { x: -30, y: 0, z: 15 },
      { x: 10, y: 0, z: -40 },
      { x: -20, y: 0, z: -25 },
    ];

    const types: Puzzle['type'][] = ['switch', 'code', 'lever', 'pressure_plate'];
    const descriptions = [
      'Unlock the hidden cache',
      'Disable the signal jammer',
      'Reveal the escape route',
      'Power the emergency light',
    ];

    for (let i = 0; i < 4; i++) {
      puzzles.push({
        id: `puzzle_${i}`,
        type: types[i],
        position: positions[i],
        solved: false,
        requiresPlayers: types[i] === 'pressure_plate' ? 2 : 1,
        activatedBy: [],
        code: types[i] === 'code' ? String(Math.floor(1000 + Math.random() * 9000)) : undefined,
        rewardDescription: descriptions[i],
      });
    }

    return puzzles;
  }

  addPlayer(playerId: string, playerName: string): boolean {
    if (this.state.players.length >= this.state.maxPlayers) return false;
    if (this.state.phase !== GamePhase.LOBBY) return false;

    const colorIndex = this.state.players.length;
    const player: Player = {
      id: playerId,
      name: playerName,
      position: {
        x: (Math.random() - 0.5) * 10,
        y: 0,
        z: (Math.random() - 0.5) * 10,
      },
      rotation: 0,
      pitch: 0,
      pagesCollected: 0,
      isAlive: true,
      isFlashlightOn: false,
      stamina: 100,
      isSprinting: false,
      roomId: this.state.id,
      color: PLAYER_COLORS[colorIndex % PLAYER_COLORS.length],
    };

    this.players.set(playerId, player);
    this.state.players.push(playerId);
    return true;
  }

  removePlayer(playerId: string): void {
    this.players.delete(playerId);
    this.state.players = this.state.players.filter(id => id !== playerId);

    if (this.state.players.length === 0) {
      this.stop();
    }
  }

  startGame(): void {
    if (this.state.phase !== GamePhase.LOBBY) return;
    if (this.state.players.length < 1) return;

    this.state.phase = GamePhase.PLAYING;
    this.state.pages = this.generatePages();
    this.state.puzzles = this.generatePuzzles();
    this.state.startTime = Date.now();

    // Spawn monster far from players
    this.state.monster.position = { x: -50, y: 0, z: -50 };
    this.state.monster.state = MonsterState.IDLE;

    this.monsterController = new MonsterController(this.state, this.players);

    this.updateInterval = setInterval(() => this.tick(), UPDATE_INTERVAL);
    this.ambientInterval = setInterval(() => this.triggerAmbientEvent(), AMBIENT_EVENT_INTERVAL);

    this.io.to(this.state.id).emit(SocketEvents.GAME_START, {
      room: this.state,
      players: Array.from(this.players.values()),
    });
  }

  private tick(): void {
    if (this.state.phase !== GamePhase.PLAYING) return;

    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    // Update monster
    if (this.monsterController) {
      this.monsterController.update(deltaTime);

      // Check for attacks
      const attackTarget = this.monsterController.isAttacking();
      if (attackTarget) {
        this.killPlayer(attackTarget);
      }

      // Check for proximity jumpscares
      this.checkProximityJumpscares();
    }

    // Update stamina
    for (const player of this.players.values()) {
      if (!player.isAlive) continue;
      if (player.isSprinting) {
        player.stamina = Math.max(0, player.stamina - deltaTime * 15);
        if (player.stamina === 0) player.isSprinting = false;
      } else {
        player.stamina = Math.min(100, player.stamina + deltaTime * 8);
      }
    }

    // Emit monster update to all players
    this.io.to(this.state.id).emit(SocketEvents.MONSTER_UPDATE, {
      monster: this.state.monster,
      players: Array.from(this.players.values()).map(p => ({
        id: p.id,
        position: p.position,
        rotation: p.rotation,
        isAlive: p.isAlive,
        pagesCollected: p.pagesCollected,
        stamina: p.stamina,
        isFlashlightOn: p.isFlashlightOn,
      })),
    });
  }

  private checkProximityJumpscares(): void {
    for (const player of this.players.values()) {
      if (!player.isAlive) continue;

      const dist = distance(player.position, this.state.monster.position);

      if (dist < 5 && dist > 2.5) {
        const jumpscare: JumpscareEvent = {
          type: 'monster_close',
          intensity: 1 - (dist / 5),
          playerId: player.id,
          position: this.state.monster.position,
        };
        this.io.to(player.id).emit(SocketEvents.JUMPSCARE, jumpscare);
      }

      // Peripheral vision detection
      if (dist < 20 && !this.state.monster.visibleToPlayers.includes(player.id)) {
        const sideAngle = this.calculateSideAngle(player, this.state.monster.position);
        if (Math.abs(sideAngle) > Math.PI / 3 && Math.abs(sideAngle) < Math.PI * 0.8) {
          const jumpscare: JumpscareEvent = {
            type: 'peripheral',
            intensity: 0.3,
            playerId: player.id,
          };
          this.io.to(player.id).emit(SocketEvents.JUMPSCARE, jumpscare);
        }
      }
    }
  }

  private calculateSideAngle(player: Player, pos: Vector3): number {
    const dx = pos.x - player.position.x;
    const dz = pos.z - player.position.z;
    const angle = Math.atan2(dx, dz);
    let diff = angle - player.rotation;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return diff;
  }

  private killPlayer(playerId: string): void {
    const player = this.players.get(playerId);
    if (!player || !player.isAlive) return;

    player.isAlive = false;

    const jumpscare: JumpscareEvent = {
      type: 'monster_close',
      intensity: 1.0,
      playerId,
    };
    this.io.to(playerId).emit(SocketEvents.JUMPSCARE, jumpscare);
    this.io.to(this.state.id).emit(SocketEvents.PLAYER_DIED, { playerId });

    // Notify nearby players
    for (const other of this.players.values()) {
      if (other.id === playerId || !other.isAlive) continue;
      const dist = distance(player.position, other.position);
      if (dist < 20) {
        this.io.to(other.id).emit(SocketEvents.PLAYER_SCREAMED, {
          playerId,
          position: player.position,
          distance: dist,
        });
        // Jumpscare nearby players when someone dies
        if (dist < 10) {
          this.io.to(other.id).emit(SocketEvents.JUMPSCARE, {
            type: 'player_scream',
            intensity: 1 - (dist / 10),
            playerId: other.id,
          });
        }
      }
    }

    // Check if all players are dead
    const alivePlayers = Array.from(this.players.values()).filter(p => p.isAlive);
    if (alivePlayers.length === 0) {
      this.endGame(false);
    }
  }

  private triggerAmbientEvent(): void {
    if (this.state.phase !== GamePhase.PLAYING) return;

    const types: AmbientEvent['type'][] = ['branch_snap', 'whisper', 'wind', 'footstep', 'breathing'];
    const type = types[Math.floor(Math.random() * types.length)];

    // Random position near a player
    const alivePlayers = Array.from(this.players.values()).filter(p => p.isAlive);
    if (alivePlayers.length === 0) return;

    const targetPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    const offset: Vector3 = {
      x: targetPlayer.position.x + (Math.random() - 0.5) * 20,
      y: 0,
      z: targetPlayer.position.z + (Math.random() - 0.5) * 20,
    };

    const ambientEvent: AmbientEvent = {
      type,
      position: offset,
      volume: 0.3 + Math.random() * 0.5,
    };

    this.io.to(this.state.id).emit(SocketEvents.AMBIENT_EVENT, ambientEvent);

    // Occasionally trigger jumpscare from ambient event
    if (Math.random() < 0.3) {
      for (const player of alivePlayers) {
        const dist = distance(player.position, offset);
        if (dist < 15) {
          this.io.to(player.id).emit(SocketEvents.JUMPSCARE, {
            type: 'ambient',
            intensity: 0.2 + Math.random() * 0.3,
            playerId: player.id,
            position: offset,
          });
        }
      }
    }
  }

  handlePlayerMove(
    playerId: string,
    position: Vector3,
    rotation: number,
    pitch: number,
    isSprinting: boolean
  ): void {
    const player = this.players.get(playerId);
    if (!player || !player.isAlive) return;

    player.position = position;
    player.rotation = rotation;
    player.pitch = pitch;
    player.isSprinting = isSprinting && player.stamina > 0;
  }

  handleCollectPage(playerId: string, pageId: string): boolean {
    const player = this.players.get(playerId);
    if (!player || !player.isAlive) return false;

    const page = this.state.pages.find(p => p.id === pageId);
    if (!page || page.collected) return false;

    const dist = distance(player.position, page.position);
    if (dist > 3) return false; // Must be close enough

    page.collected = true;
    page.collectedBy = playerId;
    player.pagesCollected++;
    this.state.pagesCollected++;

    this.io.to(this.state.id).emit(SocketEvents.PAGE_COLLECTED, {
      pageId,
      playerId,
      pagesCollected: this.state.pagesCollected,
      totalPages: this.state.totalPages,
    });

    // Check win condition
    if (this.state.pagesCollected >= this.state.totalPages) {
      this.endGame(true);
    }

    // More pages = angrier monster
    if (this.monsterController && this.state.monster.state === MonsterState.IDLE) {
      this.state.monster.state = MonsterState.STALKING;
    }

    return true;
  }

  handlePuzzleInteract(playerId: string, puzzleId: string, code?: string): { success: boolean; message: string } {
    const player = this.players.get(playerId);
    if (!player || !player.isAlive) return { success: false, message: 'Player not alive' };

    const puzzle = this.state.puzzles.find(p => p.id === puzzleId);
    if (!puzzle) return { success: false, message: 'Puzzle not found' };
    if (puzzle.solved) return { success: false, message: 'Already solved' };

    const dist = distance(player.position, puzzle.position);
    if (dist > 4) return { success: false, message: 'Too far away' };

    // Code puzzle
    if (puzzle.type === 'code') {
      if (code !== puzzle.code) {
        // Wrong code = jumpscare
        this.io.to(playerId).emit(SocketEvents.JUMPSCARE, {
          type: 'puzzle_fail',
          intensity: 0.6,
          playerId,
        });
        // Attract monster
        this.state.monster.state = MonsterState.HUNTING;
        return { success: false, message: 'Wrong code! The static grows louder...' };
      }
    }

    // Multi-player puzzle (pressure plate etc.)
    if (puzzle.requiresPlayers > 1) {
      if (!puzzle.activatedBy.includes(playerId)) {
        puzzle.activatedBy.push(playerId);
      }

      if (puzzle.activatedBy.length < puzzle.requiresPlayers) {
        this.io.to(this.state.id).emit(SocketEvents.PUZZLE_UPDATE, { puzzle });
        return { 
          success: false, 
          message: `Need ${puzzle.requiresPlayers - puzzle.activatedBy.length} more player(s)` 
        };
      }
    }

    // Puzzle solved!
    puzzle.solved = true;
    this.io.to(this.state.id).emit(SocketEvents.PUZZLE_UPDATE, { puzzle, solved: true });

    return { success: true, message: puzzle.rewardDescription };
  }

  handlePlayerLookingAtMonster(playerId: string, isLooking: boolean): void {
    if (!this.state.monster.visibleToPlayers.includes(playerId) && isLooking) {
      this.state.monster.visibleToPlayers.push(playerId);
    } else if (!isLooking) {
      this.state.monster.visibleToPlayers = this.state.monster.visibleToPlayers.filter(
        id => id !== playerId
      );
    }
  }

  private endGame(win: boolean): void {
    this.state.phase = win ? GamePhase.WIN : GamePhase.GAME_OVER;
    this.state.endTime = Date.now();
    this.stop();

    const event = win ? SocketEvents.GAME_WIN : SocketEvents.GAME_OVER;
    this.io.to(this.state.id).emit(event, {
      phase: this.state.phase,
      pagesCollected: this.state.pagesCollected,
      duration: this.state.endTime - (this.state.startTime || 0),
      players: Array.from(this.players.values()),
    });
  }

  stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  getPlayers(): Map<string, Player> {
    return this.players;
  }

  getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  isFull(): boolean {
    return this.state.players.length >= this.state.maxPlayers;
  }

  isEmpty(): boolean {
    return this.state.players.length === 0;
  }
}
