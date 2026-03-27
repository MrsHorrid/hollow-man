/** MonsterAI.ts - Enhanced Monster AI behavior system */
import * as THREE from 'three';
import { Vector3 } from '@shared/types/game';

export enum MonsterBehaviorState {
  IDLE = 'idle',
  PATROLLING = 'patrolling',
  STALKING = 'stalking',
  INVESTIGATING = 'investigating',
  HUNTING = 'hunting',
  CHASING = 'chasing',
  ATTACKING = 'attacking',
  FLEEING = 'fleeing',
  TELEPORTING = 'teleporting',
  AMBUSHING = 'ambushing',
}

export interface MonsterAIConfig {
  baseSpeed: number;
  sprintSpeed: number;
  detectionRadius: number;
  attackRange: number;
  teleportCooldown: number;
  stalkDistance: number;
  huntTimeout: number;
  intelligence: number; // 0-1, affects decision making
  aggression: number; // 0-1, affects attack likelihood
}

export interface PlayerInfo {
  id: string;
  position: Vector3;
  isAlive: boolean;
  isLookingAtMonster: boolean;
  pagesCollected: number;
  distance: number;
  lastSeenAt?: number;
  noiseLevel: number; // How much noise player is making
}

const DEFAULT_CONFIG: MonsterAIConfig = {
  baseSpeed: 3.5,
  sprintSpeed: 8.0,
  detectionRadius: 60,
  attackRange: 2.5,
  teleportCooldown: 15000,
  stalkDistance: 25,
  huntTimeout: 30000,
  intelligence: 0.7,
  aggression: 0.6,
};

export class MonsterAI {
  private config: MonsterAIConfig;
  private state: MonsterBehaviorState = MonsterBehaviorState.IDLE;
  private position: Vector3 = { x: 0, y: 0, z: 0 };
  private rotation: number = 0;
  private targetPosition: Vector3 | null = null;
  private targetPlayer: PlayerInfo | null = null;
  private stateStartTime: number = 0;
  private lastTeleportTime: number = 0;
  private investigationPoint: Vector3 | null = null;
  private patrolPoints: Vector3[] = [];
  private currentPatrolIndex: number = 0;
  private isVisible: boolean = true;
  private memory: Map<string, { position: Vector3; timestamp: number }> = new Map();
  private staticSoundSources: Array<{ position: Vector3; intensity: number; timestamp: number }> = [];

  constructor(config: Partial<MonsterAIConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.generatePatrolPoints();
  }

  private generatePatrolPoints(): void {
    // Generate random patrol points around the map
    for (let i = 0; i < 6; i++) {
      this.patrolPoints.push({
        x: (Math.random() - 0.5) * 100,
        y: 0,
        z: (Math.random() - 0.5) * 100,
      });
    }
  }

