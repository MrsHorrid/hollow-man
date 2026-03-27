import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { GameRoom } from './rooms/GameRoom';
import { registerGameEvents } from './events/GameEvents';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const START_TIME = Date.now();

const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 1e6, // 1MB for voice data
  pingTimeout: 60000,
  pingInterval: 25000,
});

// In-memory room storage
const rooms = new Map<string, GameRoom>();

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
      cpu: os.loadavg(),
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
const roomsRouter = express.Router();

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
  const roomName = name || `Room_${uuidv4().slice(0, 6)}`;
  const room = new GameRoom(io, roomName);
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
  registerGameEvents(io, socket, rooms);
  
  socket.on('disconnect', () => {
    console.log(`[Server] Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
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

export { io, rooms };
