import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { GameRoom } from './rooms/GameRoom';
import { registerGameEvents } from './events/GameEvents';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 1e6, // 1MB for voice data
});

// In-memory room storage
const rooms = new Map<string, GameRoom>();

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
  const roomName = name || `Room_${uuidv4().slice(0, 6)}`;
  const room = new GameRoom(io, roomName);
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
  registerGameEvents(io, socket, rooms);
  
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

export { io, rooms };
