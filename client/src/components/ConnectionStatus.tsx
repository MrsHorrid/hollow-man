/** ConnectionStatus.tsx - Real-time connection status indicator */
import React, { useState, useEffect } from 'react';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'reconnecting' | 'error';

interface ConnectionStatusProps {
  state: ConnectionState;
  latency?: number;
  onReconnect?: () => void;
  showDetails?: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  state,
  latency = 0,
  onReconnect,
  showDetails = true,
}) => {
  const [visible, setVisible] = useState(true);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Pulse animation for warning states
    if (state === 'connecting' || state === 'reconnecting') {
      const interval = setInterval(() => setPulse(p => !p), 500);
      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    // Auto-hide when connected after a delay
    if (state === 'connected') {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [state]);

  const getStatusConfig = () => {
    switch (state) {
      case 'connected':
        return {
          icon: '●',
          color: '#44ff44',
          bgColor: 'rgba(0, 100, 0, 0.2)',
          text: 'CONNECTED',
          pulse: false,
        };
      case 'connecting':
        return {
          icon: '◐',
          color: '#ffaa00',
          bgColor: 'rgba(100, 80, 0, 0.2)',
          text: 'CONNECTING...',
          pulse: true,
        };
      case 'reconnecting':
        return {
          icon: '↻',
          color: '#ff8800',
          bgColor: 'rgba(100, 60, 0, 0.3)',
          text: 'RECONNECTING...',
          pulse: true,
        };
      case 'disconnected':
        return {
          icon: '✕',
          color: '#ff4444',
          bgColor: 'rgba(100, 0, 0, 0.3)',
          text: 'DISCONNECTED',
          pulse: false,
        };
      case 'error':
        return {
          icon: '⚠',
          color: '#ff0000',
          bgColor: 'rgba(100, 0, 0, 0.4)',
          text: 'CONNECTION ERROR',
          pulse: false,
        };
      default:
        return {
          icon: '?',
          color: '#888888',
          bgColor: 'rgba(50, 50, 50, 0.2)',
          text: 'UNKNOWN',
          pulse: false,
        };
    }
  };

  const config = getStatusConfig();
  const displayLatency = latency > 0 ? `${latency}ms` : '--';

  return (
    <div
      style={{
        ...containerStyle,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-10px)',
      }}
      onMouseEnter={() => setVisible(true)}
    >
      <div
        style={{
          ...statusStyle,
          background: config.bgColor,
          borderColor: config.color,
          boxShadow: pulse ? `0 0 15px ${config.color}40` : 'none',
        }}
      >
        <span
          style={{
            ...iconStyle,
            color: config.color,
            animation: config.pulse ? 'statusPulse 0.5s ease-in-out infinite' : 'none',
          }}
        >
          {config.icon}
        </span>
        <span style={{ ...textStyle, color: config.color }}>{config.text}</span>
        
        {showDetails && state === 'connected' && (
          <span style={latencyStyle}>
            {displayLatency}
          </span>
        )}
      </div>

      {(state === 'disconnected' || state === 'error') && onReconnect && (
        <button
          onClick={onReconnect}
          style={reconnectButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(150, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(100, 0, 0, 0.3)';
          }}
        >
          RETRY CONNECTION
        </button>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  transition: 'all 0.3s ease-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
};

const statusStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid',
  fontFamily: 'Courier New, monospace',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.3s',
};

const iconStyle: React.CSSProperties = {
  fontSize: '12px',
};

const textStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '2px',
  fontWeight: 'bold',
};

const latencyStyle: React.CSSProperties = {
  fontSize: '10px',
  color: 'rgba(255,255,255,0.5)',
  marginLeft: '8px',
  paddingLeft: '8px',
  borderLeft: '1px solid rgba(255,255,255,0.2)',
};

const reconnectButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.3)',
  border: '1px solid rgba(255, 50, 50, 0.5)',
  color: '#ff4444',
  padding: '8px 16px',
  fontSize: '10px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes statusPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
}

export default ConnectionStatus;
