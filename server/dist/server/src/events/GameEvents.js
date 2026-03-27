"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGameEvents = registerGameEvents;
const game_1 = require("../../../shared/types/game");
function registerGameEvents(io, socket, rooms) {
    let currentRoomId = null;
    // Join a room
    socket.on(game_1.SocketEvents.JOIN_ROOM, ({ roomId, playerName }) => {
        const room = rooms.get(roomId);
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }
        if (room.isFull()) {
            socket.emit('error', { message: 'Room is full' });
            return;
        }
        const success = room.addPlayer(socket.id, playerName || `Player_${socket.id.slice(0, 4)}`);
        if (!success) {
            socket.emit('error', { message: 'Could not join room' });
            return;
        }
        socket.join(roomId);
        currentRoomId = roomId;
        // Notify others
        socket.to(roomId).emit(game_1.SocketEvents.PLAYER_JOINED, {
            player: room.getPlayer(socket.id),
        });
        // Send current room state to joining player
        socket.emit(game_1.SocketEvents.ROOM_STATE, {
            room: room.state,
            players: Array.from(room.getPlayers().values()),
        });
    });
    // Leave a room
    socket.on(game_1.SocketEvents.LEAVE_ROOM, () => {
        if (currentRoomId) {
            leaveRoom(currentRoomId);
        }
    });
    // Player movement
    socket.on(game_1.SocketEvents.PLAYER_MOVE, (data) => {
        if (!currentRoomId)
            return;
        const room = rooms.get(currentRoomId);
        if (!room)
            return;
        room.handlePlayerMove(socket.id, data.position, data.rotation, data.pitch, data.isSprinting);
    });
    // Collect page
    socket.on(game_1.SocketEvents.COLLECT_PAGE, ({ pageId }) => {
        if (!currentRoomId)
            return;
        const room = rooms.get(currentRoomId);
        if (!room)
            return;
        room.handleCollectPage(socket.id, pageId);
    });
    // Puzzle interaction
    socket.on(game_1.SocketEvents.PUZZLE_INTERACT, ({ puzzleId, code }) => {
        if (!currentRoomId)
            return;
        const room = rooms.get(currentRoomId);
        if (!room)
            return;
        const result = room.handlePuzzleInteract(socket.id, puzzleId, code);
        socket.emit('puzzle_result', result);
    });
    // Player looking at monster
    socket.on(game_1.SocketEvents.PLAYER_LOOKING_AT_MONSTER, ({ isLooking }) => {
        if (!currentRoomId)
            return;
        const room = rooms.get(currentRoomId);
        if (!room)
            return;
        room.handlePlayerLookingAtMonster(socket.id, isLooking);
    });
    // Voice chat - relay audio data to nearby players
    socket.on(game_1.SocketEvents.VOICE_DATA, (audioData) => {
        if (!currentRoomId)
            return;
        const room = rooms.get(currentRoomId);
        if (!room)
            return;
        const sender = room.getPlayer(socket.id);
        if (!sender || !sender.isAlive)
            return;
        // Send to nearby players based on proximity
        for (const [playerId, player] of room.getPlayers()) {
            if (playerId === socket.id || !player.isAlive)
                continue;
            const dx = sender.position.x - player.position.x;
            const dz = sender.position.z - player.position.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            const MAX_VOICE_DISTANCE = 25;
            if (dist <= MAX_VOICE_DISTANCE) {
                const volume = 1 - dist / MAX_VOICE_DISTANCE;
                io.to(playerId).emit(game_1.SocketEvents.VOICE_RECEIVE, {
                    senderId: socket.id,
                    audioData,
                    volume,
                    distance: dist,
                });
            }
        }
    });
    // Disconnect handler
    function leaveRoom(roomId) {
        const room = rooms.get(roomId);
        if (!room)
            return;
        room.removePlayer(socket.id);
        socket.leave(roomId);
        socket.to(roomId).emit(game_1.SocketEvents.PLAYER_LEFT, { playerId: socket.id });
        if (room.isEmpty()) {
            room.stop();
            rooms.delete(roomId);
        }
        currentRoomId = null;
    }
    socket.on('disconnect', () => {
        if (currentRoomId) {
            leaveRoom(currentRoomId);
        }
    });
}