  update(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    // Update memory (forget old positions)
    this.updateMemory(gameTime);

    // Update sound sources
    this.cleanSoundSources(gameTime);

    // State machine
    switch (this.state) {
      case MonsterBehaviorState.IDLE:
        this.updateIdle(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.PATROLLING:
        this.updatePatrolling(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.STALKING:
        this.updateStalking(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.INVESTIGATING:
        this.updateInvestigating(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.HUNTING:
        this.updateHunting(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.CHASING:
        this.updateChasing(deltaTime, players, gameTime);
        break;
      case MonsterBehaviorState.ATTACKING:
        this.updateAttacking(gameTime);
        break;
      case MonsterBehaviorState.TELEPORTING:
        this.updateTeleporting(gameTime);
        break;
      case MonsterBehaviorState.AMBUSHING:
        this.updateAmbushing(deltaTime, players, gameTime);
        break;
    }
  }

  private updateIdle(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    // Check for nearby players
    const nearest = this.findNearestPlayer(players);
    
    if (nearest && nearest.distance < this.config.detectionRadius) {
      if (nearest.noiseLevel > 0.5 || nearest.distance < 20) {
        this.transitionTo(MonsterBehaviorState.INVESTIGATING, gameTime);
        this.investigationPoint = nearest.position;
        return;
      }
    }

    // Check for sounds to investigate
    const loudestSound = this.getLoudestSound();
    if (loudestSound && loudestSound.intensity > 0.3) {
      this.transitionTo(MonsterBehaviorState.INVESTIGATING, gameTime);
      this.investigationPoint = loudestSound.position;
      return;
    }

    // Start patrolling after random idle time
    if (gameTime - this.stateStartTime > 3000 + Math.random() * 5000) {
      this.transitionTo(MonsterBehaviorState.PATROLLING, gameTime);
    }
  }

  private updatePatrolling(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    // Move to next patrol point
    const target = this.patrolPoints[this.currentPatrolIndex];
    this.moveTowards(target, this.config.baseSpeed * 0.5, deltaTime);

    // Check if reached patrol point
    if (this.distanceTo(target) < 3) {
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
    }

    // Check for players while patrolling
    const nearest = this.findNearestPlayer(players);
    if (nearest && nearest.distance < 30) {
      if (nearest.isLookingAtMonster) {
        // If player sees monster, stop patrolling and stalk
        this.transitionTo(MonsterBehaviorState.STALKING, gameTime);
        this.targetPlayer = nearest;
      } else {
        // Ambush opportunity!
        this.transitionTo(MonsterBehaviorState.AMBUSHING, gameTime);
        this.targetPlayer = nearest;
      }
    }
  }

  private updateStalking(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    if (!this.targetPlayer || !this.targetPlayer.isAlive) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
      return;
    }

    const distance = this.targetPlayer.distance;
    const isBeingWatched = this.targetPlayer.isLookingAtMonster;

    // Maintain stalk distance
    if (distance > this.config.stalkDistance + 5) {
      // Too far, move closer
      this.moveTowards(this.targetPlayer.position, this.config.baseSpeed * 0.8, deltaTime);
    } else if (distance < this.config.stalkDistance - 5) {
      // Too close, back away if being watched
      if (isBeingWatched) {
        const awayPos = this.calculateRetreatPosition(this.targetPlayer.position);
        this.moveTowards(awayPos, this.config.baseSpeed, deltaTime);
      }
    }

    // Transition to hunting
    const stalkDuration = gameTime - this.stateStartTime;
    const huntChance = (stalkDuration / 20000) * this.config.aggression;
    
    if (!isBeingWatched && (huntChance > 0.6 || distance < 10)) {
      this.transitionTo(MonsterBehaviorState.HUNTING, gameTime);
    }

    // Try teleport if not watched and stalking for a while
    if (!isBeingWatched && stalkDuration > 10000) {
      this.tryTeleport(gameTime);
    }
  }

  private updateInvestigating(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    if (!this.investigationPoint) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
      return;
    }

    // Move to investigation point
    this.moveTowards(this.investigationPoint, this.config.baseSpeed, deltaTime);

    // Check if reached
    if (this.distanceTo(this.investigationPoint) < 3) {
      // Look around for a moment
      if (gameTime - this.stateStartTime > 5000) {
        // Check for nearby players
        const nearest = this.findNearestPlayer(players);
        if (nearest && nearest.distance < 20) {
          this.targetPlayer = nearest;
          if (nearest.isLookingAtMonster) {
            this.transitionTo(MonsterBehaviorState.STALKING, gameTime);
          } else {
            this.transitionTo(MonsterBehaviorState.HUNTING, gameTime);
          }
        } else {
          this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
        }
      }
    }

    // Check for players while investigating
    const nearest = this.findNearestPlayer(players);
    if (nearest && nearest.distance < 10) {
      this.targetPlayer = nearest;
      this.transitionTo(MonsterBehaviorState.CHASING, gameTime);
    }
  }

  private updateHunting(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    if (!this.targetPlayer || !this.targetPlayer.isAlive) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
      return;
    }

    const distance = this.targetPlayer.distance;
    const isBeingWatched = this.targetPlayer.isLookingAtMonster;

    // If being watched and not close, stop hunting
    if (isBeingWatched && distance > 15) {
      this.transitionTo(MonsterBehaviorState.STALKING, gameTime);
      return;
    }

    // Move towards target
    const speed = isBeingWatched ? this.config.sprintSpeed * 2.5 : this.config.sprintSpeed;
    this.moveTowards(this.targetPlayer.position, speed, deltaTime);

    // Check attack range
    if (distance < this.config.attackRange) {
      this.transitionTo(MonsterBehaviorState.ATTACKING, gameTime);
      return;
    }

    // Timeout if hunting too long without success
    if (gameTime - this.stateStartTime > this.config.huntTimeout) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
    }
  }

  private updateChasing(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    if (!this.targetPlayer || !this.targetPlayer.isAlive) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
      return;
    }

    // Full speed chase
    this.moveTowards(this.targetPlayer.position, this.config.sprintSpeed * 1.2, deltaTime);

    if (this.targetPlayer.distance < this.config.attackRange) {
      this.transitionTo(MonsterBehaviorState.ATTACKING, gameTime);
    }

    // Stop chasing if too far
    if (this.targetPlayer.distance > 40) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
    }
  }

  private updateAttacking(gameTime: number): void {
    // Attack is handled by game logic
    // Return to hunting after brief attack
    setTimeout(() => {
      if (this.state === MonsterBehaviorState.ATTACKING) {
        this.transitionTo(MonsterBehaviorState.HUNTING, gameTime);
      }
    }, 1500);
  }

  private updateTeleporting(gameTime: number): void {
    // Teleport is handled by game logic
    this.transitionTo(MonsterBehaviorState.HUNTING, gameTime);
  }

  private updateAmbushing(deltaTime: number, players: PlayerInfo[], gameTime: number): void {
    if (!this.targetPlayer || !this.targetPlayer.isAlive) {
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
      return;
    }

    // Hide and wait for player to get closer
    const distance = this.targetPlayer.distance;

    if (distance < 15 && !this.targetPlayer.isLookingAtMonster) {
      // Ambush! Teleport close and attack
      this.tryTeleport(gameTime);
      this.transitionTo(MonsterBehaviorState.HUNTING, gameTime);
    } else if (this.targetPlayer.isLookingAtMonster) {
      // Spotted! Transition to stalking
      this.transitionTo(MonsterBehaviorState.STALKING, gameTime);
    } else if (gameTime - this.stateStartTime > 15000) {
      // Too long waiting, give up
      this.transitionTo(MonsterBehaviorState.IDLE, gameTime);
    }
  }

  private transitionTo(newState: MonsterBehaviorState, gameTime: number): void {
    this.state = newState;
    this.stateStartTime = gameTime;
  }

  private moveTowards(target: Vector3, speed: number, deltaTime: number): void {
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 0.5) return;

    const moveSpeed = speed * deltaTime;
    const ratio = Math.min(moveSpeed / distance, 1);

    this.position.x += dx * ratio;
    this.position.z += dz * ratio;
    this.rotation = Math.atan2(dx, dz);
  }

  private distanceTo(target: Vector3): number {
    const dx = this.position.x - target.x;
    const dz = this.position.z - target.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  private findNearestPlayer(players: PlayerInfo[]): PlayerInfo | null {
    let nearest: PlayerInfo | null = null;
    let minDist = Infinity;

    for (const player of players) {
      if (!player.isAlive) continue;
      if (player.distance < minDist) {
        minDist = player.distance;
        nearest = player;
      }
    }

    return nearest;
  }

  private calculateRetreatPosition(from: Vector3): Vector3 {
    const dx = this.position.x - from.x;
    const dz = this.position.z - from.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 0.1) {
      // If at same position, pick random direction
      const angle = Math.random() * Math.PI * 2;
      return {
        x: this.position.x + Math.cos(angle) * 10,
        y: 0,
        z: this.position.z + Math.sin(angle) * 10,
      };
    }

    return {
      x: this.position.x + (dx / dist) * 10,
      y: 0,
      z: this.position.z + (dz / dist) * 10,
    };
  }

  private tryTeleport(gameTime: number): boolean {
    if (gameTime - this.lastTeleportTime < this.config.teleportCooldown) {
      return false;
    }

    this.lastTeleportTime = gameTime;
    this.transitionTo(MonsterBehaviorState.TELEPORTING, gameTime);
    return true;
  }

  private updateMemory(gameTime: number): void {
    // Remove memories older than 30 seconds
    for (const [id, memory] of this.memory) {
      if (gameTime - memory.timestamp > 30000) {
        this.memory.delete(id);
      }
    }
  }

  private cleanSoundSources(gameTime: number): void {
    this.staticSoundSources = this.staticSoundSources.filter(
      s => gameTime - s.timestamp < 5000
    );
  }

  private getLoudestSound(): { position: Vector3; intensity: number } | null {
    if (this.staticSoundSources.length === 0) return null;
    return this.staticSoundSources.reduce((loudest, current) =>
      current.intensity > loudest.intensity ? current : loudest
    );
  }

  // Public API
  registerSound(position: Vector3, intensity: number, gameTime: number): void {
    this.staticSoundSources.push({
      position,
      intensity,
      timestamp: gameTime,
    });
  }

  teleportTo(position: Vector3): void {
    this.position = { ...position };
    this.lastTeleportTime = Date.now();
  }

  canAttack(): boolean {
    return this.state === MonsterBehaviorState.ATTACKING;
  }

  isAggressive(): boolean {
    return [
      MonsterBehaviorState.HUNTING,
      MonsterBehaviorState.CHASING,
      MonsterBehaviorState.ATTACKING,
    ].includes(this.state);
  }

  // Getters
  getState(): MonsterBehaviorState {
    return this.state;
  }

  getPosition(): Vector3 {
    return this.position;
  }

  getRotation(): number {
    return this.rotation;
  }

  getTargetPlayer(): PlayerInfo | null {
    return this.targetPlayer;
  }

  setPosition(position: Vector3): void {
    this.position = position;
  }

  setVisible(visible: boolean): void {
    this.isVisible = visible;
  }

  isVisibleToPlayers(): boolean {
    return this.isVisible;
  }
}

export default MonsterAI;
