import React, { useEffect, useState, useCallback } from 'react';
import { gameState, LocalGameState, RoomInfo } from './engine/GameState';
import { Game } from './components/Game';
import { GamePhase } from '@shared/types/game';

type Screen = 'title' | 'lobby' | 'room' | 'game' | 'gameover' | 'win';

const App: React.FC = () => {
  const [gs, setGs] = useState<LocalGameState>(gameState.getState());
  const [screen, setScreen] = useState<Screen>('title');
  const [playerName, setPlayerName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    gameState.connect();
    const unsub = gameState.subscribe(s => {
      setGs(s);
      // Route based on game phase
      if (s.phase === GamePhase.PLAYING) setScreen('game');
      else if (s.phase === GamePhase.GAME_OVER) setScreen('gameover');
      else if (s.phase === GamePhase.WIN) setScreen('win');
      else if (s.roomId && s.phase === GamePhase.LOBBY) setScreen('room');
    });
    return unsub;
  }, []);

  const handleCreateRoom = async () => {
    if (!playerName.trim()) return;
    setLoading(true);
    setCreateError(null);
    try {
      const id = await gameState.createRoom(roomName || `Room_${Math.random().toString(36).slice(2, 6)}`);
      if (id) {
        gameState.joinRoom(id, playerName);
      } else {
        setCreateError('Could not create room. Is the server running?');
      }
    } catch (err) {
      console.error('handleCreateRoom error:', err);
      setCreateError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    if (!playerName.trim()) return;
    gameState.joinRoom(roomId, playerName);
  };

  const handleStartGame = () => {
    if (gs.roomId) {
      gameState.startGame(gs.roomId);
    }
  };

  const handleRefreshRooms = () => {
    gameState.fetchRooms();
  };

  const goToTitle = () => {
    setScreen('title');
  };

  // === SCREENS ===

  if (screen === 'game') {
    return <Game />;
  }

  if (screen === 'gameover') {
    return (
      <HorrorScreen>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💀</div>
          <h1 style={{
            color: '#cc0000',
            fontSize: '48px',
            letterSpacing: '8px',
            textShadow: '0 0 20px rgba(200,0,0,0.8)',
            marginBottom: '16px',
          }}>
            IT FOUND YOU
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', fontSize: '14px' }}>
            {gs.pagesCollected} of {gs.totalPages} pages collected
          </p>
          <button onClick={goToTitle} style={horrorButtonStyle}>
            TRY AGAIN
          </button>
        </div>
      </HorrorScreen>
    );
  }

  if (screen === 'win') {
    return (
      <HorrorScreen>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>📄</div>
          <h1 style={{
            color: '#44ff44',
            fontSize: '36px',
            letterSpacing: '6px',
            textShadow: '0 0 20px rgba(0,255,0,0.5)',
            marginBottom: '16px',
          }}>
            YOU ESCAPED
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', fontSize: '12px', marginBottom: '8px' }}>
            All {gs.totalPages} pages collected
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', fontSize: '11px' }}>
            But it will be waiting next time...
          </p>
          <button onClick={goToTitle} style={horrorButtonStyle}>
            PLAY AGAIN
          </button>
        </div>
      </HorrorScreen>
    );
  }

  if (screen === 'room' && gs.roomId) {
    const myPlayerId = gs.playerId;
    const isHost = gs.players.size > 0 && 
      Array.from(gs.players.keys())[0] === myPlayerId;

    return (
      <HorrorScreen>
        <div style={{ width: '500px' }}>
          <h2 style={{
            color: '#cc2222',
            fontSize: '14px',
            letterSpacing: '4px',
            marginBottom: '4px',
          }}>
            ROOM: {gs.roomName}
          </h2>
          <div style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '10px',
            letterSpacing: '2px',
            marginBottom: '24px',
          }}>
            {gs.players.size}/4 PLAYERS — WAITING...
          </div>

          {/* Player list */}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,50,50,0.2)',
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '24px',
          }}>
            {Array.from(gs.players.values()).map((p, i) => (
              <div key={p.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0',
                borderBottom: i < gs.players.size - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                }} />
                <span style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', fontSize: '13px' }}>
                  {p.name}
                </span>
                {i === 0 && (
                  <span style={{ color: '#ffaa00', fontSize: '10px', marginLeft: 'auto' }}>HOST</span>
                )}
              </div>
            ))}

            {gs.players.size < 4 && (
              <div style={{
                padding: '8px 0',
                color: 'rgba(255,255,255,0.15)',
                fontSize: '11px',
                letterSpacing: '2px',
              }}>
                {Array.from({ length: 4 - gs.players.size }, (_, i) => (
                  <div key={i}>— EMPTY SLOT —</div>
                ))}
              </div>
            )}
          </div>

          {/* Room info */}
          <div style={{
            background: 'rgba(100,0,0,0.1)',
            border: '1px solid rgba(255,50,50,0.1)',
            borderRadius: '3px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '1px',
            lineHeight: '1.8',
          }}>
            ⚠ Collect all 8 pages to escape<br />
            ⚠ Cooperative puzzles require multiple players<br />
            ⚠ Do not let it find you alone<br />
            ⚠ Proximity voice chat enabled
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {isHost ? (
              <button
                onClick={handleStartGame}
                disabled={gs.players.size < 1}
                style={{
                  ...horrorButtonStyle,
                  flex: 1,
                  opacity: gs.players.size < 1 ? 0.4 : 1,
                }}
              >
                BEGIN THE HUNT
              </button>
            ) : (
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '12px',
                letterSpacing: '2px',
                padding: '12px',
              }}>
                WAITING FOR HOST...
              </div>
            )}
          </div>
        </div>
      </HorrorScreen>
    );
  }

  if (screen === 'lobby') {
    return (
      <HorrorScreen>
        <div style={{ width: '500px' }}>
          {/* Connection status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px',
            fontSize: '10px',
            letterSpacing: '2px',
            color: gs.isConnected ? 'rgba(50,255,50,0.6)' : 'rgba(255,100,50,0.7)',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: gs.isConnected ? '#44ff44' : '#ff6622',
              boxShadow: gs.isConnected ? '0 0 6px #44ff44' : '0 0 6px #ff6622',
            }} />
            {gs.isConnected ? 'SERVER CONNECTED' : 'SERVER DISCONNECTED — CANNOT CREATE ROOMS'}
          </div>

          <button
            onClick={goToTitle}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '2px',
              marginBottom: '24px',
              fontFamily: 'Courier New',
            }}
          >
            ← BACK
          </button>

          {/* Player name */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>YOUR NAME</label>
            <input
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Enter name..."
              style={inputStyle}
              maxLength={16}
            />
          </div>

          {/* Create room */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,50,50,0.2)',
            borderRadius: '4px',
            padding: '16px',
            marginBottom: '20px',
          }}>
            <h3 style={{ color: '#cc2222', fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>
              CREATE ROOM
            </h3>
            <input
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              placeholder="Room name (optional)"
              style={{ ...inputStyle, marginBottom: '12px' }}
              maxLength={20}
            />
            <button
              onClick={handleCreateRoom}
              disabled={!playerName.trim() || loading || !gs.isConnected}
              style={{ ...horrorButtonStyle, width: '100%', opacity: (playerName.trim() && gs.isConnected) ? 1 : 0.4 }}
            >
              {loading ? 'CREATING...' : 'CREATE NEW ROOM'}
            </button>
            {createError && (
              <div style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: 'rgba(150,0,0,0.3)',
                border: '1px solid rgba(255,50,50,0.5)',
                borderRadius: '3px',
                color: '#ff6666',
                fontSize: '11px',
                letterSpacing: '1px',
                textAlign: 'center',
              }}>
                ⚠ {createError}
              </div>
            )}
          </div>

          {/* Join room */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ color: '#cc2222', fontSize: '11px', letterSpacing: '3px' }}>
                JOIN ROOM
              </h3>
              <button
                onClick={handleRefreshRooms}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  padding: '4px 10px',
                  fontSize: '9px',
                  letterSpacing: '1px',
                  fontFamily: 'Courier New',
                }}
              >
                ↻ REFRESH
              </button>
            </div>

            {gs.availableRooms.length === 0 ? (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '11px',
                letterSpacing: '2px',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '4px',
              }}>
                NO ROOMS AVAILABLE<br />
                <span style={{ fontSize: '9px' }}>Create a room to begin</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {gs.availableRooms.map((room: RoomInfo) => (
                  <div
                    key={room.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,50,50,0.15)',
                      borderRadius: '3px',
                    }}
                  >
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', letterSpacing: '1px' }}>
                        {room.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '2px' }}>
                        {room.players}/{room.maxPlayers} players
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinRoom(room.id)}
                      disabled={!playerName.trim() || !gs.isConnected}
                      style={{
                        ...horrorButtonStyle,
                        padding: '8px 16px',
                        fontSize: '10px',
                        opacity: (playerName.trim() && gs.isConnected) ? 1 : 0.4,
                      }}
                    >
                      JOIN
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </HorrorScreen>
    );
  }

  // Title screen
  return (
    <HorrorScreen>
      <TitleScreen onPlay={() => setScreen('lobby')} />
    </HorrorScreen>
  );
};

