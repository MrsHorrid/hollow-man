"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rooms = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const GameRoom_1 = require("./rooms/GameRoom");
const GameEvents_1 = require("./events/GameEvents");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    maxHttpBufferSize: 1e6, // 1MB for voice data
});
exports.io = io;
// In-memory room storage
const rooms = new Map();
exports.rooms = rooms;
// REST API endpoints
app.get('/health', (req, res) => {
    res.json({ status: 'ok', rooms: rooms.size });
});
app.get('/rooms', (req, res) => {
    const roomList = Array.from(rooms.values())
        .filter(r => !r.isFull() && r.state.phase === 'lobby')
        .map(r => ({
        id: r.state.id,
        name: r.state.name,
        players: r.state.players.length,
        maxPlayers: r.state.maxPlayers,
        phase: r.state.phase,
    }));
    res.json(roomList);
});
app.post('/rooms', (req, res) => {
    const { name } = req.body;
    const roomName = name || `Room_${(0, uuid_1.v4)().slice(0, 6)}`;
    const room = new GameRoom_1.GameRoom(io, roomName);
    rooms.set(room.state.id, room);
    console.log(`[Server] Created room: ${roomName} (${room.state.id})`);
    res.json({ id: room.state.id, name: roomName });
});
app.post('/rooms/:roomId/start', (req, res) => {
    const room = rooms.get(req.params.roomId);
    if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
    }
    room.startGame();
    res.json({ success: true });
});
// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log(`[Server] Client connected: ${socket.id}`);
    (0, GameEvents_1.registerGameEvents)(io, socket, rooms);
    socket.on('disconnect', () => {
        console.log(`[Server] Client disconnected: ${socket.id}`);
    });
});
httpServer.listen(PORT, () => {
    console.log(`
 ██╗  ██╗ ██████╗ ██╗     ██╗      ██████╗ ██╗    ██╗    ███╗   ███╗ █████╗ ███╗   ██╗
 ██║  ██║██╔═══██╗██║     ██║     ██╔═══██╗██║    ██║    ████╗ ████║██╔══██╗████╗  ██║
 ███████║██║   ██║██║     ██║     ██║   ██║██║ █╗ ██║    ██╔████╔██║███████║██╔██╗ ██║
 ██╔══██║██║   ██║██║     ██║     ██║   ██║██║███╗██║    ██║╚██╔╝██║██╔══██║██║╚██╗██║
 ██║  ██║╚██████╔╝███████╗███████╗╚██████╔╝╚███╔███╔╝    ██║ ╚═╝ ██║██║  ██║██║ ╚████║
 ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝  ╚══╝╚══╝     ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                                                          
  🌲 Server running on port ${PORT} 🌲
  `);
});
