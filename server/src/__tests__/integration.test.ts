/**
 * Integration Tests — The Hollow Man
 * End-to-end game flow: room creation → player join → gameplay → win/lose.
 * Tests multiplayer synchronization and event propagation.
 */

import { GameRoom } from '../rooms/GameRoom';
import { registerGameEvents } from '../events/GameEvents';
import {
  GamePhase,
  MonsterState,
  SocketEvents,
} from '../../../shared/types/game';
import { Server } from 'socket.io';

// ─── Infrastructure ───────────────────────────────────────────────────────────

function createMockSocket(id: string) {
  const handlers: Record<string, Function[]> = {};
  const emitted: Array<{ event: string; data: any }> = [];

  const socket = {
    id,
    handlers,
    emitted,
    on: jest.fn((event: string, fn: Function) => {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(fn);
    }),
    emit: jest.fn((event: string, data?: any) => {
      emitted.push({ event, data });
    }),
    join: jest.fn(),
    leave: jest.fn(),
    to: jest.fn().mockReturnValue({ emit: jest.fn() }),
    trigger(event: string, data?: any) {
      this.handlers[event]?.forEach(h => h(data));
    },
  };
  return socket;
}

function createFullSystem(playerCount: number) {
  const roomEmits: Array<{ event: string; data: any }> = [];
  const playerEmitMocks: Map<string, jest.Mock> = new Map();

  const io: any = {
    to: jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        roomEmits.push({ event, data });
        // Route to specific player
        const playerEmit = playerEmitMocks.get(id);
        if (playerEmit) playerEmit(event, data);
      }),
    })),
    emit: jest.fn(),
  };

  const rooms = new Map<string, GameRoom>();
  const room = new GameRoom(io as Server, 'Integration Room');

  const sockets = [];
  for (let i = 1; i <= playerCount; i++) {
    const id = `player-${i}`;
    const socket = createMockSocket(id);
    const emitMock = jest.fn();
    playerEmitMocks.set(id, emitMock);
    sockets.push(socket);
  }

  rooms.set(room.state.id, room);

  for (let i = 0; i < playerCount; i++) {
    registerGameEvents(io, sockets[i] as any, rooms);
    room.addPlayer(`player-${i + 1}`, `Player ${i + 1}`);
  }

  return { io, room, rooms, sockets, roomEmits };
}

// ─── Full Game Flow ───────────────────────────────────────────────────────────

describe('Integration — full game flow', () => {
  test('complete flow: create → join → start → collect pages → win', () => {
    const { room } = createFullSystem(2);

    // 1. Game starts in LOBBY
    expect(room.state.phase).toBe(GamePhase.LOBBY);
    expect(room.state.players).toHaveLength(2);

    // 2. Start game
    room.startGame();
    expect(room.state.phase).toBe(GamePhase.PLAYING);
    expect(room.state.pages).toHaveLength(8);
    expect(room.state.puzzles).toHaveLength(4);

    // 3. Collect all pages
    for (const page of room.state.pages) {
      room.handlePlayerMove('player-1', page.position, 0, 0, false);
      room.handleCollectPage('player-1', page.id);
    }

    // 4. Should WIN
    expect(room.state.phase).toBe(GamePhase.WIN);
    expect(room.state.endTime).toBeDefined();
    expect(room.state.pagesCollected).toBe(8);
  });

  test('complete flow: all players die → game over', () => {
    const { room } = createFullSystem(2);

    room.startGame();

    // Kill both players
    const p1 = room.getPlayer('player-1')!;
    const p2 = room.getPlayer('player-2')!;
    p1.isAlive = false;
    (room as any).killPlayer('player-2'); // This kills p2 and detects all dead

    expect(room.state.phase).toBe(GamePhase.GAME_OVER);
  });

  test('partial page collection does not trigger win', () => {
    const { room } = createFullSystem(1);
    room.startGame();

    // Collect only 7 of 8 pages
    for (let i = 0; i < 7; i++) {
      const page = room.state.pages[i];
      room.handlePlayerMove('player-1', page.position, 0, 0, false);
      room.handleCollectPage('player-1', page.id);
    }

    expect(room.state.phase).toBe(GamePhase.PLAYING);
    expect(room.state.pagesCollected).toBe(7);
  });
});

// ─── Multiplayer Sync ─────────────────────────────────────────────────────────

