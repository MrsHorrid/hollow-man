"use strict";
/**
 * Unit Tests — MonsterController
 * Tests all monster AI state machine behaviors for The Hollow Man.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MonsterController_1 = require("../ai/MonsterController");
const game_1 = require("../../../shared/types/game");
// ─── Helpers ─────────────────────────────────────────────────────────────────
function makeMonster(overrides = {}) {
    return {
        position: { x: 0, y: 0, z: 0 },
        rotation: 0,
        state: game_1.MonsterState.IDLE,
        teleporting: false,
        speed: 3.5,
        visibleToPlayers: [],
        ...overrides,
    };
}
function makeRoom(overrides = {}) {
    return {
        id: 'room-1',
        name: 'Test Room',
        players: [],
        maxPlayers: 4,
        phase: game_1.GamePhase.PLAYING,
        pages: [],
        puzzles: [],
        monster: makeMonster(),
        pagesCollected: 0,
        totalPages: 8,
        ambientEventTimer: 0,
        ...overrides,
    };
}
function makePlayer(overrides = {}) {
    return {
        id: 'player-1',
        name: 'TestPlayer',
        position: { x: 10, y: 0, z: 10 },
        rotation: 0,
        pitch: 0,
        pagesCollected: 0,
        isAlive: true,
        isFlashlightOn: false,
        stamina: 100,
        isSprinting: false,
        roomId: 'room-1',
        color: '#ff4444',
        ...overrides,
    };
}
function makePlayers(players) {
    const map = new Map();
    players.forEach((p, i) => {
        const player = makePlayer({ id: `player-${i + 1}`, ...p });
        map.set(player.id, player);
    });
    return map;
}
// ─── Constructor & Initialization ────────────────────────────────────────────
describe('MonsterController — initialization', () => {
    test('initializes with room monster state', () => {
        const room = makeRoom();
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.getMonster()).toBe(room.monster);
    });
    test('monster starts in IDLE state', () => {
        const room = makeRoom();
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.getMonster().state).toBe(game_1.MonsterState.IDLE);
    });
    test('attack range is a positive number', () => {
        const room = makeRoom();
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.getAttackRange()).toBeGreaterThan(0);
    });
    test('isAttacking() returns null when not attacking', () => {
        const room = makeRoom();
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.isAttacking()).toBeNull();
    });
});
// ─── Idle State ──────────────────────────────────────────────────────────────
describe('MonsterController — IDLE state', () => {
    test('does nothing when no alive players exist', () => {
        const room = makeRoom();
        const players = makePlayers([{ isAlive: false }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        const initialPos = { ...room.monster.position };
        controller.update(0.05);
        // State should not change in a meaningful way
        expect(room.monster.state).toBe(game_1.MonsterState.IDLE);
    });
    test('transitions to STALKING when a lone player is within detection radius', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{ position: { x: 10, y: 0, z: 10 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.state).toBe(game_1.MonsterState.STALKING);
    });
    test('stays IDLE when sole player is outside detection radius (>50 units)', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{ position: { x: 60, y: 0, z: 60 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.state).toBe(game_1.MonsterState.IDLE);
    });
    test('stays IDLE when two nearby players are together (not alone)', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([
            { id: 'p1', position: { x: 5, y: 0, z: 5 } },
            { id: 'p2', position: { x: 6, y: 0, z: 5 } }, // <15 units apart
        ]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        // Both players are together → no alone player → stays IDLE
        expect(room.monster.state).toBe(game_1.MonsterState.IDLE);
    });
});
// ─── Speed when Watched ───────────────────────────────────────────────────────
describe('MonsterController — speed based on being watched', () => {
    test('monster is slower when not watched', () => {
        const room = makeRoom();
        room.monster.state = game_1.MonsterState.HUNTING;
        // Player facing away from monster (rotation = PI, monster is at 0,0,0, player at 10,0,10)
        const players = makePlayers([{
                position: { x: 10, y: 0, z: 10 },
                rotation: Math.PI, // facing directly away
            }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        // Not being watched → base speed
        expect(room.monster.speed).toBeLessThanOrEqual(7.0);
    });
    test('monster is fast when being watched (within detection radius)', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        // Player facing directly at monster (rotation 0 means facing +Z, atan2(0,0) = 0)
        // Monster at origin, player at 10,0,10 → monster angle = atan2(-10,-10) relative to player
        // Actually: dx = monster.x - player.x = 0-10 = -10, dz = monster.z - player.z = 0-10 = -10
        // monsterAngle = atan2(-10,-10) = -2.356 (SW direction)
        // If player.rotation = atan2(-10,-10) ≈ -2.356 they'd be looking directly at monster
        const angle = Math.atan2(-10, -10); // ≈ -2.356 rad
        const players = makePlayers([{
                position: { x: 10, y: 0, z: 10 },
                rotation: angle, // looking directly at monster
            }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        // Being watched → sprint speed * look multiplier = 7.0 * 2.5 = 17.5
        expect(room.monster.speed).toBe(7.0 * 2.5);
    });
});
// ─── isPlayerLookingAtMonster ─────────────────────────────────────────────────
describe('MonsterController — player look detection', () => {
    test('player too far away is not detected as watching', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{
                position: { x: 100, y: 0, z: 0 }, // > 50 unit detection radius
                rotation: Math.PI, // facing monster
            }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.visibleToPlayers).not.toContain('player-1');
    });
    test('dead players do not affect watched status', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{
                isAlive: false,
                position: { x: 10, y: 0, z: 0 },
                rotation: Math.PI, // facing monster
            }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.visibleToPlayers.length).toBe(0);
    });
});
// ─── Target Selection ─────────────────────────────────────────────────────────
describe('MonsterController — target selection', () => {
    test('prefers player with more pages collected', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        // Both players close to monster, but p2 has more pages
        const players = makePlayers([
            { id: 'p1', position: { x: 5, y: 0, z: 0 }, pagesCollected: 1 },
            { id: 'p2', position: { x: 10, y: 0, z: 0 }, pagesCollected: 5 },
        ]);
        room.players.push('p1', 'p2');
        const controller = new MonsterController_1.MonsterController(room, players);
        room.monster.state = game_1.MonsterState.HUNTING;
        controller.update(0.05);
        expect(room.monster.targetPlayerId).toBe('p2');
    });
    test('prefers closer player when page counts are equal', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([
            { id: 'p1', position: { x: 40, y: 0, z: 0 }, pagesCollected: 3 },
            { id: 'p2', position: { x: 5, y: 0, z: 0 }, pagesCollected: 3 },
        ]);
        const controller = new MonsterController_1.MonsterController(room, players);
        room.monster.state = game_1.MonsterState.HUNTING;
        controller.update(0.05);
        expect(room.monster.targetPlayerId).toBe('p2');
    });
    test('returns null target when all players are dead', () => {
        const room = makeRoom();
        const players = makePlayers([
            { id: 'p1', isAlive: false },
            { id: 'p2', isAlive: false },
        ]);
        const controller = new MonsterController_1.MonsterController(room, players);
        room.monster.state = game_1.MonsterState.HUNTING;
        controller.update(0.05);
        // Hunting with no targets → back to IDLE
        expect(room.monster.state).toBe(game_1.MonsterState.IDLE);
    });
});
// ─── Movement ────────────────────────────────────────────────────────────────
describe('MonsterController — movement', () => {
    test('monster moves toward target player during HUNTING', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.HUNTING;
        room.monster.targetPlayerId = 'player-1';
        const players = makePlayers([{ position: { x: 20, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        const initialX = room.monster.position.x;
        controller.update(0.1); // 100ms delta
        expect(room.monster.position.x).toBeGreaterThan(initialX);
    });
    test('monster rotation updates when moving', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.HUNTING;
        const players = makePlayers([{ position: { x: 10, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.1);
        // Monster moving toward player at (10,0,0) → rotation should be atan2(10,0) = PI/2
        expect(room.monster.rotation).toBeCloseTo(Math.PI / 2, 1);
    });
    test('monster does not move when within 0.5 units of target', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.HUNTING;
        // Player very close to monster
        const players = makePlayers([{ position: { x: 0.1, y: 0, z: 0.1 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        const posBefore = { ...room.monster.position };
        controller.update(0.1);
        // Position should be essentially the same (within threshold)
        expect(room.monster.position.x).toBeCloseTo(posBefore.x, 1);
    });
});
// ─── Attack State ─────────────────────────────────────────────────────────────
describe('MonsterController — ATTACKING state', () => {
    test('isAttacking() returns targetPlayerId when in ATTACKING state', () => {
        const room = makeRoom();
        room.monster.state = game_1.MonsterState.ATTACKING;
        room.monster.targetPlayerId = 'player-1';
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.isAttacking()).toBe('player-1');
    });
    test('isAttacking() returns null when state is HUNTING', () => {
        const room = makeRoom();
        room.monster.state = game_1.MonsterState.HUNTING;
        room.monster.targetPlayerId = 'player-1';
        const players = makePlayers([{}]);
        const controller = new MonsterController_1.MonsterController(room, players);
        expect(controller.isAttacking()).toBeNull();
    });
    test('monster transitions to ATTACKING when close enough to target', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.HUNTING;
        // Player within attack range (2.5 units)
        const players = makePlayers([{ position: { x: 1, y: 0, z: 1 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.state).toBe(game_1.MonsterState.ATTACKING);
    });
});
// ─── Teleport ────────────────────────────────────────────────────────────────
describe('MonsterController — teleport', () => {
    test('monster does not teleport when being watched', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.STALKING;
        room.monster.visibleToPlayers = ['player-1']; // someone watching
        const angle = Math.atan2(0, -1); // player looking at origin from x=10
        const players = makePlayers([{
                position: { x: 30, y: 0, z: 0 },
                rotation: angle,
            }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        // Manually set watchedByPlayers via first update
        room.monster.visibleToPlayers = ['player-1'];
        const initialPos = { ...room.monster.position };
        // Override lastTeleportTime to 0 to ensure cooldown has expired
        controller.lastTeleportTime = 0;
        controller.watchedByPlayers = new Set(['player-1']);
        const target = makePlayers([{ position: { x: 30, y: 0, z: 0 } }]).get('player-1');
        controller.tryTeleport(target);
        // Should NOT have teleported
        expect(room.monster.position.x).toBe(initialPos.x);
        expect(room.monster.position.z).toBe(initialPos.z);
    });
    test('monster teleports when not watched and far enough from target', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{ position: { x: 30, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.watchedByPlayers = new Set(); // nobody watching
        controller.lastTeleportTime = 0; // cooldown expired
        const target = players.get('player-1');
        controller.performTeleport(target);
        // Monster should have moved closer to player
        const newDist = Math.sqrt((room.monster.position.x - target.position.x) ** 2 +
            (room.monster.position.z - target.position.z) ** 2);
        expect(newDist).toBeLessThan(30); // closer than original 30 units
    });
    test('teleport respects cooldown', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{ position: { x: 30, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.watchedByPlayers = new Set();
        controller.lastTeleportTime = Date.now(); // just teleported
        const target = players.get('player-1');
        const posBefore = { ...room.monster.position };
        controller.tryTeleport(target);
        // Should NOT teleport due to cooldown
        expect(room.monster.position.x).toBe(posBefore.x);
    });
});
// ─── Stalking State ───────────────────────────────────────────────────────────
describe('MonsterController — STALKING state', () => {
    test('transitions back to IDLE when no players are alive', () => {
        const room = makeRoom();
        room.monster.state = game_1.MonsterState.STALKING;
        const players = makePlayers([{ isAlive: false }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        controller.update(0.05);
        expect(room.monster.state).toBe(game_1.MonsterState.IDLE);
    });
    test('stays in range of target during stalking (stalk distance ~30)', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.STALKING;
        // Player very far away → monster should move closer
        const players = makePlayers([{ position: { x: 80, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        const initialX = room.monster.position.x;
        controller.update(0.1);
        expect(room.monster.position.x).toBeGreaterThan(initialX);
    });
    test('transitions to HUNTING based on pages ratio', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        room.monster.state = game_1.MonsterState.STALKING;
        room.pagesCollected = 7; // 7/8 = 87.5% → hunt chance high
        room.totalPages = 8;
        const players = makePlayers([{ position: { x: 10, y: 0, z: 0 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        // Fake long stalk phase
        controller.stalkPhaseStart = Date.now() - 25000;
        controller.update(0.05);
        expect(room.monster.state).toBe(game_1.MonsterState.HUNTING);
    });
});
// ─── Distance Calculation ─────────────────────────────────────────────────────
describe('MonsterController — distance helper', () => {
    test('calculates correct distance to player', () => {
        const room = makeRoom();
        room.monster.position = { x: 0, y: 0, z: 0 };
        const players = makePlayers([{ position: { x: 3, y: 0, z: 4 } }]);
        const controller = new MonsterController_1.MonsterController(room, players);
        const dist = controller.getDistanceToPlayer(players.get('player-1'));
        expect(dist).toBeCloseTo(5, 1); // 3-4-5 triangle
    });
});
// ─── Cleanup (setTimeout in tests) ───────────────────────────────────────────
afterEach(() => {
    jest.clearAllTimers();
});
beforeAll(() => {
    jest.useFakeTimers();
});
afterAll(() => {
    jest.useRealTimers();
});
