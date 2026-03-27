/** VictoryScreen.tsx - Animated victory screen */
import React, { useEffect, useState } from 'react';
import { Player } from '@shared/types/player';

interface VictoryScreenProps {
  pagesCollected: number;
  totalPages: number;
  duration: number; // ms
  players: Player[];
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  pagesCollected,
  totalPages,
  duration,
  players,
  onPlayAgain,
  onMainMenu,
}) => {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [statsRevealed, setStatsRevealed] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setVisible(true), 100);
    
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);

    // Reveal stats
    const statsTimer = setTimeout(() => setStatsRevealed(true), 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const alivePlayers = players.filter(p => p.isAlive);
  const sortedPlayers = [...players].sort((a, b) => b.pagesCollected - a.pagesCollected);

  return (
    <div style={containerStyle}>
      {/* Animated background particles */}
      <div style={particlesContainerStyle}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              ...particleStyle,
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Light rays */}
      <div style={lightRaysStyle} />

      {/* Main content */}
      <div
        style={{
          ...contentStyle,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        {/* Victory icon */}
        <div style={iconContainerStyle}>
          <div style={glowRingStyle} />
          <div style={victoryIconStyle}>📄</div>
        </div>

        {/* Title */}
        <h1 style={titleStyle}>ESCAPE SUCCESSFUL</h1>

        {/* Subtitle */}
        <p style={subtitleStyle}>
          You survived the night and collected all {totalPages} pages.
        </p>

        {/* Stats */}
        <div
          style={{
            ...statsContainerStyle,
            opacity: statsRevealed ? 1 : 0,
            transform: statsRevealed ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{formatDuration(duration)}</div>
            <div style={statLabelStyle}>TIME SURVIVED</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{alivePlayers.length}/{players.length}</div>
            <div style={statLabelStyle}>SURVIVORS</div>
          </div>
          <div style={statBoxStyle}>
            <div style={statValueStyle}>{pagesCollected}</div>
            <div style={statLabelStyle}>PAGES FOUND</div>
          </div>
        </div>

        {/* Player rankings */}
        <div
          style={{
            ...rankingsContainerStyle,
            opacity: statsRevealed ? 1 : 0,
            transform: statsRevealed ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.2s',
          }}
        >
          <h3 style={rankingsTitleStyle}>SURVIVOR RANKINGS</h3>
          <div style={rankingsListStyle}>
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                style={{
                  ...rankingItemStyle,
                  borderColor: player.isAlive ? 'rgba(68, 255, 68, 0.3)' : 'rgba(255, 68, 68, 0.3)',
                  background: player.isAlive ? 'rgba(0, 50, 0, 0.2)' : 'rgba(50, 0, 0, 0.2)',
                }}
              >
                <span style={rankNumberStyle}>#{index + 1}</span>
                <span style={rankNameStyle}>{player.name}</span>
                <span style={rankPagesStyle}>{player.pagesCollected} pages</span>
                <span style={{
                  ...rankStatusStyle,
                  color: player.isAlive ? '#44ff44' : '#ff4444',
                }}>
                  {player.isAlive ? 'SURVIVED' : 'DECEASED'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={buttonsContainerStyle}>
          <button onClick={onPlayAgain} style={playAgainButtonStyle}>
            PLAY AGAIN
          </button>
          <button onClick={onMainMenu} style={mainMenuButtonStyle}>
            MAIN MENU
          </button>
        </div>

        {/* Flavor text */}
        <p style={flavorTextStyle}>
          The forest remembers... but you have escaped its grasp. For now.
        </p>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'linear-gradient(180deg, #0a1a0a 0%, #000000 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  overflow: 'hidden',
};

const particlesContainerStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
};

const particleStyle: React.CSSProperties = {
  position: 'absolute',
  width: '2px',
  height: '2px',
  background: '#44ff44',
  borderRadius: '50%',
  boxShadow: '0 0 10px #44ff44',
  animation: 'floatUp 10s linear infinite',
  opacity: 0,
};

const lightRaysStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '200%',
  height: '60%',
  background: 'radial-gradient(ellipse at top, rgba(68, 255, 68, 0.1) 0%, transparent 60%)',
  pointerEvents: 'none',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  textAlign: 'center',
  maxWidth: '600px',
  padding: '40px',
  transition: 'all 0.8s ease-out',
};

const iconContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
};

const glowRingStyle: React.CSSProperties = {
  position: 'absolute',
  width: '120px',
  height: '120px',
  border: '2px solid rgba(68, 255, 68, 0.3)',
  borderRadius: '50%',
  animation: 'pulseRing 2s ease-out infinite',
};

const victoryIconStyle: React.CSSProperties = {
  fontSize: '64px',
  position: 'relative',
  zIndex: 1,
  filter: 'drop-shadow(0 0 20px rgba(68, 255, 68, 0.5))',
};

const titleStyle: React.CSSProperties = {
  fontSize: '42px',
  letterSpacing: '8px',
  color: '#44ff44',
  textShadow: '0 0 30px rgba(68, 255, 68, 0.5)',
  marginBottom: '16px',
  fontFamily: 'Courier New, monospace',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '14px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.5)',
  marginBottom: '40px',
};

const statsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '40px',
  transition: 'all 0.6s ease-out 0.3s',
};

const statBoxStyle: React.CSSProperties = {
  textAlign: 'center',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#44ff44',
  textShadow: '0 0 10px rgba(68, 255, 68, 0.3)',
  fontFamily: 'Courier New, monospace',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '3px',
  color: 'rgba(255, 255, 255, 0.4)',
  marginTop: '4px',
};

const rankingsContainerStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(68, 255, 68, 0.2)',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '40px',
  transition: 'all 0.6s ease-out',
};

const rankingsTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '3px',
  color: '#44ff44',
  marginBottom: '16px',
};

const rankingsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const rankingItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 16px',
  borderRadius: '4px',
  border: '1px solid',
};

const rankNumberStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'rgba(255, 255, 255, 0.3)',
  minWidth: '30px',
};

const rankNameStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'left',
};

const rankPagesStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.4)',
};

const rankStatusStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '1px',
  fontWeight: 'bold',
};

const buttonsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '30px',
};

const playAgainButtonStyle: React.CSSProperties = {
  background: 'rgba(0, 100, 0, 0.4)',
  border: '1px solid rgba(68, 255, 68, 0.5)',
  color: '#44ff44',
  padding: '16px 40px',
  fontSize: '14px',
  letterSpacing: '3px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
  boxShadow: '0 0 20px rgba(68, 255, 68, 0.2)',
};

const mainMenuButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 100, 100, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.6)',
  padding: '16px 40px',
  fontSize: '14px',
  letterSpacing: '3px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const flavorTextStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.2)',
  fontStyle: 'italic',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        bottom: -10px;
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        bottom: 100%;
        opacity: 0;
      }
    }
    
    @keyframes pulseRing {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

export default VictoryScreen;