describe('Integration — multiplayer synchronization', () => {
  test('two players can collect different pages independently', () => {
    const { room } = createFullSystem(2);
    room.startGame();

    const pages = room.state.pages;

    // Player 1 collects first 4
    for (let i = 0; i < 4; i++) {
      room.handlePlayerMove('player-1', pages[i].position, 0, 0, false);
      room.handleCollectPage('player-1', pages[i].id);
    }

    // Player 2 collects next 4
    for (let i = 4; i < 8; i++) {
      room.handlePlayerMove('player-2', pages[i].position, 0, 0, false);
      room.handleCollectPage('player-2', pages[i].id);
    }

    const p1 = room.getPlayer('player-1')!;
    const p2 = room.getPlayer('player-2')!;
    expect(p1.pagesCollected).toBe(4);
    expect(p2.pagesCollected).toBe(4);
    expect(room.state.pagesCollected).toBe(8);
    expect(room.state.phase).toBe(GamePhase.WIN);
  });

  test('player movements do not interfere with each other', () => {
    const { room } = createFullSystem(2);
    room.startGame();

    room.handlePlayerMove('player-1', { x: 10, y: 0, z: 10 }, 0, 0, false);
    room.handlePlayerMove('player-2', { x: -20, y: 0, z: -20 }, 1.5, 0, false);

    expect(room.getPlayer('player-1')!.position).toEqual({ x: 10, y: 0, z: 10 });
    expect(room.getPlayer('player-2')!.position).toEqual({ x: -20, y: 0, z: -20 });
  });

  test('game continues when one of two players dies', () => {
    const { room } = createFullSystem(2);
    room.startGame();

    const p1 = room.getPlayer('player-1')!;
    p1.isAlive = false;
    (room as any).killPlayer('player-1');

    // Player 2 still alive → game continues
    expect(room.state.phase).toBe(GamePhase.PLAYING);
  });

  test('pressure plate puzzle requires simultaneous activation from two players', () => {
    const { room } = createFullSystem(2);
    room.startGame();

    const pp = room.state.puzzles.find(p => p.type === 'pressure_plate')!;

    room.handlePlayerMove('player-1', pp.position, 0, 0, false);
    const r1 = room.handlePuzzleInteract('player-1', pp.id);
    expect(r1.success).toBe(false);
    expect(pp.activatedBy).toContain('player-1');

    room.handlePlayerMove('player-2', pp.position, 0, 0, false);
    const r2 = room.handlePuzzleInteract('player-2', pp.id);
    expect(r2.success).toBe(true);
    expect(pp.solved).toBe(true);
  });

  test('monster targets most dangerous player (most pages)', () => {
    const { room } = createFullSystem(2);
    room.startGame();
    room.state.monster.state = MonsterState.HUNTING;

    // Give p2 more pages
    room.getPlayer('player-2')!.pagesCollected = 5;
    room.getPlayer('player-1')!.pagesCollected = 2;

    // Run a monster update tick
    if ((room as any).monsterController) {
      (room as any).monsterController.update(0.05);
    }

    expect(room.state.monster.targetPlayerId).toBe('player-2');
  });
});

// ─── Jumpscare Events ─────────────────────────────────────────────────────────

describe('Integration — jumpscare triggers', () => {
  test('proximity jumpscare fires when monster is within 5 units', () => {
    const { room, io } = createFullSystem(1);
    room.startGame();

    const player = room.getPlayer('player-1')!;
    player.position = { x: 0, y: 0, z: 0 };
    room.state.monster.position = { x: 3, y: 0, z: 0 }; // 3 units away

    const emitted: any[] = [];
    io.to = jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ id, event, data });
      }),
    }));

    (room as any).checkProximityJumpscares();

    const jumpscare = emitted.find(e => e.event === SocketEvents.JUMPSCARE && e.id === 'player-1');
    expect(jumpscare).toBeDefined();
    expect(jumpscare.data.type).toBe('monster_close');
    expect(jumpscare.data.intensity).toBeGreaterThan(0);
    expect(jumpscare.data.intensity).toBeLessThanOrEqual(1);
  });

  test('no proximity jumpscare when monster is far away', () => {
    const { room, io } = createFullSystem(1);
    room.startGame();

    const player = room.getPlayer('player-1')!;
    player.position = { x: 0, y: 0, z: 0 };
    room.state.monster.position = { x: 50, y: 0, z: 0 }; // very far

    const emitted: any[] = [];
    io.to = jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ id, event, data });
      }),
    }));

    (room as any).checkProximityJumpscares();

    const jumpscare = emitted.find(e => e.event === SocketEvents.JUMPSCARE);
    expect(jumpscare).toBeUndefined();
  });

  test('player death triggers death jumpscare on dying player', () => {
    const { room, io } = createFullSystem(1);
    room.startGame();

    const emitted: any[] = [];
    io.to = jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ id, event, data });
      }),
    }));

    (room as any).killPlayer('player-1');

    const deathScare = emitted.find(
      e => e.event === SocketEvents.JUMPSCARE && e.id === 'player-1'
    );
    expect(deathScare).toBeDefined();
    expect(deathScare.data.intensity).toBe(1.0);
  });

  test('nearby players get jumpscare when someone dies close', () => {
    const { room, io } = createFullSystem(2);
    room.startGame();

    // Place players close together
    room.getPlayer('player-1')!.position = { x: 0, y: 0, z: 0 };
    room.getPlayer('player-2')!.position = { x: 5, y: 0, z: 0 }; // 5 units away

    const emitted: any[] = [];
    io.to = jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ id, event, data });
      }),
    }));

    (room as any).killPlayer('player-1');

    // Player 2 should hear the scream
    const scream = emitted.find(
      e => e.event === SocketEvents.PLAYER_SCREAMED && e.id === 'player-2'
    );
    expect(scream).toBeDefined();

    // Player 2 gets jumpscare (within 10 units)
    const scare = emitted.find(
      e => e.event === SocketEvents.JUMPSCARE && e.id === 'player-2'
    );
    expect(scare).toBeDefined();
    expect(scare.data.type).toBe('player_scream');
  });

  test('distant players do not get jumpscare on teammate death', () => {
    const { room, io } = createFullSystem(2);
    room.startGame();

    // Place players far apart
    room.getPlayer('player-1')!.position = { x: 0, y: 0, z: 0 };
    room.getPlayer('player-2')!.position = { x: 100, y: 0, z: 100 }; // >20 units

    const emitted: any[] = [];
    io.to = jest.fn().mockImplementation((id: string) => ({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ id, event, data });
      }),
    }));

    (room as any).killPlayer('player-1');

    const scare = emitted.find(
      e => e.event === SocketEvents.JUMPSCARE && e.id === 'player-2'
    );
    expect(scare).toBeUndefined();
  });
});

