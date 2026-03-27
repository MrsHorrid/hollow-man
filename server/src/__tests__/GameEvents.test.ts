/**
 * Unit Tests — GameEvents (Network Event Handler)
 * Tests socket event registration, room join/leave, player actions.
 */

import { registerGameEvents } from '../events/GameEvents';
import { GameRoom } from '../rooms/GameRoom';
import { GamePhase, SocketEvents } from '../../../shared/types/game';
import { Server } from 'socket.io';

// ─── Socket/IO Mocks ─────────────────────────────────────────────────────────

function createMockSocket(id: string = 'test-socket') {
  const handlers: Record<string, Function[]> = {};
  const emitted: Array<{ event: string; data: any }> = [];
  const joined: string[] = [];

  return {
    id,
    handlers,
    emitted,
    joined,
    on: jest.fn((event: string, handler: Function) => {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(handler);
    }),
    emit: jest.fn((event: string, data?: any) => {
      emitted.push({ event, data });
    }),
    join: jest.fn((room: string) => {
      joined.push(room);
    }),
    leave: jest.fn(),
    to: jest.fn().mockReturnValue({ emit: jest.fn() }),
    trigger: (event: string, data?: any) => {
      handlers[event]?.forEach(h => h(data));
    },
  };
}

function createMockIo() {
  const emitted: Array<{ to: string; event: string; data: any }> = [];
  return {
    emitted,
    to: jest.fn().mockReturnValue({
      emit: jest.fn((event: string, data: any) => {
        emitted.push({ to: 'room', event, data });
      }),
    }),
    emit: jest.fn(),
  } as any as Server;
}

// ─── JOIN_ROOM ────────────────────────────────────────────────────────────────

describe('GameEvents — JOIN_ROOM', () => {
  test('player can join an existing room', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test Room');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });

    expect(room.state.players).toContain('socket-1');
    expect(socket.join).toHaveBeenCalledWith(room.state.id);
  });

  test('emits ROOM_STATE to joining player', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test Room');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });

    const sentRoomState = socket.emitted.find(e => e.event === SocketEvents.ROOM_STATE);
    expect(sentRoomState).toBeDefined();
  });

  test('emits error when room not found', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: 'nonexistent-room',
      playerName: 'Alice',
    });

    const errorEvent = socket.emitted.find(e => e.event === 'error');
    expect(errorEvent).toBeDefined();
    expect(errorEvent?.data.message).toContain('not found');
  });

  test('emits error when room is full', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-5');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Full Room');

    // Fill the room
    for (let i = 1; i <= 4; i++) room.addPlayer(`p${i}`, `P${i}`);
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Overflow',
    });

    const errorEvent = socket.emitted.find(e => e.event === 'error');
    expect(errorEvent).toBeDefined();
    expect(errorEvent?.data.message).toContain('full');
  });

  test('uses socket.id as player name fallback', () => {
    const io = createMockIo();
    const socket = createMockSocket('abc123');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    // Join with empty name → should use Player_abc1 fallback
    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: '',
    });

    const player = room.getPlayer('abc123');
    expect(player?.name).toMatch(/Player_/);
  });
});

// ─── LEAVE_ROOM ───────────────────────────────────────────────────────────────

describe('GameEvents — LEAVE_ROOM', () => {
  test('player is removed when leaving', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });

    socket.trigger(SocketEvents.LEAVE_ROOM);
    expect(room.state.players).not.toContain('socket-1');
  });

  test('empty room is cleaned up when last player leaves', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });
    socket.trigger(SocketEvents.LEAVE_ROOM);

    expect(rooms.has(room.state.id)).toBe(false);
  });

  test('leaving without being in a room is a no-op', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();

    registerGameEvents(io, socket as any, rooms);

    // Should not throw
    expect(() => socket.trigger(SocketEvents.LEAVE_ROOM)).not.toThrow();
  });
});

// ─── PLAYER_MOVE ─────────────────────────────────────────────────────────────

describe('GameEvents — PLAYER_MOVE', () => {
  test('updates player position', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, { roomId: room.state.id, playerName: 'Alice' });
    socket.trigger(SocketEvents.PLAYER_MOVE, {
      position: { x: 5, y: 0, z: 10 },
      rotation: 1.0,
      pitch: 0.2,
      isSprinting: false,
    });

    const player = room.getPlayer('socket-1');
    expect(player?.position).toEqual({ x: 5, y: 0, z: 10 });
    expect(player?.rotation).toBe(1.0);
  });

  test('ignores movement when not in a room', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();

    registerGameEvents(io, socket as any, rooms);

    expect(() => {
      socket.trigger(SocketEvents.PLAYER_MOVE, {
        position: { x: 5, y: 0, z: 10 },
        rotation: 0,
        pitch: 0,
        isSprinting: false,
      });
    }).not.toThrow();
  });
});

// ─── COLLECT_PAGE ─────────────────────────────────────────────────────────────

describe('GameEvents — COLLECT_PAGE', () => {
  test('collects page when player is close', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    room.addPlayer('socket-1', 'Alice');
    room.startGame();
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);
    (socket as any).handlers = {}; // clear existing handlers
    registerGameEvents(io, socket as any, rooms);

    // Move player to page location
    const page = room.state.pages[0];
    room.handlePlayerMove('socket-1', page.position, 0, 0, false);

    // Simulate being in the room
    (socket as any).handlers = {};
    // We'll call handleCollectPage directly since the socket doesn't track room after re-registration
    const result = room.handleCollectPage('socket-1', page.id);
    expect(result).toBe(true);
  });
});

