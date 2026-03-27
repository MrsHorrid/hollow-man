/** ErrorMessage.tsx - User-friendly error messages with retry logic */
import React, { useState, useEffect } from 'react';

export type ErrorType = 
  | 'connection_lost'
  | 'server_full'
  | 'room_not_found'
  | 'name_taken'
  | 'game_in_progress'
  | 'server_error'
  | 'network_timeout'
  | 'audio_init_failed'
  | 'webgl_unsupported'
  | 'generic';

interface ErrorMessageProps {
  type: ErrorType;
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  dismissAfter?: number;
}

interface ErrorConfig {
  title: string;
  description: string;
  icon: string;
  isRetryable: boolean;
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  connection_lost: {
    title: 'CONNECTION LOST',
    description: 'The forest grows quiet. The connection to the server was lost.',
    icon: '⚡',
    isRetryable: true,
  },
  server_full: {
    title: 'SERVER FULL',
    description: 'Too many wanderers in the forest. The server has reached capacity.',
    icon: '👥',
    isRetryable: true,
  },
  room_not_found: {
    title: 'ROOM NOT FOUND',
    description: 'That room has vanished into the fog, or never existed.',
    icon: '❓',
    isRetryable: false,
  },
  name_taken: {
    title: 'NAME IN USE',
    description: 'Another soul already bears that name. Choose another.',
    icon: '👤',
    isRetryable: false,
  },
  game_in_progress: {
    title: 'GAME IN PROGRESS',
    description: 'The hunt has already begun. You cannot join mid-game.',
    icon: '🔒',
    isRetryable: false,
  },
  server_error: {
    title: 'SERVER ERROR',
    description: 'Something terrible stirs in the depths. Please try again.',
    icon: '💀',
    isRetryable: true,
  },
  network_timeout: {
    title: 'TIMEOUT',
    description: 'The forest is silent... too silent. Connection timed out.',
    icon: '⏱️',
    isRetryable: true,
  },
  audio_init_failed: {
    title: 'AUDIO ERROR',
    description: 'Could not initialize audio. Check your device settings.',
    icon: '🔇',
    isRetryable: true,
  },
  webgl_unsupported: {
    title: 'BROWSER NOT SUPPORTED',
    description: 'Your browser cannot render the darkness. Please use Chrome, Firefox, or Edge.',
    icon: '🌐',
    isRetryable: false,
  },
  generic: {
    title: 'ERROR',
    description: 'An unknown error occurred. The forest works in mysterious ways.',
    icon: '⚠️',
    isRetryable: true,
  },
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type,
  message,
  onRetry,
  onDismiss,
  autoDismiss = false,
  dismissAfter = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const config = ERROR_CONFIGS[type];

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);

    // Auto dismiss
    if (autoDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, dismissAfter);
      return () => {
        clearTimeout(timer);
        clearInterval(glitchInterval);
      };
    }

    return () => clearInterval(glitchInterval);
  }, [autoDismiss, dismissAfter]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  const handleRetry = () => {
    onRetry?.();
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div style={overlayStyle}>
      <div
        style={{
          ...containerStyle,
          transform: glitch ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
          borderColor: glitch ? '#ff0000' : 'rgba(255, 50, 50, 0.3)',
        }}
      >
        {/* Icon */}
        <div style={iconContainerStyle}>
          <span style={iconStyle(glitch)}>{config.icon}</span>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <h3 style={titleStyle(glitch)}>{config.title}</h3>
          <p style={descriptionStyle}>{message || config.description}</p>

          {/* Actions */}
          <div style={actionsStyle}>
            {config.isRetryable && onRetry && (
              <button
                onClick={handleRetry}
                style={retryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(150, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(100, 0, 0, 0.2)';
                }}
              >
                TRY AGAIN
              </button>
            )}
            {onDismiss && (
              <button
                onClick={handleDismiss}
                style={dismissButtonStyle}
              >
                {autoDismiss ? `CLOSE (${Math.ceil(dismissAfter / 1000)}s)` : 'DISMISS'}
              </button>
            )}
          </div>
        </div>

        {/* Close X */}
        {onDismiss && (
          <button
            onClick={handleDismiss}
            style={closeButtonStyle}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  animation: 'errorFadeIn 0.3s ease-out',
};

const containerStyle: React.CSSProperties = {
  background: 'rgba(20, 0, 0, 0.95)',
  border: '1px solid rgba(255, 50, 50, 0.3)',
  borderRadius: '6px',
  padding: '30px',
  maxWidth: '450px',
  width: '90%',
  display: 'flex',
  gap: '20px',
  position: 'relative',
  boxShadow: '0 0 40px rgba(150, 0, 0, 0.3), inset 0 0 60px rgba(50, 0, 0, 0.2)',
};

const iconContainerStyle: React.CSSProperties = {
  flexShrink: 0,
};

const iconStyle = (glitch: boolean): React.CSSProperties => ({
  fontSize: '40px',
  filter: glitch ? 'hue-rotate(90deg)' : 'none',
  transition: glitch ? 'none' : 'all 0.2s',
});

const contentStyle: React.CSSProperties = {
  flex: 1,
};

const titleStyle = (glitch: boolean): React.CSSProperties => ({
  fontSize: '18px',
  letterSpacing: '4px',
  color: glitch ? '#ff0000' : '#cc2222',
  textShadow: glitch ? '2px 0 #ff0000, -2px 0 #0000ff' : '0 0 10px rgba(200, 0, 0, 0.5)',
  marginBottom: '12px',
  fontFamily: 'Courier New, monospace',
  transition: glitch ? 'none' : 'all 0.1s',
});

const descriptionStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '1px',
  color: 'rgba(255, 255, 255, 0.7)',
  lineHeight: 1.6,
  marginBottom: '20px',
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const retryButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.2)',
  border: '1px solid rgba(255, 50, 50, 0.5)',
  color: '#ff4444',
  padding: '10px 20px',
  fontSize: '11px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const dismissButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.5)',
  padding: '10px 20px',
  fontSize: '11px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '5px',
  transition: 'all 0.2s',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes errorFadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// Hook for managing error state
export const useErrorHandler = () => {
  const [error, setError] = useState<{ type: ErrorType; message?: string } | null>(null);

  const showError = (type: ErrorType, message?: string) => {
    setError({ type, message });
  };

  const clearError = () => {
    setError(null);
  };

  return { error, showError, clearError };
};

export default ErrorMessage;
