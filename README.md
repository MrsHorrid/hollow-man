# 🌲 THE HOLLOW MAN

> *"No face. No mercy. Eight pages. One night."*

A multiplayer cooperative horror game inspired by Slenderman. Built with Three.js, React, Socket.io, and Web Audio API.

---

## 🎮 Features

### Core Gameplay
- **8 Pages** — Collect all 8 pages scattered across a dark forest to win
- **Cooperative Puzzles** — Switches, levers, keypads, and pressure plates (some require multiple players)
- **Monster AI** — The Hollow Man stalks, hunts, and teleports after you
- **Jumpscare System** — Multi-layered horror events with screen effects and audio stings
- **Proximity Voice Chat** — Players hear each other based on distance (25m range)
- **Atmospheric Audio** — 3D positional sound, ambient events, heartbeat proximity system

### Monster Behavior
| State | Behavior |
|-------|----------|
| **Idle** | Wanders slowly, looking for isolated players |
| **Stalking** | Follows from 30m distance, circling a lone player |
| **Hunting** | Full chase — targets player with most pages collected |
| **Teleporting** | Jumps when not being watched — turns instantly lethal |
| **Attacking** | Within 2.5m — kills player |

**Key mechanic:** *Looking at the monster slows it down but speeds it up once you look away*

### Jumpscare Triggers
- Monster within 5 meters (proximity ring + visual flash)
- Monster appears in peripheral vision (soft flash)
- Wrong code entered on keypad (attracts monster)
- Random ambient events: branch snaps, whispers, footsteps
- Another player screams nearby

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Development

```bash
# Install all dependencies
cd hollow-man
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Run both server + client with hot reload
npm run dev
# Server: http://localhost:3001
# Client: http://localhost:3000
```

### Production Build

```bash
cd server && npm run build && npm start
cd client && npm run build
# Serve dist/ with any static server
```

### Docker

```bash
docker-compose up --build
# Client: http://localhost:3000
# Server: http://localhost:3001
```

---

## 🕹️ Controls

| Key | Action |
|-----|--------|
| WASD / Arrow Keys | Move |
| Mouse | Look around |
| Shift | Sprint (drains stamina) |
| F | Toggle flashlight |
| E | Interact with objects/pick up pages |
| V (hold) | Push-to-talk (proximity voice chat) |
| Click | Lock mouse pointer |

---

## 📁 Project Structure

```
hollow-man/
├── shared/
│   └── types/
│       ├── game.ts        — All game types + socket events enum
│       └── player.ts      — Player type
│
├── server/
│   └── src/
│       ├── server.ts              — Express + Socket.io entry point
│       ├── rooms/GameRoom.ts      — Room lifecycle, game logic, puzzle handling
│       ├── ai/MonsterController.ts — Monster FSM (idle/stalk/hunt/teleport/attack)
│       └── events/GameEvents.ts   — Socket event handlers
│
└── client/
    └── src/
        ├── App.tsx                — Routing: title → lobby → room → game → win/over
        ├── engine/
        │   ├── GameState.ts       — Central state manager + socket bridge
        │   └── SoundManager.ts    — Howler.js 3D positional audio engine
        ├── components/
        │   ├── Game.tsx           — Main game view + HUD + render loop
        │   ├── Jumpscare.tsx      — Multi-phase jumpscare overlay
        │   ├── Puzzle.tsx         — Puzzle interaction modal
        │   └── VoiceChat.tsx      — WebRTC proximity voice chat
        └── scenes/
            └── ForestScene.ts     — Three.js 3D forest world
```

---

## 🧠 Architecture

### Server Tick (20 FPS)
```
GameRoom.tick()
  → MonsterController.update(deltaTime)
    → updateWatchedStatus() — which players see the monster?
    → FSM update (idle/stalking/hunting/teleporting/attacking)
    → tryTeleport() — teleports when not watched
  → checkProximityJumpscares()
  → updateStamina()
  → emit MONSTER_UPDATE to all room members
```

### Client Render Loop
```
requestAnimationFrame()
  → scene.updateMonster(monsterState)
  → scene.updateOtherPlayers()
  → soundManager.setMonsterProximity(distance)
  → check interaction prompts
  → renderer.render()
```

### Monster FSM
```
IDLE ──[player alone nearby]──→ STALKING
STALKING ──[close/time]──→ HUNTING
HUNTING ──[< 2.5m]──→ ATTACKING
ATTACKING ──[2s]──→ HUNTING
ANY STATE ──[not watched + far]──→ TELEPORT → HUNTING
```

---

## 🔧 Configuration

Environment variables (server):
```
PORT=3001           # Server port
NODE_ENV=production
```

Client env (client/.env):
```
VITE_SERVER_URL=http://localhost:3001
```

---

## 🌐 REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server status |
| GET | `/rooms` | List open lobby rooms |
| POST | `/rooms` | Create room (`{name: string}`) |
| POST | `/rooms/:id/start` | Start game |

---

## 📡 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `join_room` | C→S | Join a room with player name |
| `player_move` | C→S | Position + rotation update |
| `collect_page` | C→S | Pick up a page |
| `puzzle_interact` | C→S | Interact with puzzle (+ optional code) |
| `player_looking_at_monster` | C→S | Looking direction update |
| `voice_data` | C→S | Raw audio chunk for proximity chat |
| `room_state` | S→C | Full room snapshot on join |
| `game_start` | S→C | Game begins |
| `monster_update` | S→C | Monster + player positions (20Hz) |
| `page_collected` | S→C | Page pickup broadcast |
| `puzzle_update` | S→C | Puzzle state changed |
| `jumpscare` | S→C | Trigger jumpscare on client |
| `ambient_event` | S→C | Branch snap / whisper etc. |
| `voice_receive` | S→C | Relayed voice data with volume |
| `game_over` / `game_win` | S→C | End states |

---

## ⚠️ Horror Tips

- **Use headphones.** The 3D audio is the entire experience.
- Separate players will attract the monster faster.
- The monster teleports when you're not watching — don't sprint in the dark.
- Puzzle codes are per-room and reset each game.
- Pressure plates require 2 players standing on them simultaneously.
- If you hear the static growing louder... run.

---

*"They said no one comes back from the forest. They were right."*
