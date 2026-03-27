"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const uuid_1 = require("uuid");
const game_1 = require("../../../shared/types/game");
const MonsterController_1 = require("../ai/MonsterController");
const MAP_SIZE = 120;
const TOTAL_PAGES = 8;
const UPDATE_INTERVAL = 50; // ms (20 FPS server tick)
const AMBIENT_EVENT_INTERVAL = 8000; // ms
function randomPosition(minDist = 10) {
    return {
        x: (Math.random() - 0.5) * MAP_SIZE,
        y: 0,
        z: (Math.random() - 0.5) * MAP_SIZE,
    };
}
function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}
const PLAYER_COLORS = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];
class GameRoom {
    constructor(io, name) {
        this.players = new Map();
        this.monsterController = null;
        this.updateInterval = null;
        this.ambientInterval = null;
        this.lastUpdate = Date.now();
        this.io = io;
        this.state = this.createInitialState(name);
    }
    createInitialState(name) {
        const monster = {
            position: { x: -50, y: 0, z: -50 },
            rotation: 0,
            state: game_1.MonsterState.IDLE,
            teleporting: false,
            speed: 3.5,
            visibleToPlayers: [],
        };
        return {
            id: (0, uuid_1.v4)(),
            name,
            players: [],
            maxPlayers: 4,
            phase: game_1.GamePhase.LOBBY,
            pages: [],
            puzzles: [],
            monster,
            pagesCollected: 0,
            totalPages: TOTAL_PAGES,
            ambientEventTimer: 0,
        };
    }
    generatePages() {
        const pages = [];
        const usedPositions = [];
        for (let i = 0; i < TOTAL_PAGES; i++) {
            let pos;
            let attempts = 0;
            do {
                pos = randomPosition();
                attempts++;
            } while (attempts < 20 &&
                usedPositions.some(p => distance(p, pos) < 15));
            pages.push({
                id: `page_${i}`,
                position: pos,
                collected: false,
            });
            usedPositions.push(pos);
        }
        return pages;
    }
    generatePuzzles() {
        const puzzles = [];
        const positions = [
            { x: 20, y: 0, z: 20 },
            { x: -30, y: 0, z: 15 },
            { x: 10, y: 0, z: -40 },
            { x: -20, y: 0, z: -25 },
        ];
        const types = ['switch', 'code', 'lever', 'pressure_plate'];
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
    addPlayer(playerId, playerName) {
        if (this.state.players.length >= this.state.maxPlayers)
            return false;
        if (this.state.phase !== game_1.GamePhase.LOBBY)
            return false;
        const colorIndex = this.state.players.length;
        const player = {
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
    removePlayer(playerId) {
        this.players.delete(playerId);
        this.state.players = this.state.players.filter(id => id !== playerId);
        if (this.state.players.length === 0) {
            this.stop();
        }
    }
    startGame() {
        if (this.state.phase !== game_1.GamePhase.LOBBY)
            return;
        if (this.state.players.length < 1)
            return;
        this.state.phase = game_1.GamePhase.PLAYING;
        this.state.pages = this.generatePages();
        this.state.puzzles = this.generatePuzzles();
        this.state.startTime = Date.now();
        // Spawn monster far from players
        this.state.monster.position = { x: -50, y: 0, z: -50 };
        this.state.monster.state = game_1.MonsterState.IDLE;
        this.monsterController = new MonsterController_1.MonsterController(this.state, this.players);
        this.updateInterval = setInterval(() => this.tick(), UPDATE_INTERVAL);
        this.ambientInterval = setInterval(() => this.triggerAmbientEvent(), AMBIENT_EVENT_INTERVAL);
        this.io.to(this.state.id).emit(game_1.SocketEvents.GAME_START, {
            room: this.state,
            players: Array.from(this.players.values()),
        });
    }
    tick() {
        if (this.state.phase !== game_1.GamePhase.PLAYING)
            return;
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
            if (!player.isAlive)
                continue;
            if (player.isSprinting) {
                player.stamina = Math.max(0, player.stamina - deltaTime * 15);
                if (player.stamina === 0)
                    player.isSprinting = false;
            }
            else {
                player.stamina = Math.min(100, player.stamina + deltaTime * 8);
            }
        }
        // Emit monster update to all players
        this.io.to(this.state.id).emit(game_1.SocketEvents.MONSTER_UPDATE, {
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
    checkProximityJumpscares() {
        for (const player of this.players.values()) {
            if (!player.isAlive)
                continue;
            const dist = distance(player.position, this.state.monster.position);
            if (dist < 5 && dist > 2.5) {
                const jumpscare = {
                    type: 'monster_close',
                    intensity: 1 - (dist / 5),
                    playerId: player.id,
                    position: this.state.monster.position,
                };
                this.io.to(player.id).emit(game_1.SocketEvents.JUMPSCARE, jumpscare);
            }
            // Peripheral vision detection
            if (dist < 20 && !this.state.monster.visibleToPlayers.includes(player.id)) {
                const sideAngle = this.calculateSideAngle(player, this.state.monster.position);
                if (Math.abs(sideAngle) > Math.PI / 3 && Math.abs(sideAngle) < Math.PI * 0.8) {
                    const jumpscare = {
                        type: 'peripheral',
                        intensity: 0.3,
                        playerId: player.id,
                    };
                    this.io.to(player.id).emit(game_1.SocketEvents.JUMPSCARE, jumpscare);
                }
            }
        }
    }
    calculateSideAngle(player, pos) {
        const dx = pos.x - player.position.x;
        const dz = pos.z - player.position.z;
        const angle = Math.atan2(dx, dz);
        let diff = angle - player.rotation;
        while (diff > Math.PI)
            diff -= 2 * Math.PI;
        while (diff < -Math.PI)
            diff += 2 * Math.PI;
        return diff;
    }
    killPlayer(playerId) {
        const player = this.players.get(playerId);
        if (!player || !player.isAlive)
            return;
        player.isAlive = false;
        const jumpscare = {
            type: 'monster_close',
            intensity: 1.0,
            playerId,
        };
        this.io.to(playerId).emit(game_1.SocketEvents.JUMPSCARE, jumpscare);
        this.io.to(this.state.id).emit(game_1.SocketEvents.PLAYER_DIED, { playerId });
        // Notify nearby players
        for (const other of this.players.values()) {
            if (other.id === playerId || !other.isAlive)
                continue;
            const dist = distance(player.position, other.position);
            if (dist < 20) {
                this.io.to(other.id).emit(game_1.SocketEvents.PLAYER_SCREAMED, {
                    playerId,
                    position: player.position,
                    distance: dist,
                });
                // Jumpscare nearby players when someone dies
                if (dist < 10) {
                    this.io.to(other.id).emit(game_1.SocketEvents.JUMPSCARE, {
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
    triggerAmbientEvent() {
        if (this.state.phase !== game_1.GamePhase.PLAYING)
            return;
        const types = ['branch_snap', 'whisper', 'wind', 'footstep', 'breathing'];
        const type = types[Math.floor(Math.random() * types.length)];
        // Random position near a player
        const alivePlayers = Array.from(this.players.values()).filter(p => p.isAlive);
        if (alivePlayers.length === 0)
            return;
        const targetPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const offset = {
            x: targetPlayer.position.x + (Math.random() - 0.5) * 20,
            y: 0,
            z: targetPlayer.position.z + (Math.random() - 0.5) * 20,
        };
        const ambientEvent = {
            type,
            position: offset,
            volume: 0.3 + Math.random() * 0.5,
        };
        this.io.to(this.state.id).emit(game_1.SocketEvents.AMBIENT_EVENT, ambientEvent);
        // Occasionally trigger jumpscare from ambient event
        if (Math.random() < 0.3) {
            for (const player of alivePlayers) {
                const dist = distance(player.position, offset);
                if (dist < 15) {
                    this.io.to(player.id).emit(game_1.SocketEvents.JUMPSCARE, {
                        type: 'ambient',
                        intensity: 0.2 + Math.random() * 0.3,
                        playerId: player.id,
                        position: offset,
                    });
                }
            }
        }
    }
    handlePlayerMove(playerId, position, rotation, pitch, isSprinting) {
        const player = this.players.get(playerId);
        if (!player || !player.isAlive)
            return;
        player.position = position;
        player.rotation = rotation;
        player.pitch = pitch;
        player.isSprinting = isSprinting && player.stamina > 0;
    }
    handleCollectPage(playerId, pageId) {
        const player = this.players.get(playerId);
        if (!player || !player.isAlive)
            return false;
        const page = this.state.pages.find(p => p.id === pageId);
        if (!page || page.collected)
            return false;
        const dist = distance(player.position, page.position);
        if (dist > 3)
            return false; // Must be close enough
        page.collected = true;
        page.collectedBy = playerId;
        player.pagesCollected++;
        this.state.pagesCollected++;
        this.io.to(this.state.id).emit(game_1.SocketEvents.PAGE_COLLECTED, {
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
        if (this.monsterController && this.state.monster.state === game_1.MonsterState.IDLE) {
            this.state.monster.state = game_1.MonsterState.STALKING;
        }
        return true;
    }
    handlePuzzleInteract(playerId, puzzleId, code) {
        const player = this.players.get(playerId);
        if (!player || !player.isAlive)
            return { success: false, message: 'Player not alive' };
        const puzzle = this.state.puzzles.find(p => p.id === puzzleId);
        if (!puzzle)
            return { success: false, message: 'Puzzle not found' };
        if (puzzle.solved)
            return { success: false, message: 'Already solved' };
        const dist = distance(player.position, puzzle.position);
        if (dist > 4)
            return { success: false, message: 'Too far away' };
        // Code puzzle
        if (puzzle.type === 'code') {
            if (code !== puzzle.code) {
                // Wrong code = jumpscare
                this.io.to(playerId).emit(game_1.SocketEvents.JUMPSCARE, {
                    type: 'puzzle_fail',
                    intensity: 0.6,
                    playerId,
                });
                // Attract monster
                this.state.monster.state = game_1.MonsterState.HUNTING;
                return { success: false, message: 'Wrong code! The static grows louder...' };
            }
        }
        // Multi-player puzzle (pressure plate etc.)
        if (puzzle.requiresPlayers > 1) {
            if (!puzzle.activatedBy.includes(playerId)) {
                puzzle.activatedBy.push(playerId);
            }
            if (puzzle.activatedBy.length < puzzle.requiresPlayers) {
                this.io.to(this.state.id).emit(game_1.SocketEvents.PUZZLE_UPDATE, { puzzle });
                return {
                    success: false,
                    message: `Need ${puzzle.requiresPlayers - puzzle.activatedBy.length} more player(s)`
                };
            }
        }
        // Puzzle solved!
        puzzle.solved = true;
        this.io.to(this.state.id).emit(game_1.SocketEvents.PUZZLE_UPDATE, { puzzle, solved: true });
        return { success: true, message: puzzle.rewardDescription };
    }
    handlePlayerLookingAtMonster(playerId, isLooking) {
        if (!this.state.monster.visibleToPlayers.includes(playerId) && isLooking) {
            this.state.monster.visibleToPlayers.push(playerId);
        }
        else if (!isLooking) {
            this.state.monster.visibleToPlayers = this.state.monster.visibleToPlayers.filter(id => id !== playerId);
        }
    }
    endGame(win) {
        this.state.phase = win ? game_1.GamePhase.WIN : game_1.GamePhase.GAME_OVER;
        this.state.endTime = Date.now();
        this.stop();
        const event = win ? game_1.SocketEvents.GAME_WIN : game_1.SocketEvents.GAME_OVER;
        this.io.to(this.state.id).emit(event, {
            phase: this.state.phase,
            pagesCollected: this.state.pagesCollected,
            duration: this.state.endTime - (this.state.startTime || 0),
            players: Array.from(this.players.values()),
        });
    }
    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        if (this.ambientInterval) {
            clearInterval(this.ambientInterval);
            this.ambientInterval = null;
        }
    }
    getPlayers() {
        return this.players;
    }
    getPlayer(id) {
        return this.players.get(id);
    }
    isFull() {
        return this.state.players.length >= this.state.maxPlayers;
    }
    isEmpty() {
        return this.state.players.length === 0;
    }
}
exports.GameRoom = GameRoom;
