/** EnhancedLobby.tsx - Improved room lobby with avatars and better UX */
import React, { useState, useEffect } from 'react';
import { Player } from '@shared/types/player';
import { GameRoom, GamePhase } from '@shared/types/game';

interface EnhancedLobbyProps {
  room: GameRoom;
  players: Map<string, Player>;
  myPlayerId: string | null;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onToggleReady?: () => void;
  isHost?: boolean;
}

// Avatar color schemes
const AVATAR_COLORS = [
  { bg: '#ff4444', glow: 'rgba(255, 68, 68, 0.5)' },
  { bg: '#44ff44', glow: 'rgba(68, 255, 68, 0.5)' },
  { bg: '#4444ff', glow: 'rgba(68, 68, 255, 0.5)' },
  { bg: '#ffff44', glow: 'rgba(255, 255, 68, 0.5)' },
  { bg: '#ff44ff', glow: 'rgba(255, 68, 255, 0.5)' },
  { bg: '#44ffff', glow: 'rgba(68, 255, 255, 0.5)' },
];

// Silhouette SVG paths for variety
const AVATAR_SILHOUETTES = [
  // Person 1 - standing
  'M50 20 C60 20 65 30 65 40 C65 48 62 52 58 55 L62 85 L55 85 L52 60 L48 60 L45 85 L38 85 L42 55 C38 52 35 48 35 40 C35 30 40 20 50 20 Z',
  // Person 2 - hooded
  'M50 18 C58 18 62 25 62 35 C62 40 60 45 56 48 L60 85 L40 85 L44 48 C40 45 38 40 38 35 C38 25 42 18 50 18 Z',
  // Person 3 - hat
  'M35 35 L65 35 L62 30 L38 30 Z M42 38 L40 85 L48 85 L50 55 L52 85 L60 85 L58 38 Z M50 18 C57 18 62 23 62 30 L38 30 C38 23 43 18 50 18 Z',
];

const PlayerAvatar: React.FC<{
  player: Player;
  index: number;
  isHost: boolean;
  isMe: boolean;
  isReady?: boolean;
}> = ({ player, index, isHost, isMe, isReady }) => {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const silhouette = AVATAR_SILHOUETTES[index % AVATAR_SILHOUETTES.length];
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isMe) {
      const interval = setInterval(() => setPulse(p => !p), 2000);
      return () => clearInterval(interval);
    }
  }, [isMe]);

  return (
    <div style={avatarCardStyle}>
      {/* Avatar */}
      <div style={avatarContainerStyle}>
        <svg
          viewBox="0 0 100 100"
          style={{
            ...avatarSvgStyle,
            filter: `drop-shadow(0 0 10px ${color.glow})`,
          }}
        >
          <defs>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color.bg} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color.bg} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="80" height="80" rx="10" fill={`url(#grad-${index})`} opacity="0.2" />
          <path d={silhouette} fill={color.bg} />
        </svg>
        
        {/* Ready indicator */}
        {isReady && (
          <div style={readyIndicatorStyle}>✓</div>
        )}
        
        {/* Host crown */}
        {isHost && (
          <div style={hostBadgeStyle}>👑</div>
        )}
        
        {/* Me indicator */}
        {isMe && (
          <div style={{
            ...meIndicatorStyle,
            boxShadow: pulse ? `0 0 15px ${color.glow}` : 'none',
          }}>
            YOU
          </div>
        )}
      </div>

      {/* Player info */}
      <div style={playerInfoStyle}>
        <div style={playerNameStyle} title={player.name}>
          {player.name.slice(0, 12)}{player.name.length > 12 && '...'}
        </div>
        <div style={playerStatsStyle}>
          <span style={statStyle}>📄 {player.pagesCollected}</span>
          {player.isAlive === false && <span style={deadStyle}>💀 DEAD</span>}
        </div>
      </div>
    </div>
  );
};

