/** LoadingScreen.tsx - Enhanced loading screen with progress and tips */
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  progress?: number;
  message?: string;
  tips?: string[];
  showProgress?: boolean;
}

const LOADING_TIPS = [
  "The Hollow Man watches from the shadows...",
  "Collect all 8 pages to escape the forest.",
  "Stay together. It hunts those who are alone.",
  "Your flashlight drains stamina. Use it wisely.",
  "Some puzzles require multiple players.",
  "Looking at the monster slows it down.",
  "It gets faster as you collect more pages.",
  "Proximity voice chat - stay close to communicate.",
  "Don't run unless necessary. Stamina is precious.",
  "The forest remembers those who enter alone...",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress = 0,
  message = "Entering the forest...",
  tips = LOADING_TIPS,
  showProgress = true,
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);

    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 3000 + Math.random() * 2000);

    return () => {
      clearInterval(tipInterval);
      clearInterval(glitchInterval);
    };
  }, [tips.length]);

  return (
    <div style={loadingContainerStyle}>
      {/* Animated fog background */}
      <div style={fogAnimationStyle} />
      
      {/* Dark vignette */}
      <div style={vignetteStyle} />

      {/* Static noise overlay */}
      <div style={noiseOverlayStyle} />

      {/* Central content */}
      <div style={contentContainerStyle}>
        {/* Animated icon */}
        <div style={iconContainerStyle}>
          <div style={skullIconStyle(glitchText)}>🌲</div>
          <div style={pulseRingStyle} />
        </div>

        {/* Loading text */}
        <h1 style={loadingTextStyle(glitchText)}>
          {message}
        </h1>

        {/* Progress bar */}
        {showProgress && (
          <div style={progressContainerStyle}>
            <div style={progressBarStyle}>
              <div style={progressFillStyle(progress)} />
            </div>
            <span style={progressTextStyle}>{Math.round(progress)}%</span>
          </div>
        )}

        {/* Tips section */}
        <div style={tipsContainerStyle}>
          <div style={tipLabelStyle}>⚠ SURVIVAL TIP</div>
          <p style={tipTextStyle} key={currentTip}>
            {tips[currentTip]}
          </p>
        </div>

        {/* Loading animation dots */}
        <div style={dotsContainerStyle}>
          <span style={dotStyle(0)}>.</span>
          <span style={dotStyle(1)}>.</span>
          <span style={dotStyle(2)}>.</span>
        </div>
      </div>

      {/* Bottom status */}
      <div style={statusContainerStyle}>
        <span style={statusTextStyle}>Connecting to server...</span>
      </div>
    </div>
  );
};

// Styles
const loadingContainerStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  overflow: 'hidden',
};

const fogAnimationStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at 50% 100%, rgba(20,30,20,0.8) 0%, transparent 60%)',
  animation: 'fogMove 8s ease-in-out infinite',
};

const vignetteStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)',
  pointerEvents: 'none',
};

const noiseOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.05,
  mixBlendMode: 'overlay',
  pointerEvents: 'none',
  animation: 'noiseMove 0.5s steps(4) infinite',
};

const contentContainerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  textAlign: 'center',
  maxWidth: '500px',
  padding: '40px',
};

const iconContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
};

const skullIconStyle = (glitch: boolean): React.CSSProperties => ({
  fontSize: '64px',
  filter: glitch ? 'hue-rotate(90deg) saturate(2)' : 'none',
  transform: glitch ? 'translateX(3px)' : 'none',
  transition: glitch ? 'none' : 'all 0.2s',
  animation: 'treeSway 3s ease-in-out infinite',
});

const pulseRingStyle: React.CSSProperties = {
  position: 'absolute',
  width: '120px',
  height: '120px',
  border: '2px solid rgba(255,50,50,0.3)',
  borderRadius: '50%',
  animation: 'pulseRing 2s ease-out infinite',
};

const loadingTextStyle = (glitch: boolean): React.CSSProperties => ({
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: '6px',
  color: glitch ? '#ff0000' : '#ffffff',
  textShadow: glitch 
    ? '3px 0 #ff0000, -3px 0 #0000ff, 0 0 20px rgba(255,0,0,0.8)' 
    : '0 0 30px rgba(255,255,255,0.3)',
  transform: glitch ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
  transition: glitch ? 'none' : 'all 0.3s',
  marginBottom: '30px',
  fontFamily: 'Courier New, monospace',
});

const progressContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '40px',
};

const progressBarStyle: React.CSSProperties = {
  flex: 1,
  height: '4px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '2px',
  overflow: 'hidden',
};

const progressFillStyle = (progress: number): React.CSSProperties => ({
  width: `${progress}%`,
  height: '100%',
  background: 'linear-gradient(90deg, #440000, #cc0000)',
  boxShadow: '0 0 10px rgba(200,0,0,0.5)',
  transition: 'width 0.3s ease-out',
});

const progressTextStyle: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '2px',
  color: 'rgba(255,255,255,0.5)',
  fontFamily: 'Courier New, monospace',
  minWidth: '40px',
};

const tipsContainerStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,50,50,0.2)',
  borderRadius: '4px',
  padding: '20px',
  marginBottom: '20px',
  animation: 'fadeIn 0.5s ease-out',
};

const tipLabelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '3px',
  color: '#cc2222',
  marginBottom: '8px',
  fontFamily: 'Courier New, monospace',
};

const tipTextStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '1px',
  color: 'rgba(255,255,255,0.7)',
  lineHeight: 1.6,
  animation: 'fadeIn 0.5s ease-out',
};

const dotsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
};

const dotStyle = (index: number): React.CSSProperties => ({
  fontSize: '24px',
  color: 'rgba(255,255,255,0.4)',
  animation: `dotPulse 1.4s ease-in-out ${index * 0.2}s infinite`,
});

const statusContainerStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
};

const statusTextStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '2px',
  color: 'rgba(255,255,255,0.3)',
  fontFamily: 'Courier New, monospace',
};

// Add keyframes to document
export const injectLoadingStyles = (): void => {
  if (document.getElementById('hollow-loading-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'hollow-loading-styles';
  style.textContent = `
    @keyframes fogMove {
      0%, 100% { transform: translateX(0) scale(1); opacity: 0.8; }
      50% { transform: translateX(-20px) scale(1.1); opacity: 0.6; }
    }
    
    @keyframes pulseRing {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    
    @keyframes treeSway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    
    @keyframes dotPulse {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
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
};

export default LoadingScreen;