// Title Screen Component
const TitleScreen: React.FC<{ onPlay: () => void }> = ({ onPlay }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Atmospheric trees in background (CSS) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center bottom, rgba(10,20,5,0.8) 0%, rgba(0,0,0,1) 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Skull decoration */}
        <div style={{ fontSize: '60px', marginBottom: '16px', opacity: 0.7 }}>
          🌲
        </div>

        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            letterSpacing: '8px',
            color: glitch ? '#ff0000' : '#ffffff',
            textShadow: glitch
              ? '3px 0 #ff0000, -3px 0 #0000ff, 0 0 20px rgba(255,0,0,0.8)'
              : '0 0 30px rgba(255,255,255,0.2)',
            marginBottom: '8px',
            fontFamily: 'Courier New, monospace',
            transform: glitch ? `translateX(${Math.random() * 6 - 3}px)` : 'none',
            transition: glitch ? 'none' : 'color 0.3s',
          }}
        >
          THE HOLLOW MAN
        </h1>

        <div style={{
          color: 'rgba(255,50,50,0.6)',
          fontSize: '12px',
          letterSpacing: '6px',
          marginBottom: '48px',
          textShadow: '0 0 10px rgba(255,0,0,0.3)',
        }}>
          A MULTIPLAYER HORROR EXPERIENCE
        </div>

        {/* Atmospheric text */}
        <div style={{
          color: 'rgba(255,255,255,0.15)',
          fontSize: '11px',
          letterSpacing: '3px',
          lineHeight: '2',
          marginBottom: '48px',
          maxWidth: '400px',
          margin: '0 auto 48px',
        }}>
          Eight pages. One night.<br />
          It has no face. It has no mercy.<br />
          No one who enters the forest alone returns.
        </div>

        <button onClick={onPlay} style={{ ...horrorButtonStyle, fontSize: '16px', padding: '16px 48px' }}>
          ENTER THE FOREST
        </button>

        <div style={{
          marginTop: '24px',
          color: 'rgba(255,255,255,0.1)',
          fontSize: '9px',
          letterSpacing: '2px',
        }}>
          HEADPHONES RECOMMENDED — FOR MAXIMUM TERROR
        </div>
      </div>
    </div>
  );
};