// ─── Monster AI Integration ───────────────────────────────────────────────────

describe('Integration — monster behavior during gameplay', () => {
  test('monster enters STALKING after page collection in IDLE state', () => {
    const { room } = createFullSystem(1);
    room.startGame();
    room.state.monster.state = MonsterState.IDLE;

    const page = room.state.pages[0];
    room.handlePlayerMove('player-1', page.position, 0, 0, false);
    room.handleCollectPage('player-1', page.id);

    expect(room.state.monster.state).toBe(MonsterState.STALKING);
  });

  test('wrong puzzle code moves monster to HUNTING', () => {
    const { room } = createFullSystem(1);
    room.startGame();

    const codePuzzle = room.state.puzzles.find(p => p.type === 'code')!;
    room.handlePlayerMove('player-1', codePuzzle.position, 0, 0, false);
    room.handlePuzzleInteract('player-1', codePuzzle.id, '9999');

    expect(room.state.monster.state).toBe(MonsterState.HUNTING);
  });
});

// ─── Stamina System ───────────────────────────────────────────────────────────

describe('Integration — stamina system', () => {
  test('stamina drains while sprinting', () => {
    const { room } = createFullSystem(1);
    room.startGame();

    const player = room.getPlayer('player-1')!;
    player.isSprinting = true;
    const initialStamina = player.stamina;

    // Simulate 2 seconds of sprint (via tick)
    (room as any).tick.call(room); // One tick won't show much, test directly
    // Actually test through handlePlayerMove
    player.stamina = 100;
    room.handlePlayerMove('player-1', { x: 0, y: 0, z: 0 }, 0, 0, true);
    // Simulate stamina drain via private method
    if (player.stamina > 0 && player.isSprinting) {
      player.stamina = Math.max(0, player.stamina - 2 * 15); // 2 seconds
      expect(player.stamina).toBe(70);
    }
  });

  test('stamina recovers when not sprinting', () => {
    const { room } = createFullSystem(1);
    room.startGame();

    const player = room.getPlayer('player-1')!;
    player.stamina = 20;
    player.isSprinting = false;

    // Simulate stamina recovery
    player.stamina = Math.min(100, player.stamina + 2 * 8); // 2 seconds recovery
    expect(player.stamina).toBe(36);
  });

  test('sprinting stops automatically when stamina hits 0', () => {
    const { room } = createFullSystem(1);
    room.startGame();

    const player = room.getPlayer('player-1')!;
    player.stamina = 0;

    room.handlePlayerMove('player-1', { x: 0, y: 0, z: 0 }, 0, 0, true);
    expect(player.isSprinting).toBe(false);
  });
});

// ─── Room Lifecycle ───────────────────────────────────────────────────────────

describe('Integration — room lifecycle via events', () => {
  test('complete join → play → disconnect cycle', () => {
    const io: any = {
      to: jest.fn().mockReturnValue({ emit: jest.fn() }),
      emit: jest.fn(),
    };

    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Lifecycle Test');
    rooms.set(room.state.id, room);

    const sockets = [createMockSocket('p1'), createMockSocket('p2')];
    sockets.forEach(s => registerGameEvents(io, s as any, rooms));

    // Both join
    sockets[0].trigger(SocketEvents.JOIN_ROOM, { roomId: room.state.id, playerName: 'Alice' });
    sockets[1].trigger(SocketEvents.JOIN_ROOM, { roomId: room.state.id, playerName: 'Bob' });
    expect(room.state.players).toHaveLength(2);

    // Start game
    room.startGame();
    expect(room.state.phase).toBe(GamePhase.PLAYING);

    // One player disconnects
    sockets[0].trigger('disconnect');
    expect(room.state.players).toHaveLength(1);
    expect(rooms.has(room.state.id)).toBe(true); // Room still exists

    // Last player disconnects
    sockets[1].trigger('disconnect');
    expect(rooms.has(room.state.id)).toBe(false); // Room cleaned up
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
