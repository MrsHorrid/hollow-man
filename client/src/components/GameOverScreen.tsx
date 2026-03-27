/** GameOverScreen.tsx - Enhanced game over screen with death animation */
import React, { useEffect, useState } from 'react';
import { Player } from '@shared/types/player';

interface GameOverScreenProps {
  pagesCollected: number;
  totalPages: number;
  duration: number;
  players: Player[];
  killedBy?: 'monster' | 'trap' | 'environment';
  onSpectate?: () => void;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  pagesCollected,
  totalPages,
  duration,
  players,
  killedBy = 'monster',
  onSpectate,
  onPlayAgain,
  onMainMenu,
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [glitchText, setGlitchText] = useState(false);
  const [bloodOpacity, setBloodOpacity] = useState(0);

  useEffect(() => {
    // Animation phases
    const phases = [0, 1, 2, 3];
    let currentPhase = 0;

    const interval = setInterval(() => {
      if (currentPhase < phases.length - 1) {
        currentPhase++;
        setAnimationPhase(currentPhase);
      }
    }, 800);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 2000);

    // Blood fade in
    const bloodTimer = setTimeout(() => {
      let opacity = 0;
      const fadeIn = () => {
        opacity += 0.02;
        setBloodOpacity(opacity);
        if (opacity < 0.6) {
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
      clearTimeout(bloodTimer);
    };
  }, []);

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDeathMessage = () => {
    switch (killedBy) {
      case 'monster':
        return 'IT FOUND YOU';
      case 'trap':
        return 'THE FOREST CLAIMED YOU';
      case 'environment':
        return 'LOST TO THE DARKNESS';
      default:
        return 'YOU DIED';
    }
  };

  const getDeathDescription = () => {
    switch (killedBy) {
      case 'monster':
        return 'The Hollow Man caught you. Your screams echo through the forest...';
      case 'trap':
        return 'A hidden danger ended your journey. The forest has many secrets.';
      case 'environment':
        return 'The darkness consumed you. Some who enter never leave.';
      default:
        return 'Your light has been extinguished.';
    }
  };

  const alivePlayers = players.filter(p => p.isAlive);
  const deadPlayers = players.filter(p => !p.isAlive);

  return (
    <div style={containerStyle}>
      {/* Blood overlay */}
      <div
        style={{
          ...bloodOverlayStyle,
          opacity: bloodOpacity,
        }}
      />

      {/* Static noise */}
      <div style={staticOverlayStyle} />

      {/* Red vignette */}
      <div style={vignetteStyle} />

      {/* Main content */}
      <div style={contentStyle}>
        {/* Skull icon with animation */}
        <div
          style={{
            ...iconContainerStyle,
            transform: animationPhase >= 1 ? 'scale(1)' : 'scale(0)',
            opacity: animationPhase >= 1 ? 1 : 0,
          }}
        >
          <div style={skullGlowStyle} />
          <div
            style={{
              ...skullStyle,
              filter: glitchText ? 'hue-rotate(90deg) saturate(2)' : 'none',
            }}
          >
            💀
          </div>
        </div>

        {/* Death message */}
        <h1
          style={{
            ...titleStyle,
            transform: animationPhase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            opacity: animationPhase >= 2 ? 1 : 0,
            textShadow: glitchText
              ? '3px 0 #ff0000, -3px 0 #0000ff, 0 0 30px rgba(255,0,0,0.8)'
              : '0 0 30px rgba(255,0,0,0.5)',
            color: glitchText ? '#ff0000' : '#cc0000',
          }}
        >
          {getDeathMessage()}
        </h1>

        {/* Description */}
        <p
          style={{
            ...descriptionStyle,
            opacity: animationPhase >= 2 ? 0.7 : 0,
          }}
        >
          {getDeathDescription()}
        </p>

        {/* Stats */}
        <div
          style={{
            ...statsContainerStyle,
            opacity: animationPhase >= 3 ? 1 : 0,
            transform: animationPhase >= 3 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{formatDuration(duration)}</div>
            <div style={statLabelStyle}>TIME SURVIVED</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{pagesCollected}/{totalPages}</div>
            <div style={statLabelStyle}>PAGES COLLECTED</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{alivePlayers.length}</div>
            <div style={statLabelStyle}>STILL ALIVE</div>
          </div>
        </div>

        {/* Survivor list */}
        {alivePlayers.length > 0 && (
          <div
            style={{
              ...survivorsContainerStyle,
              opacity: animationPhase >= 3 ? 1 : 0,
            }}
          >
            <h3 style={survivorsTitleStyle}>THEY STILL HUNT</h3>
            <div style={survivorsListStyle}>
              {alivePlayers.map(player => (
                <div key={player.id} style={survivorItemStyle}>
                  <div
                    style={{
                      ...survivorColorStyle,
                      background: player.color,
                      boxShadow: `0 0 10px ${player.color}`,
                    }}
                  />
                  <span style={survivorNameStyle}>{player.name}</span>
                  <span style={survivorPagesStyle}>{player.pagesCollected} pages</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            ...buttonsContainerStyle,
            opacity: animationPhase >= 3 ? 1 : 0,
          }}
        >
          {onSpectate && alivePlayers.length > 0 && (
            <button onClick={onSpectate} style={spectateButtonStyle}>
              👁 SPECTATE
            </button>
          )}
          <button onClick={onPlayAgain} style={playAgainButtonStyle}>
            TRY AGAIN
          </button>
          <button onClick={onMainMenu} style={mainMenuButtonStyle}>
            MAIN MENU
          </button>
        </div>

        {/* Final message */}
        <p style={finalMessageStyle}>
          The forest has claimed another soul.
        </p>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  overflow: 'hidden',
};

const bloodOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 Q60 30 50 50 Q40 70 50 100' stroke='%23660000' stroke-width='20' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  pointerEvents: 'none',
  mixBlendMode: 'multiply',
};

const staticOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.05,
  mixBlendMode: 'overlay',
  pointerEvents: 'none',
  animation: 'noiseMove 0.5s steps(4) infinite',
};

const vignetteStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 20%, rgba(100, 0, 0, 0.6) 100%)',
  pointerEvents: 'none',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  textAlign: 'center',
  maxWidth: '600px',
  padding: '40px',
};

const iconContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
  transition: 'all 0.5s ease-out',
};

const skullGlowStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100px',
  height: '100px',
  background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)',
  borderRadius: '50%',
  animation: 'skullPulse 2s ease-in-out infinite',
};

const skullStyle: React.CSSProperties = {
  fontSize: '64px',
  position: 'relative',
  zIndex: 1,
  transition: 'filter 0.1s',
};

const titleStyle: React.CSSProperties = {
  fontSize: '42px',
  letterSpacing: '8px',
  marginBottom: '16px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.5s ease-out',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '14px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.5)',
  marginBottom: '40px',
  transition: 'opacity 0.5s ease-out',
};

const statsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '40px',
  transition: 'all 0.6s ease-out 0.2s',
};

