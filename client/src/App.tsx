import React, { useEffect, useState, useCallback } from 'react';
import { gameState, LocalGameState, RoomInfo, ConnectionState } from './engine/GameState';
import { Game } from './components/Game';
import { GamePhase, GameRoom } from '@shared/types/game';
import { LoadingScreen, injectLoadingStyles } from './components/LoadingScreen';
import { ConnectionStatus } from './components/ConnectionStatus';
import { ErrorMessage, ErrorType } from './components/ErrorMessage';
import { EnhancedLobby } from './components/EnhancedLobby';
import { Tutorial } from './components/Tutorial';
import { VolumeControls } from './components/VolumeControls';
import { VictoryScreen } from './components/VictoryScreen';
import { GameOverScreen } from './components/GameOverScreen';

type Screen = 'title' | 'lobby' | 'room' | 'game' | 'gameover' | 'win';

const App: React.FC = () => {
  const [gs, setGs] = useState<LocalGameState>(gameState.getState());
  const [screen, setScreen] = useState<Screen>('title');
  const [playerName, setPlayerName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [gameResult, setGameResult] = useState<{
    pagesCollected: number;
    totalPages: number;
    duration: number;
    players: any[];
  } | null>(null);

  useEffect(() => {
    injectLoadingStyles();
    gameState.connect();
    const unsub = gameState.subscribe(s => {
      setGs(s);
      // Route based on game phase
      if (s.phase === GamePhase.PLAYING) {
        setScreen('game');
      } else if (s.phase === GamePhase.GAME_OVER) {
        setGameResult({
          pagesCollected: s.pagesCollected,
          totalPages: s.totalPages,
          duration: Date.now(), // Will be updated from server
          players: Array.from(s.players.values()),
        });
        setScreen('gameover');
      } else if (s.phase === GamePhase.WIN) {
        setGameResult({
          pagesCollected: s.pagesCollected,
          totalPages: s.totalPages,
          duration: Date.now(),
          players: Array.from(s.players.values()),
        });
        setScreen('win');
      } else if (s.roomId && s.phase === GamePhase.LOBBY) {
        setScreen('room');
      }
    });

    // Handle escape key for volume controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowVolumeControls(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsub();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCreateRoom = async () => {
    if (!playerName.trim()) return;
    setLoading(true);
    setCreateError(null);
    gameState.setLoading(true, 'Creating room...', 30);
    try {
      const id = await gameState.createRoom(roomName || `Room_${Math.random().toString(36).slice(2, 6)}`);
      if (id) {
        gameState.setLoading(true, 'Joining room...', 70);
        gameState.joinRoom(id, playerName);
      } else {
        setCreateError('Could not create room. Is the server running?');
        gameState.setLoading(false);
      }
    } catch (err) {
      console.error('handleCreateRoom error:', err);
      setCreateError('Unexpected error. Please try again.');
      gameState.setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    if (!playerName.trim()) return;
    gameState.setLoading(true, 'Joining room...', 50);
    gameState.joinRoom(roomId, playerName);
  };

  const handleStartGame = () => {
    if (gs.roomId) {
      gameState.setLoading(true, 'Starting game...', 90);
      gameState.startGame(gs.roomId);
    }
  };

  const handleRefreshRooms = () => {
    gameState.fetchRooms();
  };

  const goToTitle = () => {
    setScreen('title');
    gameState.disconnect();
    // Reconnect for next game
    setTimeout(() => gameState.connect(), 500);
  };

  const handleReconnect = () => {
    gameState.reconnect();
  };

  // Show loading screen during connection/loading states
  if (gs.isLoading) {
    return (
      <LoadingScreen
        progress={gs.loadingProgress}
        message={gs.loadingMessage}
      />
    );
  }

  // === SCREENS ===

  if (screen === 'game') {
    return (
      <>
        <Game />
        <ConnectionStatus
          state={gs.connectionState}
          latency={gs.latency}
          onReconnect={handleReconnect}
          showDetails={false}
        />
        {showVolumeControls && (
          <VolumeControls
            isOpen={showVolumeControls}
            onClose={() => setShowVolumeControls(false)}
          />
        )}
      </>
    );
  }

  if (screen === 'gameover' && gameResult) {
    return (
      <GameOverScreen
        pagesCollected={gameResult.pagesCollected}
        totalPages={gameResult.totalPages}
        duration={gameResult.duration}
        players={gameResult.players}
        killedBy="monster"
        onPlayAgain={goToTitle}
        onMainMenu={goToTitle}
      />
    );
  }

  if (screen === 'win' && gameResult) {
    return (
      <VictoryScreen
        pagesCollected={gameResult.pagesCollected}
        totalPages={gameResult.totalPages}
        duration={gameResult.duration}
        players={gameResult.players}
        onPlayAgain={goToTitle}
        onMainMenu={goToTitle}
      />
    );
  }

  if (screen === 'room' && gs.roomId) {
    const myPlayerId = gs.playerId;
    const isHost = gs.players.size > 0 &&
      Array.from(gs.players.keys())[0] === myPlayerId;

    // Convert players Map to expected format
    const room: GameRoom = {
      id: gs.roomId,
      name: gs.roomName || 'Unknown Room',
      players: Array.from(gs.players.keys()),
      maxPlayers: 4,
      phase: GamePhase.LOBBY,
      pages: [],
      puzzles: [],
      monster: {
        position: { x: 0, y: 0, z: 0 },
        rotation: 0,
        state: 'idle' as any,
        teleporting: false,
        speed: 0,
        visibleToPlayers: [],
      },
      pagesCollected: 0,
      totalPages: gs.totalPages,
      ambientEventTimer: 0,
    };

    return (
      <HorrorScreen>
        <EnhancedLobby
          room={room}
          players={gs.players}
          myPlayerId={gs.playerId}
          onStartGame={handleStartGame}
          onLeaveRoom={goToTitle}
          isHost={isHost}
        />
        <ConnectionStatus
          state={gs.connectionState}
          latency={gs.latency}
          onReconnect={handleReconnect}
        />
        {gs.connectionError && (
          <ErrorMessage
            type="connection_lost"
            message={gs.connectionError}
            onRetry={handleReconnect}
            onDismiss={() => {}}
          />
        )}
      </HorrorScreen>
    );
  }

  if (screen === 'lobby') {
    return (
      <HorrorScreen>
        <div style={{ width: '500px' }}>
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
              disabled={!playerName.trim() || loading || gs.connectionState !== 'connected'}
              style={{ ...horrorButtonStyle, width: '100%', opacity: (playerName.trim() && gs.connectionState === 'connected') ? 1 : 0.4 }}
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
                      disabled={!playerName.trim() || gs.connectionState !== 'connected'}
                      style={{
                        ...horrorButtonStyle,
                        padding: '8px 16px',
                        fontSize: '10px',
                        opacity: (playerName.trim() && gs.connectionState === 'connected') ? 1 : 0.4,
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
        
        <ConnectionStatus
          state={gs.connectionState}
          latency={gs.latency}
          onReconnect={handleReconnect}
        />
      </HorrorScreen>
    );
  }

  // Title screen
  return (
    <HorrorScreen>
      <TitleScreen onPlay={() => setScreen('lobby')} onShowTutorial={() => setShowTutorial(true)} />
      
      {showTutorial && (
        <Tutorial onClose={() => setShowTutorial(false)} />
      )}
      
      <ConnectionStatus
        state={gs.connectionState}
        latency={gs.latency}
        onReconnect={handleReconnect}
      />
    </HorrorScreen>
  );
};

// Title Screen Component
const TitleScreen: React.FC<{ onPlay: () => void; onShowTutorial: () => void }> = ({ onPlay, onShowTutorial }) => {
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
        
        <div style={{ marginTop: '16px' }}>
          <button 
            onClick={onShowTutorial}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.4)',
              padding: '10px 24px',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              borderRadius: '3px',
              fontFamily: 'Courier New, monospace',
            }}
          >
            HOW TO PLAY
          </button>
        </div>

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
