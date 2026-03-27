import { Monster, MonsterState, Vector3, GameRoom, Page } from '../../../shared/types/game';
import { Player } from '../../../shared/types/player';

const MONSTER_BASE_SPEED = 3.5;
const MONSTER_SPRINT_SPEED = 7.0;
const MONSTER_STALK_DISTANCE = 30;
const MONSTER_ATTACK_DISTANCE = 2.5;
const MONSTER_TELEPORT_MIN_DISTANCE = 20;
const MONSTER_TELEPORT_MAX_DISTANCE = 40;
const MONSTER_LOOK_SPEED_MULTIPLIER = 2.5;
const MONSTER_DETECTION_RADIUS = 50;

export class MonsterController {
  private monster: Monster;
  private players: Map<string, Player>;
  private room: GameRoom;
  private lastTeleportTime: number = 0;
  private teleportCooldown: number = 15000; // ms
  private watchedByPlayers: Set<string> = new Set();
  private stalkPhaseStart: number = 0;

  constructor(room: GameRoom, players: Map<string, Player>) {
    this.room = room;
    this.players = players;
    this.monster = room.monster;
  }

  update(deltaTime: number): void {
    const alivePlayers = this.getAlivePlayers();
    if (alivePlayers.length === 0) return;

    // Update which players are watching the monster
    this.updateWatchedStatus(alivePlayers);

    // Update monster speed based on being watched
    const beingWatched = this.watchedByPlayers.size > 0;
    this.monster.speed = beingWatched 
      ? MONSTER_SPRINT_SPEED * MONSTER_LOOK_SPEED_MULTIPLIER 
      : MONSTER_BASE_SPEED;

    switch (this.monster.state) {
      case MonsterState.IDLE:
        this.updateIdleState(alivePlayers, deltaTime);
        break;
      case MonsterState.STALKING:
        this.updateStalkingState(alivePlayers, deltaTime);
        break;
      case MonsterState.HUNTING:
        this.updateHuntingState(alivePlayers, deltaTime);
        break;
      case MonsterState.TELEPORTING:
        // Teleport is instant, handled separately
        break;
      case MonsterState.ATTACKING:
        this.updateAttackingState(alivePlayers);
        break;
    }
  }

  private getAlivePlayers(): Player[] {
    return Array.from(this.players.values()).filter(p => p.isAlive && p.roomId === this.room.id);
  }

  private updateWatchedStatus(players: Player[]): void {
    this.watchedByPlayers.clear();
    this.monster.visibleToPlayers = [];

    for (const player of players) {
      if (this.isPlayerLookingAtMonster(player)) {
        this.watchedByPlayers.add(player.id);
        this.monster.visibleToPlayers.push(player.id);
      }
    }
  }

  private isPlayerLookingAtMonster(player: Player): boolean {
    // Calculate angle between player's forward direction and monster position
    const dx = this.monster.position.x - player.position.x;
    const dz = this.monster.position.z - player.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    if (distance > MONSTER_DETECTION_RADIUS) return false;

    const monsterAngle = Math.atan2(dx, dz);
    const playerFacing = player.rotation;
    
    let angleDiff = Math.abs(monsterAngle - playerFacing);
    if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;
    
    // Player is looking at monster if within ~60 degree cone
    return angleDiff < Math.PI / 3;
  }

  private getDistanceToPlayer(player: Player): number {
    const dx = this.monster.position.x - player.position.x;
    const dy = this.monster.position.y - player.position.y;
    const dz = this.monster.position.z - player.position.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private getTargetPlayer(): Player | null {
    const alivePlayers = this.getAlivePlayers();
    if (alivePlayers.length === 0) return null;

    // Hunt the player with most pages collected
    let target: Player | null = null;
    let maxPages = -1;
    let minDistance = Infinity;

    for (const player of alivePlayers) {
      const dist = this.getDistanceToPlayer(player);
      // Prefer players with more pages, or closest if equal
      if (player.pagesCollected > maxPages || 
          (player.pagesCollected === maxPages && dist < minDistance)) {
        maxPages = player.pagesCollected;
        minDistance = dist;
        target = player;
      }
    }

    return target;
  }

  private getAlonePlayer(): Player | null {
    const alivePlayers = this.getAlivePlayers();
    
    for (const player of alivePlayers) {
      let isAlone = true;
      for (const other of alivePlayers) {
        if (other.id === player.id) continue;
        const dx = player.position.x - other.position.x;
        const dz = player.position.z - other.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 15) { // Players within 15 units are "together"
          isAlone = false;
          break;
        }
      }
      if (isAlone) return player;
    }
    return null;
  }

  private moveTowards(target: Vector3, speed: number, deltaTime: number): void {
    const dx = target.x - this.monster.position.x;
    const dz = target.z - this.monster.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    
    if (dist < 0.5) return;

    const moveSpeed = speed * deltaTime;
    const ratio = Math.min(moveSpeed / dist, 1);
    
    this.monster.position.x += dx * ratio;
    this.monster.position.z += dz * ratio;
    this.monster.rotation = Math.atan2(dx, dz);
  }

