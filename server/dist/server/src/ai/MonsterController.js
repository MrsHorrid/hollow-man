"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterController = void 0;
const game_1 = require("../../../shared/types/game");
const MONSTER_BASE_SPEED = 3.5;
const MONSTER_SPRINT_SPEED = 7.0;
const MONSTER_STALK_DISTANCE = 30;
const MONSTER_ATTACK_DISTANCE = 2.5;
const MONSTER_TELEPORT_MIN_DISTANCE = 20;
const MONSTER_TELEPORT_MAX_DISTANCE = 40;
const MONSTER_LOOK_SPEED_MULTIPLIER = 2.5;
const MONSTER_DETECTION_RADIUS = 50;
class MonsterController {
    constructor(room, players) {
        this.lastTeleportTime = 0;
        this.teleportCooldown = 15000; // ms
        this.watchedByPlayers = new Set();
        this.stalkPhaseStart = 0;
        this.room = room;
        this.players = players;
        this.monster = room.monster;
    }
    update(deltaTime) {
        const alivePlayers = this.getAlivePlayers();
        if (alivePlayers.length === 0)
            return;
        // Update which players are watching the monster
        this.updateWatchedStatus(alivePlayers);
        // Update monster speed based on being watched
        const beingWatched = this.watchedByPlayers.size > 0;
        this.monster.speed = beingWatched
            ? MONSTER_SPRINT_SPEED * MONSTER_LOOK_SPEED_MULTIPLIER
            : MONSTER_BASE_SPEED;
        switch (this.monster.state) {
            case game_1.MonsterState.IDLE:
                this.updateIdleState(alivePlayers, deltaTime);
                break;
            case game_1.MonsterState.STALKING:
                this.updateStalkingState(alivePlayers, deltaTime);
                break;
            case game_1.MonsterState.HUNTING:
                this.updateHuntingState(alivePlayers, deltaTime);
                break;
            case game_1.MonsterState.TELEPORTING:
                // Teleport is instant, handled separately
                break;
            case game_1.MonsterState.ATTACKING:
                this.updateAttackingState(alivePlayers);
                break;
        }
    }
    getAlivePlayers() {
        return Array.from(this.players.values()).filter(p => p.isAlive && p.roomId === this.room.id);
    }
    updateWatchedStatus(players) {
        this.watchedByPlayers.clear();
        this.monster.visibleToPlayers = [];
        for (const player of players) {
            if (this.isPlayerLookingAtMonster(player)) {
                this.watchedByPlayers.add(player.id);
                this.monster.visibleToPlayers.push(player.id);
            }
        }
    }
    isPlayerLookingAtMonster(player) {
        // Calculate angle between player's forward direction and monster position
        const dx = this.monster.position.x - player.position.x;
        const dz = this.monster.position.z - player.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (distance > MONSTER_DETECTION_RADIUS)
            return false;
        const monsterAngle = Math.atan2(dx, dz);
        const playerFacing = player.rotation;
        let angleDiff = Math.abs(monsterAngle - playerFacing);
        if (angleDiff > Math.PI)
            angleDiff = 2 * Math.PI - angleDiff;
        // Player is looking at monster if within ~60 degree cone
        return angleDiff < Math.PI / 3;
    }
    getDistanceToPlayer(player) {
        const dx = this.monster.position.x - player.position.x;
        const dy = this.monster.position.y - player.position.y;
        const dz = this.monster.position.z - player.position.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    getTargetPlayer() {
        const alivePlayers = this.getAlivePlayers();
        if (alivePlayers.length === 0)
            return null;
        // Hunt the player with most pages collected
        let target = null;
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
    getAlonePlayer() {
        const alivePlayers = this.getAlivePlayers();
        for (const player of alivePlayers) {
            let isAlone = true;
            for (const other of alivePlayers) {
                if (other.id === player.id)
                    continue;
                const dx = player.position.x - other.position.x;
                const dz = player.position.z - other.position.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                if (dist < 15) { // Players within 15 units are "together"
                    isAlone = false;
                    break;
                }
            }
            if (isAlone)
                return player;
        }
        return null;
    }
    moveTowards(target, speed, deltaTime) {
        const dx = target.x - this.monster.position.x;
        const dz = target.z - this.monster.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 0.5)
            return;
        const moveSpeed = speed * deltaTime;
        const ratio = Math.min(moveSpeed / dist, 1);
        this.monster.position.x += dx * ratio;
        this.monster.position.z += dz * ratio;
        this.monster.rotation = Math.atan2(dx, dz);
    }
    updateIdleState(players, deltaTime) {
        // Check if a player is alone and nearby
        const alonePlayer = this.getAlonePlayer();
        if (alonePlayer) {
            const dist = this.getDistanceToPlayer(alonePlayer);
            if (dist < MONSTER_DETECTION_RADIUS) {
                this.monster.state = game_1.MonsterState.STALKING;
                this.stalkPhaseStart = Date.now();
                return;
            }
        }
        // Slowly wander
        const time = Date.now() / 1000;
        const wanderRadius = 5;
        const wanderTarget = {
            x: this.monster.position.x + Math.sin(time * 0.3) * wanderRadius * deltaTime,
            y: 0,
            z: this.monster.position.z + Math.cos(time * 0.3) * wanderRadius * deltaTime,
        };
        this.moveTowards(wanderTarget, 1, deltaTime);
    }
    updateStalkingState(players, deltaTime) {
        const target = this.getTargetPlayer();
        if (!target) {
            this.monster.state = game_1.MonsterState.IDLE;
            return;
        }
        this.monster.targetPlayerId = target.id;
        const dist = this.getDistanceToPlayer(target);
        // Stalk from distance
        if (dist > MONSTER_STALK_DISTANCE) {
            // Move closer
            this.moveTowards(target.position, this.monster.speed * 0.7, deltaTime);
        }
        else if (dist < MONSTER_STALK_DISTANCE - 5) {
            // Too close, back away slightly
            const awayTarget = {
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
            this.monster.state = game_1.MonsterState.HUNTING;
        }
        // Try to teleport if not being watched
        this.tryTeleport(target);
    }
    updateHuntingState(players, deltaTime) {
        const target = this.getTargetPlayer();
        if (!target) {
            this.monster.state = game_1.MonsterState.IDLE;
            return;
        }
        this.monster.targetPlayerId = target.id;
        const dist = this.getDistanceToPlayer(target);
        // Hunt the player
        this.moveTowards(target.position, this.monster.speed, deltaTime);
        // Attack when close enough
        if (dist < MONSTER_ATTACK_DISTANCE) {
            this.monster.state = game_1.MonsterState.ATTACKING;
        }
        // Teleport if not watched and far away
        this.tryTeleport(target);
    }
    updateAttackingState(players) {
        // Attack state is handled by the game room
        // Monster stays in attacking state briefly
        setTimeout(() => {
            if (this.monster.state === game_1.MonsterState.ATTACKING) {
                this.monster.state = game_1.MonsterState.HUNTING;
            }
        }, 2000);
    }
    tryTeleport(target) {
        const now = Date.now();
        if (now - this.lastTeleportTime < this.teleportCooldown)
            return;
        if (this.watchedByPlayers.size > 0)
            return; // Don't teleport when watched!
        // Teleport closer to target
        const dist = this.getDistanceToPlayer(target);
        if (dist > MONSTER_TELEPORT_MIN_DISTANCE) {
            this.performTeleport(target);
            this.lastTeleportTime = now;
        }
    }
    performTeleport(target) {
        this.monster.state = game_1.MonsterState.TELEPORTING;
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
            this.monster.state = game_1.MonsterState.HUNTING;
        }, 500);
    }
    getMonster() {
        return this.monster;
    }
    isAttacking() {
        if (this.monster.state !== game_1.MonsterState.ATTACKING)
            return null;
        return this.monster.targetPlayerId || null;
    }
    getAttackRange() {
        return MONSTER_ATTACK_DISTANCE;
    }
}
exports.MonsterController = MonsterController;