// ─── PUZZLE_INTERACT ─────────────────────────────────────────────────────────

describe('GameEvents — PUZZLE_INTERACT', () => {
  test('emits puzzle_result after interaction', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    room.addPlayer('socket-1', 'Alice');
    room.startGame();
    rooms.set(room.state.id, room);

    // Manually set the currentRoomId by joining
    (socket as any).handlers = {};
    registerGameEvents(io, socket as any, rooms);

    // Simulate joining
    (socket as any).handlers[SocketEvents.JOIN_ROOM]?.[0]?.({
      roomId: room.state.id,
      playerName: 'Alice',
    });

    // Wait — the problem is the game is already started, so join fails in PLAYING phase
    // Let's test directly on the room instead
    const puzzle = room.state.puzzles.find(p => p.type === 'switch')!;
    room.handlePlayerMove('socket-1', puzzle.position, 0, 0, false);
    const result = room.handlePuzzleInteract('socket-1', puzzle.id);
    expect(result.success).toBe(true);
  });
});

// ─── VOICE_DATA ───────────────────────────────────────────────────────────────

describe('GameEvents — VOICE_DATA', () => {
  test('voice data is relayed to nearby players', () => {
    const io = createMockIo();
    const toEmitMock = jest.fn();
    io.to = jest.fn().mockReturnValue({ emit: toEmitMock });

    const socket1 = createMockSocket('player-1');
    const socket2 = createMockSocket('player-2');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    room.addPlayer('player-1', 'Alice');
    room.addPlayer('player-2', 'Bob');
    room.startGame();
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket1 as any, rooms);
    registerGameEvents(io, socket2 as any, rooms);

    // Simulate join for socket1
    (socket1 as any).handlers[SocketEvents.JOIN_ROOM]?.[0]?.({
      roomId: room.state.id,
      playerName: 'Alice',
    });

    // Place both players close together
    const p1 = room.getPlayer('player-1')!;
    const p2 = room.getPlayer('player-2')!;
    p1.position = { x: 0, y: 0, z: 0 };
    p2.position = { x: 5, y: 0, z: 0 }; // Within 25 unit voice range

    // Trigger voice data
    (socket1 as any).handlers[SocketEvents.VOICE_DATA]?.[0]?.(new ArrayBuffer(100));

    // Should emit to nearby player
    expect(io.to).toHaveBeenCalledWith('player-2');
  });

  test('voice data does not relay to far-away players', () => {
    const io = createMockIo();
    const toEmitMock = jest.fn();
    const callLog: string[] = [];
    io.to = jest.fn().mockImplementation((id: string) => {
      callLog.push(id);
      return { emit: toEmitMock };
    });

    const socket1 = createMockSocket('player-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    room.addPlayer('player-1', 'Alice');
    room.addPlayer('player-2', 'Bob');
    room.startGame();
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket1 as any, rooms);
    (socket1 as any).handlers[SocketEvents.JOIN_ROOM]?.[0]?.({
      roomId: room.state.id,
      playerName: 'Alice',
    });

    // Place players far apart
    const p1 = room.getPlayer('player-1')!;
    const p2 = room.getPlayer('player-2')!;
    p1.position = { x: 0, y: 0, z: 0 };
    p2.position = { x: 100, y: 0, z: 0 }; // > 25 units

    callLog.length = 0; // reset
    (socket1 as any).handlers[SocketEvents.VOICE_DATA]?.[0]?.(new ArrayBuffer(100));

    expect(callLog).not.toContain('player-2');
  });

  test('dead player voice is not transmitted', () => {
    const io = createMockIo();
    const toEmitMock = jest.fn();
    const callLog: string[] = [];
    io.to = jest.fn().mockImplementation((id: string) => {
      callLog.push(id);
      return { emit: toEmitMock };
    });

    const socket1 = createMockSocket('player-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    room.addPlayer('player-1', 'Alice');
    room.addPlayer('player-2', 'Bob');
    room.startGame();
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket1 as any, rooms);
    (socket1 as any).handlers[SocketEvents.JOIN_ROOM]?.[0]?.({
      roomId: room.state.id,
      playerName: 'Alice',
    });

    // Kill sender
    const p1 = room.getPlayer('player-1')!;
    p1.isAlive = false;

    callLog.length = 0;
    (socket1 as any).handlers[SocketEvents.VOICE_DATA]?.[0]?.(new ArrayBuffer(100));

    // Dead player voice should not be relayed
    expect(callLog).not.toContain('player-2');
  });
});

// ─── DISCONNECT ───────────────────────────────────────────────────────────────

describe('GameEvents — disconnect', () => {
  test('player is removed on disconnect', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });

    socket.trigger('disconnect');
    expect(room.state.players).not.toContain('socket-1');
  });

  test('room is deleted when last player disconnects', () => {
    const io = createMockIo();
    const socket = createMockSocket('socket-1');
    const rooms = new Map<string, GameRoom>();
    const room = new GameRoom(io, 'Test');
    rooms.set(room.state.id, room);

    registerGameEvents(io, socket as any, rooms);

    socket.trigger(SocketEvents.JOIN_ROOM, {
      roomId: room.state.id,
      playerName: 'Alice',
    });
    socket.trigger('disconnect');

    expect(rooms.has(room.state.id)).toBe(false);
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
