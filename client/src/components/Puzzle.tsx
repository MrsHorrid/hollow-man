import React, { useState, useEffect } from 'react';
import { Puzzle as PuzzleType } from '@shared/types/game';
import { gameState } from '../engine/GameState';

interface PuzzleModalProps {
  puzzle: PuzzleType | null;
  onClose: () => void;
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({ puzzle, onClose }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!puzzle) {
      setCode('');
      setMessage(null);
    }
  }, [puzzle]);

  if (!puzzle) return null;

  const handleInteract = () => {
    if (puzzle.type === 'code') {
      gameState.sendPuzzleInteract(puzzle.id, code);
    } else {
      gameState.sendPuzzleInteract(puzzle.id);
    }

    // Listen for result
    const socket = gameState.getSocket();
    if (socket) {
      socket.once('puzzle_result', (result: { success: boolean; message: string }) => {
        setMessage(result.message);
        if (!result.success) {
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        } else {
          setTimeout(() => onClose(), 1500);
        }
      });
    }
  };

  const getPuzzleIcon = () => {
    switch (puzzle.type) {
      case 'switch': return '⚡';
      case 'code': return '🔢';
      case 'lever': return '🔧';
      case 'pressure_plate': return '👥';
      default: return '❓';
    }
  };

  const getPuzzleTitle = () => {
    switch (puzzle.type) {
      case 'switch': return 'ELECTRICAL SWITCH';
      case 'code': return 'ACCESS TERMINAL';
      case 'lever': return 'MECHANISM';
      case 'pressure_plate': return 'PRESSURE PLATE';
      default: return 'PUZZLE';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500,
        fontFamily: 'Courier New, monospace',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          background: 'rgba(10,10,15,0.95)',
          border: '1px solid rgba(255,50,50,0.3)',
          borderRadius: '4px',
          padding: '32px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 0 40px rgba(255,0,0,0.2)',
          animation: shaking ? 'shake 0.5s' : 'none',
        }}
      >
        <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '8px' }}>
          {getPuzzleIcon()}
        </div>
        
        <h2 style={{
          color: '#cc2222',
          fontSize: '14px',
          letterSpacing: '4px',
          textAlign: 'center',
          marginBottom: '4px',
          textShadow: '0 0 10px rgba(200,0,0,0.5)',
        }}>
          {getPuzzleTitle()}
        </h2>

        {puzzle.solved ? (
          <div style={{ textAlign: 'center', color: '#44ff44', marginTop: '16px', letterSpacing: '2px' }}>
            ✓ SOLVED
          </div>
        ) : (
          <>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              letterSpacing: '1px',
              textAlign: 'center',
              margin: '16px 0',
            }}>
              {puzzle.rewardDescription}
            </p>

            {puzzle.requiresPlayers > 1 && (
              <div style={{
                background: 'rgba(255,150,0,0.1)',
                border: '1px solid rgba(255,150,0,0.3)',
                borderRadius: '3px',
                padding: '8px 12px',
                marginBottom: '16px',
                fontSize: '11px',
                color: 'rgba(255,150,0,0.8)',
                letterSpacing: '1px',
                textAlign: 'center',
              }}>
                ⚠ REQUIRES {puzzle.requiresPlayers} PLAYERS<br />
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {puzzle.activatedBy.length}/{puzzle.requiresPlayers} present
                </span>
              </div>
            )}

            {puzzle.type === 'code' && (
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.slice(0, 4))}
                  placeholder="_ _ _ _"
                  maxLength={4}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,50,50,0.4)',
                    color: '#ff4444',
                    fontSize: '24px',
                    padding: '12px',
                    letterSpacing: '16px',
                    textAlign: 'center',
                    fontFamily: 'Courier New',
                    borderRadius: '3px',
                    outline: 'none',
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleInteract();
                    if (e.key === 'Escape') onClose();
                  }}
                  autoFocus
                />
              </div>
            )}

            {message && (
              <div style={{
                padding: '8px',
                marginBottom: '12px',
                textAlign: 'center',
                fontSize: '11px',
                letterSpacing: '1px',
                color: message.includes('REWARD') || message.includes('SUCCESS') 
                  ? '#44ff44' 
                  : '#ff4444',
                borderTop: '1px solid rgba(255,50,50,0.2)',
                paddingTop: '12px',
              }}>
                {message}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleInteract}
                style={{
                  flex: 1,
                  background: 'rgba(150,0,0,0.3)',
                  border: '1px solid rgba(255,50,50,0.5)',
                  color: '#ff6666',
                  padding: '12px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  fontFamily: 'Courier New',
                  borderRadius: '3px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,0,0,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(150,0,0,0.3)')}
              >
                ACTIVATE
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(30,30,40,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  fontFamily: 'Courier New',
                  borderRadius: '3px',
                }}
              >
                [ESC]
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};
