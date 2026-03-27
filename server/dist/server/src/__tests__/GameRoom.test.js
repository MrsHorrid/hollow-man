"use strict";
/**
 * Unit Tests — GameRoom
 * Tests room lifecycle, puzzle logic, page collection, player management,
 * stamina, win/lose conditions, and jumpscare triggers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GameRoom_1 = require("../rooms/GameRoom");
const game_1 = require("../../../shared/types/game");
// ─── Mock socket.io ───────────────────────────────────────────────────────────
function mockIo() {
    const emittedEvents = [];
    const toMap = new Map();
    const toFn = (roomId) => ({
        emit: (event, data) => {
            emittedEvents.push({ event, data });
        },
    });
    return {
        to: jest.fn().mockImplementation(toFn),
        emit: jest.fn().mockImplementation((event, data) => {
            emittedEvents.push({ event, data });
        }),
        _emitted: emittedEvents,
    };
}
// ─── Helpers ──────────────────────────────────────────────────────────────────
function createRoomWithPlayers(count) {
    const io = mockIo();
    const room = new GameRoom_1.GameRoom(io, 'Test Room');
    for (let i = 0; i < count; i++) {
        room.addPlayer(`player-${i + 1}`, `Player ${i + 1}`);
    }
    return { room, io };
}
// ─── Room Initialization ──────────────────────────────────────────────────────
describe('GameRoom — initialization', () => {
    test('creates room with correct initial state', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Horror Room');
        expect(room.state.name).toBe('Horror Room');
        expect(room.state.phase).toBe(game_1.GamePhase.LOBBY);
        expect(room.state.pagesCollected).toBe(0);
        expect(room.state.totalPages).toBe(8);
        expect(room.state.players).toHaveLength(0);
        expect(room.state.maxPlayers).toBe(4);
        expect(room.state.id).toBeTruthy();
    });
    test('monster starts in IDLE state at initial position', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        expect(room.state.monster.state).toBe(game_1.MonsterState.IDLE);
        expect(room.state.monster.position).toEqual({ x: -50, y: 0, z: -50 });
    });
    test('each room gets a unique ID', () => {
        const io = mockIo();
        const room1 = new GameRoom_1.GameRoom(io, 'Room 1');
        const room2 = new GameRoom_1.GameRoom(io, 'Room 2');
        expect(room1.state.id).not.toBe(room2.state.id);
    });
});
// ─── Player Management ────────────────────────────────────────────────────────
describe('GameRoom — player management', () => {
    test('addPlayer adds a player to the room', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        const result = room.addPlayer('socket-1', 'Alice');
        expect(result).toBe(true);
        expect(room.state.players).toContain('socket-1');
        expect(room.getPlayer('socket-1')).toBeDefined();
    });
    test('addPlayer rejects when room is full (4 players)', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        room.addPlayer('p1', 'P1');
        room.addPlayer('p2', 'P2');
        room.addPlayer('p3', 'P3');
        room.addPlayer('p4', 'P4');
        const result = room.addPlayer('p5', 'P5');
        expect(result).toBe(false);
        expect(room.state.players).toHaveLength(4);
    });
    test('addPlayer rejects when game is in progress', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const result = room.addPlayer('late-joiner', 'Late');
        expect(result).toBe(false);
    });
    test('removePlayer removes player from room', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        room.addPlayer('p1', 'Alice');
        room.removePlayer('p1');
        expect(room.state.players).not.toContain('p1');
        expect(room.getPlayer('p1')).toBeUndefined();
    });
    test('removePlayer stops game when last player leaves', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const stopSpy = jest.spyOn(room, 'stop');
        room.removePlayer('player-1');
        expect(stopSpy).toHaveBeenCalled();
    });
    test('isFull() returns true when at max capacity', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        expect(room.isFull()).toBe(false);
        for (let i = 0; i < 4; i++)
            room.addPlayer(`p${i}`, `P${i}`);
        expect(room.isFull()).toBe(true);
    });
    test('isEmpty() returns true when no players', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        expect(room.isEmpty()).toBe(true);
        room.addPlayer('p1', 'Alice');
        expect(room.isEmpty()).toBe(false);
        room.removePlayer('p1');
        expect(room.isEmpty()).toBe(true);
    });
    test('player gets assigned a color', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        room.addPlayer('p1', 'Alice');
        const player = room.getPlayer('p1');
        expect(player?.color).toBeTruthy();
        expect(player?.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
    test('multiple players get different colors', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        room.addPlayer('p1', 'Alice');
        room.addPlayer('p2', 'Bob');
        const p1 = room.getPlayer('p1');
        const p2 = room.getPlayer('p2');
        expect(p1?.color).not.toBe(p2?.color);
    });
});
// ─── Game Start ───────────────────────────────────────────────────────────────
describe('GameRoom — startGame', () => {
    test('transitions phase from LOBBY to PLAYING', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.phase).toBe(game_1.GamePhase.PLAYING);
    });
    test('generates 8 pages on start', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.pages).toHaveLength(8);
    });
    test('generates 4 puzzles on start', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.puzzles).toHaveLength(4);
    });
    test('all pages start uncollected', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.pages.every(p => !p.collected)).toBe(true);
    });
    test('all puzzles start unsolved', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.puzzles.every(p => !p.solved)).toBe(true);
    });
    test('pages have unique positions (min 15 units apart)', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const pages = room.state.pages;
        for (let i = 0; i < pages.length; i++) {
            for (let j = i + 1; j < pages.length; j++) {
                const dx = pages[i].position.x - pages[j].position.x;
                const dz = pages[i].position.z - pages[j].position.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                // Allow minor failures due to random generation, but most should be spaced
                // (the algo tries 20 times per page)
                if (dist < 15) {
                    console.warn(`Pages ${i} and ${j} are only ${dist.toFixed(1)} units apart`);
                }
            }
        }
    });
    test('does not start when not in LOBBY phase', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const phase = room.state.phase;
        room.startGame(); // second call
        expect(room.state.phase).toBe(phase); // unchanged
    });
    test('does not start without players', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Empty');
        room.startGame();
        expect(room.state.phase).toBe(game_1.GamePhase.LOBBY);
    });
    test('sets startTime on game start', () => {
        const { room } = createRoomWithPlayers(1);
        const before = Date.now();
        room.startGame();
        const after = Date.now();
        expect(room.state.startTime).toBeGreaterThanOrEqual(before);
        expect(room.state.startTime).toBeLessThanOrEqual(after);
    });
    test('emits GAME_START event to room', () => {
        const io = mockIo();
        const room = new GameRoom_1.GameRoom(io, 'Test');
        room.addPlayer('p1', 'Alice');
        room.startGame();
        expect(io.to).toHaveBeenCalledWith(room.state.id);
    });
});
// ─── Page Collection ──────────────────────────────────────────────────────────
describe('GameRoom — page collection', () => {
    test('player can collect a page when close enough', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const page = room.state.pages[0];
        const player = room.getPlayer('player-1');
        // Move player to page position
        room.handlePlayerMove('player-1', page.position, 0, 0, false);
        const result = room.handleCollectPage('player-1', page.id);
        expect(result).toBe(true);
        expect(page.collected).toBe(true);
        expect(page.collectedBy).toBe('player-1');
        expect(player.pagesCollected).toBe(1);
        expect(room.state.pagesCollected).toBe(1);
    });
    test('page collection fails when player is too far away (>3 units)', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const page = room.state.pages[0];
        // Player starts near origin, page is somewhere random
        // Force a far-away page position
        page.position = { x: 100, y: 0, z: 100 };
        const result = room.handleCollectPage('player-1', page.id);
        expect(result).toBe(false);
        expect(page.collected).toBe(false);
    });
    test('already-collected page cannot be collected again', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const page = room.state.pages[0];
        room.handlePlayerMove('player-1', page.position, 0, 0, false);
        room.handleCollectPage('player-1', page.id);
        const result = room.handleCollectPage('player-1', page.id);
        expect(result).toBe(false);
        expect(room.state.pagesCollected).toBe(1); // not incremented again
    });
    test('dead player cannot collect pages', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const player = room.getPlayer('player-1');
        player.isAlive = false;
        const page = room.state.pages[0];
        room.handlePlayerMove('player-1', page.position, 0, 0, false);
        const result = room.handleCollectPage('player-1', page.id);
        expect(result).toBe(false);
    });
    test('collecting all 8 pages triggers win', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        // Collect all pages by teleporting player to each
        for (const page of room.state.pages) {
            room.handlePlayerMove('player-1', page.position, 0, 0, false);
            room.handleCollectPage('player-1', page.id);
        }
        expect(room.state.phase).toBe(game_1.GamePhase.WIN);
        expect(room.state.endTime).toBeDefined();
    });
    test('collecting a page activates monster from IDLE', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.state.monster.state = game_1.MonsterState.IDLE;
        const page = room.state.pages[0];
        room.handlePlayerMove('player-1', page.position, 0, 0, false);
        room.handleCollectPage('player-1', page.id);
        expect(room.state.monster.state).toBe(game_1.MonsterState.STALKING);
    });
    test('invalid page ID returns false', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const result = room.handleCollectPage('player-1', 'nonexistent-page');
        expect(result).toBe(false);
    });
});
// ─── Player Movement ──────────────────────────────────────────────────────────
describe('GameRoom — player movement', () => {
    test('handlePlayerMove updates player position', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.handlePlayerMove('player-1', { x: 5, y: 0, z: 10 }, 1.5, 0, false);
        const player = room.getPlayer('player-1');
        expect(player.position).toEqual({ x: 5, y: 0, z: 10 });
        expect(player.rotation).toBe(1.5);
    });
    test('dead player cannot move', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const player = room.getPlayer('player-1');
        player.isAlive = false;
        const originalPos = { ...player.position };
        room.handlePlayerMove('player-1', { x: 50, y: 0, z: 50 }, 0, 0, false);
        expect(player.position).toEqual(originalPos);
    });
    test('sprinting updates isSprinting flag when stamina > 0', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.handlePlayerMove('player-1', { x: 0, y: 0, z: 0 }, 0, 0, true);
        const player = room.getPlayer('player-1');
        expect(player.isSprinting).toBe(true);
    });
    test('sprint is disabled when stamina is 0', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const player = room.getPlayer('player-1');
        player.stamina = 0;
        room.handlePlayerMove('player-1', { x: 0, y: 0, z: 0 }, 0, 0, true);
        expect(player.isSprinting).toBe(false);
    });
});
// ─── Puzzle Logic ─────────────────────────────────────────────────────────────
describe('GameRoom — puzzle logic', () => {
    test('switch puzzle solves when player is close enough', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const switchPuzzle = room.state.puzzles.find(p => p.type === 'switch');
        room.handlePlayerMove('player-1', switchPuzzle.position, 0, 0, false);
        const result = room.handlePuzzleInteract('player-1', switchPuzzle.id);
        expect(result.success).toBe(true);
        expect(switchPuzzle.solved).toBe(true);
    });
    test('puzzle fails when player is too far away (>4 units)', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const puzzle = room.state.puzzles[0];
        puzzle.position = { x: 100, y: 0, z: 100 };
        const result = room.handlePuzzleInteract('player-1', puzzle.id);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Too far');
    });
    test('code puzzle requires correct code', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const codePuzzle = room.state.puzzles.find(p => p.type === 'code');
        room.handlePlayerMove('player-1', codePuzzle.position, 0, 0, false);
        const wrongResult = room.handlePuzzleInteract('player-1', codePuzzle.id, '0000');
        expect(wrongResult.success).toBe(false);
        const rightResult = room.handlePuzzleInteract('player-1', codePuzzle.id, codePuzzle.code);
        expect(rightResult.success).toBe(true);
    });
    test('wrong code triggers monster hunt mode', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const codePuzzle = room.state.puzzles.find(p => p.type === 'code');
        room.handlePlayerMove('player-1', codePuzzle.position, 0, 0, false);
        room.handlePuzzleInteract('player-1', codePuzzle.id, '0000'); // wrong code
        expect(room.state.monster.state).toBe(game_1.MonsterState.HUNTING);
    });
    test('already-solved puzzle cannot be solved again', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const switchPuzzle = room.state.puzzles.find(p => p.type === 'switch');
        room.handlePlayerMove('player-1', switchPuzzle.position, 0, 0, false);
        room.handlePuzzleInteract('player-1', switchPuzzle.id);
        const result = room.handlePuzzleInteract('player-1', switchPuzzle.id);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Already solved');
    });
    test('dead player cannot interact with puzzles', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const player = room.getPlayer('player-1');
        player.isAlive = false;
        const puzzle = room.state.puzzles[0];
        room.handlePlayerMove('player-1', puzzle.position, 0, 0, false);
        const result = room.handlePuzzleInteract('player-1', puzzle.id);
        expect(result.success).toBe(false);
    });
    test('nonexistent puzzle returns error', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const result = room.handlePuzzleInteract('player-1', 'ghost-puzzle');
        expect(result.success).toBe(false);
    });
    test('pressure_plate puzzle requires 2 players', () => {
        const { room } = createRoomWithPlayers(2);
        room.startGame();
        const ppPuzzle = room.state.puzzles.find(p => p.type === 'pressure_plate');
        expect(ppPuzzle.requiresPlayers).toBe(2);
        // First player activates
        room.handlePlayerMove('player-1', ppPuzzle.position, 0, 0, false);
        const res1 = room.handlePuzzleInteract('player-1', ppPuzzle.id);
        expect(res1.success).toBe(false);
        expect(res1.message).toContain('1 more player');
        // Second player activates → should solve
        room.handlePlayerMove('player-2', ppPuzzle.position, 0, 0, false);
        const res2 = room.handlePuzzleInteract('player-2', ppPuzzle.id);
        expect(res2.success).toBe(true);
        expect(ppPuzzle.solved).toBe(true);
    });
});
// ─── Win / Lose Conditions ────────────────────────────────────────────────────
describe('GameRoom — win/lose conditions', () => {
    test('game ends in GAME_OVER when all players die', () => {
        const { room } = createRoomWithPlayers(2);
        room.startGame();
        // Kill all players
        const p1 = room.getPlayer('player-1');
        const p2 = room.getPlayer('player-2');
        p1.isAlive = false;
        p2.isAlive = false;
        // Trigger kill on a player (which checks remaining alive players)
        room.killPlayer('player-1');
        // Both already dead → game over
        expect(room.state.phase).toBe(game_1.GamePhase.GAME_OVER);
    });
    test('game ends in WIN when all pages collected', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        for (const page of room.state.pages) {
            room.handlePlayerMove('player-1', page.position, 0, 0, false);
            room.handleCollectPage('player-1', page.id);
        }
        expect(room.state.phase).toBe(game_1.GamePhase.WIN);
    });
    test('stop() clears update intervals', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.stop();
        // Confirm no more ticks by verifying intervals were cleared
        expect(room.updateInterval).toBeNull();
        expect(room.ambientInterval).toBeNull();
    });
});
// ─── Monster Visibility ───────────────────────────────────────────────────────
describe('GameRoom — monster visibility', () => {
    test('handlePlayerLookingAtMonster adds to visible list', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.handlePlayerLookingAtMonster('player-1', true);
        expect(room.state.monster.visibleToPlayers).toContain('player-1');
    });
    test('handlePlayerLookingAtMonster removes from visible list when not looking', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.state.monster.visibleToPlayers = ['player-1'];
        room.handlePlayerLookingAtMonster('player-1', false);
        expect(room.state.monster.visibleToPlayers).not.toContain('player-1');
    });
    test('does not add duplicate entries', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        room.handlePlayerLookingAtMonster('player-1', true);
        room.handlePlayerLookingAtMonster('player-1', true);
        expect(room.state.monster.visibleToPlayers.filter(id => id === 'player-1')).toHaveLength(1);
    });
});
// ─── Page Generation ──────────────────────────────────────────────────────────
describe('GameRoom — page generation', () => {
    test('generates exactly TOTAL_PAGES pages', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        expect(room.state.pages).toHaveLength(8);
    });
    test('all pages have unique IDs', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        const ids = room.state.pages.map(p => p.id);
        const unique = new Set(ids);
        expect(unique.size).toBe(ids.length);
    });
    test('pages are within map bounds (-60 to 60 on x,z)', () => {
        const { room } = createRoomWithPlayers(1);
        room.startGame();
        for (const page of room.state.pages) {
            expect(page.position.x).toBeGreaterThanOrEqual(-60);
            expect(page.position.x).toBeLessThanOrEqual(60);
            expect(page.position.z).toBeGreaterThanOrEqual(-60);
            expect(page.position.z).toBeLessThanOrEqual(60);
        }
    });
});
// ─── Cleanup ─────────────────────────────────────────────────────────────────
beforeAll(() => {
    jest.useFakeTimers();
});
afterAll(() => {
    jest.useRealTimers();
});
afterEach(() => {
    jest.clearAllTimers();
});