const statBoxStyle: React.CSSProperties = {
  textAlign: 'center',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ff4444',
  textShadow: '0 0 10px rgba(255, 68, 68, 0.3)',
  fontFamily: 'Courier New, monospace',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '3px',
  color: 'rgba(255, 255, 255, 0.4)',
  marginTop: '4px',
};

const survivorsContainerStyle: React.CSSProperties = {
  background: 'rgba(50, 0, 0, 0.3)',
  border: '1px solid rgba(255, 68, 68, 0.2)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  transition: 'opacity 0.6s ease-out 0.3s',
};

const survivorsTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '3px',
  color: '#ff4444',
  marginBottom: '12px',
};

const survivorsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const survivorItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 12px',
  background: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '4px',
};

const survivorColorStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
};

const survivorNameStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '13px',
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'left',
};

const survivorPagesStyle: React.CSSProperties = {
  fontSize: '11px',
  color: 'rgba(255, 255, 255, 0.4)',
};

const buttonsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  transition: 'opacity 0.6s ease-out 0.4s',
};

const spectateButtonStyle: React.CSSProperties = {
  background: 'rgba(0, 50, 100, 0.4)',
  border: '1px solid rgba(68, 136, 255, 0.5)',
  color: '#4488ff',
  padding: '14px 28px',
  fontSize: '12px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const playAgainButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.4)',
  border: '1px solid rgba(255, 68, 68, 0.5)',
  color: '#ff4444',
  padding: '14px 32px',
  fontSize: '12px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
  boxShadow: '0 0 20px rgba(255, 68, 68, 0.2)',
};

const mainMenuButtonStyle: React.CSSProperties = {
  background: 'rgba(50, 50, 50, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.5)',
  padding: '14px 32px',
  fontSize: '12px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const finalMessageStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.15)',
  marginTop: '30px',
  fontStyle: 'italic',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skullPulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    @keyframes noiseMove {
      0% { transform: translate(0, 0); }
      25% { transform: translate(-2px, 2px); }
      50% { transform: translate(2px, -2px); }
      75% { transform: translate(-2px, -2px); }
      100% { transform: translate(0, 0); }
    }
  `;
  document.head.appendChild(style);
}

export default GameOverScreen;