// Shared Layout
const HorrorScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(40,0,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,0,20,0.4) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Tree silhouettes */}
      <TreeSilhouettes />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

const TreeSilhouettes: React.FC = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '40vh', pointerEvents: 'none' }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${i * 5.5 + Math.random() * 3}%`,
            width: `${8 + Math.random() * 15}px`,
            height: `${100 + Math.random() * 200}px`,
            background: `rgba(0,0,0,${0.8 + Math.random() * 0.2})`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      ))}
    </div>
  );
};

// Shared styles
const horrorButtonStyle: React.CSSProperties = {
  background: 'rgba(80,0,0,0.4)',
  border: '1px solid rgba(200,0,0,0.5)',
  color: '#cc2222',
  padding: '12px 32px',
  fontSize: '13px',
  letterSpacing: '3px',
  fontFamily: 'Courier New, monospace',
  cursor: 'pointer',
  textTransform: 'uppercase',
  borderRadius: '3px',
  transition: 'all 0.2s',
  boxShadow: '0 0 15px rgba(150,0,0,0.2)',
  marginTop: '16px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'rgba(255,255,255,0.3)',
  fontSize: '10px',
  letterSpacing: '3px',
  marginBottom: '8px',
  textTransform: 'uppercase',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,50,50,0.3)',
  color: 'rgba(255,255,255,0.8)',
  padding: '10px 14px',
  fontSize: '13px',
  fontFamily: 'Courier New, monospace',
  letterSpacing: '1px',
  borderRadius: '3px',
  outline: 'none',
};

export default App;
