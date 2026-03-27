import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ForestScene } from '../scenes/ForestScene';
import { gameState, LocalGameState } from '../engine/GameState';
import { soundManager } from '../engine/SoundManager';
import { Jumpscare } from './Jumpscare';
import { PuzzleModal } from './Puzzle';
import { VoiceChat } from './VoiceChat';
import { GamePhase, JumpscareEvent, SocketEvents, Puzzle } from '@shared/types/game';
import * as THREE from 'three';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ForestScene | null>(null);
  const animFrameRef = useRef<number>(0);
  const [state, setState] = useState<LocalGameState>(gameState.getState());
  const [jumpscare, setJumpscare] = useState<JumpscareEvent | null>(null);
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);
  const [interactionPrompt, setInteractionPrompt] = useState<string | null>(null);
  const [screenShakeActive, setScreenShakeActive] = useState(false);
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const unsub = gameState.subscribe(newState => {
      setState(newState);
    });
    return unsub;
  }, []);

  // Listen for jumpscare events from socket
  useEffect(() => {
    const socket = gameState.getSocket();
    if (!socket) return;

    socket.on(SocketEvents.JUMPSCARE, (event: JumpscareEvent) => {
      setJumpscare(event);
      setScreenShakeActive(true);
      sceneRef.current?.applyScreenShake(event.intensity);

      // Sound based on jumpscare type
      if (event.type === 'monster_close') {
        soundManager.onMonsterSpotted();
      } else if (event.type === 'puzzle_fail') {
        soundManager.playSfx('sanity_drain', { volume: 0.7 });
      } else {
        soundManager.playSfx('sanity_drain', { volume: event.intensity * 0.5 });
      }
    });

    socket.on(SocketEvents.AMBIENT_EVENT, (event: any) => {
      if (event.type === 'whisper') {
        soundManager.playSfx('sanity_drain', { volume: 0.3 });
      }
    });

    socket.on(SocketEvents.PLAYER_SCREAMED, (data: any) => {
      const vol = Math.max(0.1, 1 - data.distance / 20);
      soundManager.playSfx('monster_scream', { volume: vol * 0.6 });
    });

    socket.on(SocketEvents.GAME_OVER, () => {
      soundManager.onPlayerDeath();
    });

    return () => {
      socket.off(SocketEvents.JUMPSCARE);
      socket.off(SocketEvents.AMBIENT_EVENT);
      socket.off(SocketEvents.PLAYER_SCREAMED);
      socket.off(SocketEvents.GAME_OVER);
    };
  }, [state.isConnected]);

  // Initialize 3D scene when game starts
  useEffect(() => {
    if (state.phase !== GamePhase.PLAYING || !canvasRef.current) return;
    if (sceneRef.current) return;

    // Init sound (async but fire-and-forget is fine)
    soundManager.init();

    const scene = new ForestScene(canvasRef.current);
    sceneRef.current = scene;

    scene.setupPages(state.pages);
    scene.setupPuzzles(state.puzzles);

    // Wire up callbacks
    scene.onMove = (pos: THREE.Vector3, yaw: number, pitch: number, sprint: boolean) => {
      gameState.sendPlayerMove({ x: pos.x, y: pos.y, z: pos.z }, yaw, pitch, sprint);
      soundManager.setListenerPosition(
        { x: pos.x, y: pos.y, z: pos.z },
        { x: Math.sin(yaw), y: 0, z: Math.cos(yaw) }
      );
    };

    scene.onCollectPage = (pageId: string) => {
      gameState.sendCollectPage(pageId);
      scene.markPageCollected(pageId);
      soundManager.onPageCollected();
    };

    scene.onPuzzleInteract = (puzzleId: string) => {
      const puzzle = state.puzzles.find(p => p.id === puzzleId);
      if (puzzle && !puzzle.solved) {
        setActivePuzzle(puzzle);
      }
    };

    scene.onLookingAtMonster = (looking: boolean) => {
      gameState.sendLookingAtMonster(looking);
    };

    scene.onFootstep = () => {
      soundManager.playFootstep('grass');
    };

    // Start render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const gs = gameState.getState();

      if (gs.monster) {
        scene.updateMonster(gs.monster);

        // Monster proximity audio
        const monsterDist = gs.monsterDistance;
        if (monsterDist < 30) {
          const intensity = 1 - monsterDist / 30;
          soundManager.setMonsterProximity(intensity);
          soundManager.updateMonsterPosition({
            x: gs.monster.position.x,
            y: 0,
            z: gs.monster.position.z,
          });

          // Heartbeat when monster is very close
          if (monsterDist < 15 && heartbeatTimerRef.current === null) {
            soundManager.startHeartbeatAmbient();
            heartbeatTimerRef.current = setInterval(() => {
              const d = gameState.getState().monsterDistance;
              if (d > 20) {
                soundManager.stopHeartbeatAmbient();
                if (heartbeatTimerRef.current) {
                  clearInterval(heartbeatTimerRef.current);
                  heartbeatTimerRef.current = null;
                }
              }
            }, 2000);
          }
        } else {
          if (heartbeatTimerRef.current) {
            clearInterval(heartbeatTimerRef.current);
            heartbeatTimerRef.current = null;
            soundManager.stopHeartbeatAmbient();
          }
          soundManager.setMonsterProximity(0);
        }
      }

      const myPlayer = gs.myPlayer;
      const prompt = scene.update(myPlayer);
      setInteractionPrompt(prompt);

      if (gs.players && gs.playerId) {
        scene.updateOtherPlayers(gs.players, gs.playerId);
      }
    };

    animate();

    const onResize = () => scene.onResize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      scene.destroy();
      sceneRef.current = null;
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
    };
  }, [state.phase]);

  // Update pages/puzzles when they change
  useEffect(() => {
    if (!sceneRef.current || state.phase !== GamePhase.PLAYING) return;

    state.pages.forEach(page => {
      if (page.collected) {
        sceneRef.current?.markPageCollected(page.id);
      }
    });

    state.puzzles.forEach(puzzle => {
      sceneRef.current?.updatePuzzle(puzzle.id, puzzle.solved);
      if (activePuzzle?.id === puzzle.id) {
        setActivePuzzle(puzzle);
      }
    });
  }, [state.pages, state.puzzles]);

  const handleJumpscareComplete = useCallback(() => {
    setJumpscare(null);
    setScreenShakeActive(false);
  }, []);

  const getMonsterDistanceColor = () => {
    const d = state.monsterDistance;
    if (d < 10) return '#ff0000';
    if (d < 20) return '#ff6600';
    if (d < 35) return '#ffaa00';
    return 'transparent';
  };

  if (state.phase !== GamePhase.PLAYING) return null;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          filter: screenShakeActive ? 'contrast(1.2) saturate(0.8)' : 'none',
        }}
      />

      {/* Vignette */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
        zIndex: 50,
      }} />

      {/* Monster proximity ring */}
      <div style={{
        position: 'fixed',
        inset: 0,
        border: `3px solid ${getMonsterDistanceColor()}`,
        pointerEvents: 'none',
        zIndex: 51,
        opacity: state.monsterDistance < 35 ? 0.5 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Crosshair */}
      <div className="crosshair" />

      {/* HUD - Pages */}
      <div className="hud hud-top">
        <div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', letterSpacing: '2px' }}>
            PAGES: {state.pagesCollected} / {state.totalPages}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {Array.from({ length: state.totalPages }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '10px',
                  height: '10px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '50%',
                  background: i < state.pagesCollected ? 'white' : 'transparent',
                  boxShadow: i < state.pagesCollected ? '0 0 5px white' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Player list */}
      <div className="player-list">
        {Array.from(state.players.values()).map(p => (
          <div
            key={p.id}
            className={`player-item ${!p.isAlive ? 'player-dead' : ''}`}
          >
            <div className="player-color-dot" style={{ background: p.color }} />
            <span style={{ fontSize: '11px', letterSpacing: '1px' }}>
              {p.name.slice(0, 10)} ({p.pagesCollected})
            </span>
            {!p.isAlive && <span style={{ color: '#ff4444', fontSize: '10px' }}>✗</span>}
          </div>
        ))}
      </div>

      {/* Stamina bar */}
      {state.myPlayer && (
        <div className="stamina-bar-container">
          <div className="stamina-label">STAMINA</div>
          <div className="stamina-bar">
            <div className="stamina-fill" style={{ width: `${state.myPlayer.stamina}%` }} />
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div style={{
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        fontSize: '9px',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '1px',
        textAlign: 'right',
        lineHeight: '1.6',
        pointerEvents: 'none',
        zIndex: 100,
      }}>
        WASD — MOVE | SHIFT — SPRINT<br />
        F — FLASHLIGHT | E — INTERACT<br />
        CLICK — CAPTURE MOUSE
      </div>

      {/* Interaction prompt */}
      {interactionPrompt && (
        <div className="interaction-prompt">
          {interactionPrompt}
        </div>
      )}

      {/* Jumpscare overlay */}
      <Jumpscare event={jumpscare} onComplete={handleJumpscareComplete} />

      {/* Puzzle modal */}
      <PuzzleModal puzzle={activePuzzle} onClose={() => setActivePuzzle(null)} />

      {/* Voice chat */}
      <VoiceChat myPlayerId={state.playerId} />
    </div>
  );
};