export const EnhancedLobby: React.FC<EnhancedLobbyProps> = ({
  room,
  players,
  myPlayerId,
  onStartGame,
  onLeaveRoom,
  onToggleReady,
  isHost,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const playerArray = Array.from(players.values());
  const emptySlots = room.maxPlayers - playerArray.length;

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      onStartGame();
      setCountdown(null);
    }
  }, [countdown, onStartGame]);

  const handleStartClick = () => {
    if (isHost) {
      setCountdown(5);
    }
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
  };

  return (
    <div style={lobbyContainerStyle}>
      {/* Room header */}
      <div style={headerStyle}>
        <div>
          <h1 style={roomNameStyle}>{room.name}</h1>
          <div style={roomInfoStyle}>
            {players.size}/{room.maxPlayers} PLAYERS • {GamePhase[room.phase as keyof typeof GamePhase] || 'LOBBY'}
          </div>
        </div>
        <button onClick={onLeaveRoom} style={leaveButtonStyle}>
          LEAVE
        </button>
      </div>

      {/* Players grid */}
      <div style={playersGridStyle}>
        {playerArray.map((player, index) => (
          <PlayerAvatar
            key={player.id}
            player={player}
            index={index}
            isHost={index === 0}
            isMe={player.id === myPlayerId}
          />
        ))}
        
        {/* Empty slots */}
        {Array.from({ length: emptySlots }, (_, i) => (
          <div key={`empty-${i}`} style={emptySlotStyle}>
            <div style={emptyAvatarStyle}>?</div>
            <div style={emptyTextStyle}>WAITING...</div>
          </div>
        ))}
      </div>

      {/* Room settings/info */}
      <div style={infoPanelStyle}>
        <h3 style={infoTitleStyle}>⚠ MISSION BRIEFING</h3>
        <ul style={infoListStyle}>
          <li>Collect all {room.totalPages} pages scattered through the forest</li>
          <li>Cooperative puzzles require multiple players to solve</li>
          <li>Stay together - it hunts those who are alone</li>
          <li>Use proximity voice chat to coordinate</li>
          <li>Your flashlight drains stamina - use it wisely</li>
        </ul>
      </div>

      {/* Controls */}
      <div style={controlsStyle}>
        {countdown !== null ? (
          <div style={countdownContainerStyle}>
            <div style={countdownNumberStyle}>{countdown}</div>
            <div style={countdownTextStyle}>STARTING SOON...</div>
            <button onClick={handleCancelCountdown} style={cancelButtonStyle}>
              CANCEL
            </button>
          </div>
        ) : isHost ? (
          <button
            onClick={handleStartClick}
            disabled={players.size < 1}
            style={{
              ...startButtonStyle,
              opacity: players.size < 1 ? 0.4 : 1,
              cursor: players.size < 1 ? 'not-allowed' : 'pointer',
            }}
          >
            BEGIN THE HUNT
          </button>
        ) : (
          <div style={waitingStyle}>
            <span style={waitingPulseStyle}>◉</span>
            WAITING FOR HOST...
          </div>
        )}
      </div>

      {/* Footer info */}
      <div style={footerStyle}>
        <span>Room ID: <code style={codeStyle}>{room.id.slice(0, 8)}</code></span>
        <span style={footerDividerStyle}>|</span>
        <span>Share this room with friends!</span>
      </div>
    </div>
  );
};

// Styles
const lobbyContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '700px',
  background: 'rgba(0, 0, 0, 0.8)',
  border: '1px solid rgba(255, 50, 50, 0.2)',
  borderRadius: '8px',
  padding: '30px',
  backdropFilter: 'blur(10px)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px',
  paddingBottom: '20px',
  borderBottom: '1px solid rgba(255, 50, 50, 0.1)',
};

const roomNameStyle: React.CSSProperties = {
  fontSize: '24px',
  letterSpacing: '4px',
  color: '#cc2222',
  textShadow: '0 0 10px rgba(200, 0, 0, 0.3)',
  marginBottom: '6px',
};

const roomInfoStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.4)',
};

const leaveButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.3)',
  border: '1px solid rgba(255, 50, 50, 0.3)',
  color: '#ff6666',
  padding: '8px 16px',
  fontSize: '10px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const playersGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '16px',
  marginBottom: '24px',
};

const avatarCardStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 50, 50, 0.15)',
  borderRadius: '6px',
  padding: '16px',
  textAlign: 'center',
  transition: 'all 0.2s',
};

const avatarContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '80px',
  height: '80px',
  margin: '0 auto 12px',
};

const avatarSvgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const readyIndicatorStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '24px',
  height: '24px',
  background: '#44ff44',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: '#000',
  boxShadow: '0 0 10px rgba(68, 255, 68, 0.5)',
};

const hostBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  fontSize: '16px',
  filter: 'drop-shadow(0 0 5px rgba(255, 200, 0, 0.5))',
};

const meIndicatorStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '-5px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(200, 50, 50, 0.8)',
  padding: '2px 8px',
  borderRadius: '3px',
  fontSize: '8px',
  letterSpacing: '1px',
  color: '#fff',
  transition: 'box-shadow 0.5s',
};

const playerInfoStyle: React.CSSProperties = {
  textAlign: 'center',
};

const playerNameStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '1px',
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '6px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const playerStatsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.4)',
};

const statStyle: React.CSSProperties = {
  letterSpacing: '1px',
};

const deadStyle: React.CSSProperties = {
  color: '#ff4444',
  letterSpacing: '1px',
};

const emptySlotStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.3)',
  border: '1px dashed rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  padding: '16px',
  textAlign: 'center',
  opacity: 0.5,
};

const emptyAvatarStyle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  margin: '0 auto 12px',
  border: '2px dashed rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  color: 'rgba(255, 255, 255, 0.3)',
};

const emptyTextStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.3)',
};

const infoPanelStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.1)',
  border: '1px solid rgba(255, 50, 50, 0.1)',
  borderRadius: '6px',
  padding: '20px',
  marginBottom: '24px',
};

const infoTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '3px',
  color: '#cc2222',
  marginBottom: '12px',
};

const infoListStyle: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '1.8',
  color: 'rgba(255, 255, 255, 0.5)',
  paddingLeft: '20px',
  margin: 0,
};

const controlsStyle: React.CSSProperties = {
  textAlign: 'center',
};

const countdownContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
};

const countdownNumberStyle: React.CSSProperties = {
  fontSize: '72px',
  fontWeight: 'bold',
  color: '#cc2222',
  textShadow: '0 0 30px rgba(200, 0, 0, 0.5)',
  animation: 'countdownPulse 1s ease-in-out infinite',
};

const countdownTextStyle: React.CSSProperties = {
  fontSize: '14px',
  letterSpacing: '4px',
  color: 'rgba(255, 255, 255, 0.5)',
};

const cancelButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.3)',
  border: '1px solid rgba(255, 50, 50, 0.5)',
  color: '#ff6666',
  padding: '10px 30px',
  fontSize: '11px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  marginTop: '10px',
};

const startButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.4)',
  border: '1px solid rgba(200, 0, 0, 0.5)',
  color: '#cc2222',
  padding: '16px 48px',
  fontSize: '14px',
  letterSpacing: '4px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
  boxShadow: '0 0 20px rgba(150, 0, 0, 0.2)',
};

const waitingStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '3px',
  color: 'rgba(255, 255, 255, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
};

const waitingPulseStyle: React.CSSProperties = {
  color: '#44ff44',
  animation: 'pulse 1.5s ease-in-out infinite',
};

const footerStyle: React.CSSProperties = {
  marginTop: '24px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 50, 50, 0.1)',
  fontSize: '10px',
  letterSpacing: '1px',
  color: 'rgba(255, 255, 255, 0.3)',
  textAlign: 'center',
};

const footerDividerStyle: React.CSSProperties = {
  margin: '0 10px',
};

const codeStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '2px 6px',
  borderRadius: '3px',
  fontFamily: 'monospace',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes countdownPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;
  document.head.appendChild(style);
}

export default EnhancedLobby;