  private updateIdleState(players: Player[], deltaTime: number): void {
    // Check if a player is alone and nearby
    const alonePlayer = this.getAlonePlayer();
    if (alonePlayer) {
      const dist = this.getDistanceToPlayer(alonePlayer);
      if (dist < MONSTER_DETECTION_RADIUS) {
        this.monster.state = MonsterState.STALKING;
        this.stalkPhaseStart = Date.now();
        return;
      }
    }

    // Slowly wander
    const time = Date.now() / 1000;
    const wanderRadius = 5;
    const wanderTarget: Vector3 = {
      x: this.monster.position.x + Math.sin(time * 0.3) * wanderRadius * deltaTime,
      y: 0,
      z: this.monster.position.z + Math.cos(time * 0.3) * wanderRadius * deltaTime,
    };
    this.moveTowards(wanderTarget, 1, deltaTime);
  }

  private updateStalkingState(players: Player[], deltaTime: number): void {
    const target = this.getTargetPlayer();
    if (!target) {
      this.monster.state = MonsterState.IDLE;
      return;
    }

    this.monster.targetPlayerId = target.id;
    const dist = this.getDistanceToPlayer(target);

    // Stalk from distance
    if (dist > MONSTER_STALK_DISTANCE) {
      // Move closer
      this.moveTowards(target.position, this.monster.speed * 0.7, deltaTime);
    } else if (dist < MONSTER_STALK_DISTANCE - 5) {
      // Too close, back away slightly
      const awayTarget: Vector3 = {
        x: this.monster.position.x - (target.position.x - this.monster.position.x) * 0.1,
        y: 0,
        z: this.monster.position.z - (target.position.z - this.monster.position.z) * 0.1,
      };
      this.moveTowards(awayTarget, this.monster.speed * 0.5, deltaTime);
    }

    // Transition to hunting after stalking for a while or when player is alone
    const stalkDuration = Date.now() - this.stalkPhaseStart;
    const pagesRatio = this.room.pagesCollected / this.room.totalPages;
    const huntChance = (stalkDuration / 30000) + (pagesRatio * 0.5);
    
    if (huntChance > 0.7 || dist < MONSTER_ATTACK_DISTANCE * 3) {
      this.monster.state = MonsterState.HUNTING;
    }

    // Try to teleport if not being watched
    this.tryTeleport(target);
  }

  private updateHuntingState(players: Player[], deltaTime: number): void {
    const target = this.getTargetPlayer();
    if (!target) {
      this.monster.state = MonsterState.IDLE;
      return;
    }

    this.monster.targetPlayerId = target.id;
    const dist = this.getDistanceToPlayer(target);

    // Hunt the player
    this.moveTowards(target.position, this.monster.speed, deltaTime);

    // Attack when close enough
    if (dist < MONSTER_ATTACK_DISTANCE) {
      this.monster.state = MonsterState.ATTACKING;
    }

    // Teleport if not watched and far away
    this.tryTeleport(target);
  }

  private updateAttackingState(players: Player[]): void {
    // Attack state is handled by the game room
    // Monster stays in attacking state briefly
    setTimeout(() => {
      if (this.monster.state === MonsterState.ATTACKING) {
        this.monster.state = MonsterState.HUNTING;
      }
    }, 2000);
  }

  private tryTeleport(target: Player): void {
    const now = Date.now();
    if (now - this.lastTeleportTime < this.teleportCooldown) return;
    if (this.watchedByPlayers.size > 0) return; // Don't teleport when watched!

    // Teleport closer to target
    const dist = this.getDistanceToPlayer(target);
    if (dist > MONSTER_TELEPORT_MIN_DISTANCE) {
      this.performTeleport(target);
      this.lastTeleportTime = now;
    }
  }

  private performTeleport(target: Player): void {
    this.monster.state = MonsterState.TELEPORTING;
    this.monster.teleporting = true;

    // Calculate teleport position (behind trees, near player)
    const angle = Math.random() * Math.PI * 2;
    const teleportDist = MONSTER_TELEPORT_MIN_DISTANCE / 2 + Math.random() * 10;
    
    this.monster.position = {
      x: target.position.x + Math.sin(angle) * teleportDist,
      y: 0,
      z: target.position.z + Math.cos(angle) * teleportDist,
    };

    setTimeout(() => {
      this.monster.teleporting = false;
      this.monster.state = MonsterState.HUNTING;
    }, 500);
  }

  getMonster(): Monster {
    return this.monster;
  }

  isAttacking(): string | null {
    if (this.monster.state !== MonsterState.ATTACKING) return null;
    return this.monster.targetPlayerId || null;
  }

  getAttackRange(): number {
    return MONSTER_ATTACK_DISTANCE;
  }
}
