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
const os_1 = __importDefault(require("os"));
const GameRoom_1 = require("./rooms/GameRoom");
const GameEvents_1 = require("./events/GameEvents");
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const START_TIME = Date.now();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    next();
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    maxHttpBufferSize: 1e6, // 1MB for voice data
    pingTimeout: 60000,
    pingInterval: 25000,
});
exports.io = io;
// In-memory room storage
const rooms = new Map();
exports.rooms = rooms;
// ============================================
// Health & Monitoring Endpoints
// ============================================
// Basic health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - START_TIME) / 1000),
        rooms: rooms.size
    });
});
// Detailed health check for monitoring
app.get('/health/detailed', (req, res) => {
    const totalPlayers = Array.from(rooms.values()).reduce((acc, room) => acc + room.state.players.length, 0);
    const activeGames = Array.from(rooms.values()).filter(r => r.state.phase === 'playing').length;
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - START_TIME) / 1000),
        version: process.env.npm_package_version || '1.0.0',
        environment: NODE_ENV,
        system: {
            platform: process.platform,
            nodeVersion: process.version,
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
            },
            cpu: os_1.default.loadavg(),
        },
        game: {
            totalRooms: rooms.size,
            activeGames,
            lobbyRooms: rooms.size - activeGames,
            totalPlayers,
            socketConnections: io.engine.clientsCount,
        }
    });
});
// Ready check for Kubernetes/load balancers
app.get('/ready', (req, res) => {
    res.status(200).json({ ready: true });
});
// Metrics endpoint (Prometheus-compatible)
app.get('/metrics', (req, res) => {
    const totalPlayers = Array.from(rooms.values()).reduce((acc, room) => acc + room.state.players.length, 0);
    const activeGames = Array.from(rooms.values()).filter(r => r.state.phase === 'playing').length;
    res.setHeader('Content-Type', 'text/plain');
    res.send(`
# HELP hollow_man_uptime_seconds Server uptime in seconds
# TYPE hollow_man_uptime_seconds gauge
hollow_man_uptime_seconds ${Math.floor((Date.now() - START_TIME) / 1000)}

# HELP hollow_man_rooms_total Total number of rooms
# TYPE hollow_man_rooms_total gauge
hollow_man_rooms_total ${rooms.size}

# HELP hollow_man_rooms_active Number of active games
# TYPE hollow_man_rooms_active gauge
hollow_man_rooms_active ${activeGames}

# HELP hollow_man_players_total Total number of players
# TYPE hollow_man_players_total gauge
hollow_man_players_total ${totalPlayers}

# HELP hollow_man_socket_connections Total socket connections
# TYPE hollow_man_socket_connections gauge
hollow_man_socket_connections ${io.engine.clientsCount}

# HELP hollow_man_memory_usage_bytes Memory usage in bytes
# TYPE hollow_man_memory_usage_bytes gauge
hollow_man_memory_usage_bytes{type="heapUsed"} ${process.memoryUsage().heapUsed}
hollow_man_memory_usage_bytes{type="heapTotal"} ${process.memoryUsage().heapTotal}
hollow_man_memory_usage_bytes{type="rss"} ${process.memoryUsage().rss}
  `.trim());
});
// ============================================
// Rooms Router — mounted at both /rooms and /api/rooms
// ============================================
const roomsRouter = express_1.default.Router();
roomsRouter.get('/', (req, res) => {
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
roomsRouter.post('/', (req, res) => {
    const { name } = req.body;
    const roomName = name || `Room_${(0, uuid_1.v4)().slice(0, 6)}`;
    const room = new GameRoom_1.GameRoom(io, roomName);
    rooms.set(room.state.id, room);
    console.log(`[Server] Created room: ${roomName} (${room.state.id})`);
    res.status(201).json({ id: room.state.id, name: roomName });
});
roomsRouter.post('/:roomId/start', (req, res) => {
    const room = rooms.get(req.params.roomId);
    if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
    }
    room.startGame();
    res.json({ success: true });
});
// Mount at /rooms (direct) and /api/rooms (for proxy/Vite dev)
app.use('/rooms', roomsRouter);
app.use('/api/rooms', roomsRouter);
// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log(`[Server] Client connected: ${socket.id}`);
    (0, GameEvents_1.registerGameEvents)(io, socket, rooms);
    socket.on('disconnect', () => {
        console.log(`[Server] Client disconnected: ${socket.id}`);
    });
});
// Error handling middleware
app.use((err, req, res, _next) => {
    console.error(`[Error] ${req.method} ${req.path}:`, err);
    res.status(500).json({
        error: NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('[Server] SIGTERM received, shutting down gracefully...');
    httpServer.close(() => {
        console.log('[Server] HTTP server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('[Server] SIGINT received, shutting down gracefully...');
    httpServer.close(() => {
        console.log('[Server] HTTP server closed');
        process.exit(0);
    });
});
// Handle uncaught errors
process.on('uncaughtException', (err) => {
    console.error('[Server] Uncaught exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('[Server] Unhandled rejection at:', promise, 'reason:', reason);
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
  🌍 Environment: ${NODE_ENV}
  📊 Health: http://localhost:${PORT}/health
  📈 Metrics: http://localhost:${PORT}/metrics
  `);
});
