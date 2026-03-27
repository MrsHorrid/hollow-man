/** VolumeControls.tsx - In-game volume control panel */
import React, { useState, useEffect } from 'react';

interface VolumeSettings {
  master: number;
  music: number;
  sfx: number;
  ambient: number;
  voiceChat: number;
}

interface VolumeControlsProps {
  initialSettings?: Partial<VolumeSettings>;
  onChange?: (settings: VolumeSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SETTINGS: VolumeSettings = {
  master: 0.8,
  music: 0.6,
  sfx: 0.9,
  ambient: 0.7,
  voiceChat: 1.0,
};

const VolumeSlider: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: string;
  color?: string;
}> = ({ label, value, onChange, icon, color = '#cc2222' }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const getVolumeIcon = () => {
    if (value === 0) return '🔇';
    if (value < 0.3) return '🔈';
    if (value < 0.7) return '🔉';
    return '🔊';
  };

  return (
    <div style={sliderContainerStyle}>
      <div style={sliderHeaderStyle}>
        <span style={sliderIconStyle}>{icon}</span>
        <span style={sliderLabelStyle}>{label}</span>
        <span style={sliderValueStyle}>{getVolumeIcon()} {Math.round(value * 100)}%</span>
      </div>
      <div style={sliderTrackContainerStyle}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          style={sliderInputStyle}
        />
        <div
          style={{
            ...sliderFillStyle,
            width: `${value * 100}%`,
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: isDragging ? `0 0 10px ${color}50` : 'none',
          }}
        />
        <div
          style={{
            ...sliderThumbStyle,
            left: `${value * 100}%`,
            background: color,
            boxShadow: isDragging ? `0 0 15px ${color}` : `0 0 5px ${color}50`,
          }}
        />
      </div>
    </div>
  );
};

export const VolumeControls: React.FC<VolumeControlsProps> = ({
  initialSettings = {},
  onChange,
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useState<VolumeSettings>({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const saved = localStorage.getItem('hollow-man-volume-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn('Failed to load volume settings');
      }
    }
  }, []);

  useEffect(() => {
    onChange?.(settings);
  }, [settings, onChange]);

  const handleSettingChange = (key: keyof VolumeSettings, value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('hollow-man-volume-settings', JSON.stringify(newSettings));
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('hollow-man-volume-settings', JSON.stringify(DEFAULT_SETTINGS));
  };

  const handleMuteAll = () => {
    setSettings(prev => ({ ...prev, master: 0 }));
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>🔊 AUDIO SETTINGS</h2>
          <button onClick={onClose} style={closeButtonStyle}>✕</button>
        </div>

        <div style={contentStyle}>
          <VolumeSlider
            label="MASTER VOLUME"
            value={settings.master}
            onChange={(v) => handleSettingChange('master', v)}
            icon="🎚️"
            color="#ffffff"
          />

          <div style={dividerStyle} />

          <VolumeSlider
            label="MUSIC"
            value={settings.music * settings.master}
            onChange={(v) => handleSettingChange('music', Math.min(1, v / Math.max(0.01, settings.master)))}
            icon="🎵"
            color="#cc44cc"
          />

          <VolumeSlider
            label="SOUND EFFECTS"
            value={settings.sfx * settings.master}
            onChange={(v) => handleSettingChange('sfx', Math.min(1, v / Math.max(0.01, settings.master)))}
            icon="🔔"
            color="#cc4444"
          />

          <VolumeSlider
            label="AMBIENT SOUNDS"
            value={settings.ambient * settings.master}
            onChange={(v) => handleSettingChange('ambient', Math.min(1, v / Math.max(0.01, settings.master)))}
            icon="🌲"
            color="#44cc44"
          />

          <VolumeSlider
            label="VOICE CHAT"
            value={settings.voiceChat * settings.master}
            onChange={(v) => handleSettingChange('voiceChat', Math.min(1, v / Math.max(0.01, settings.master)))}
            icon="🎤"
            color="#4444cc"
          />

          <div style={dividerStyle} />

          <div style={actionsStyle}>
            <button onClick={handleMuteAll} style={actionButtonStyle}>
              🔇 MUTE ALL
            </button>
            <button onClick={handleReset} style={actionButtonStyle}>
              ↺ RESET
            </button>
          </div>
        </div>

        <div style={footerStyle}>
          <span style={footerTextStyle}>
            Press <kbd style={kbdStyle}>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10002,
  animation: 'fadeIn 0.2s ease-out',
};

const containerStyle: React.CSSProperties = {
  background: 'rgba(10, 0, 0, 0.95)',
  border: '1px solid rgba(255, 50, 50, 0.3)',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '450px',
  boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(255, 50, 50, 0.1)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '16px',
  letterSpacing: '3px',
  color: '#cc2222',
  margin: 0,
  fontFamily: 'Courier New, monospace',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '18px',
  cursor: 'pointer',
  padding: '4px 8px',
  transition: 'color 0.2s',
};

const contentStyle: React.CSSProperties = {
  padding: '24px',
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: 'rgba(255, 50, 50, 0.1)',
  margin: '16px 0',
};

const sliderContainerStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const sliderHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
};

const sliderIconStyle: React.CSSProperties = {
  fontSize: '14px',
};

const sliderLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.5)',
  flex: 1,
  fontFamily: 'Courier New, monospace',
};

const sliderValueStyle: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '1px',
  color: 'rgba(255, 255, 255, 0.3)',
  fontFamily: 'Courier New, monospace',
};

const sliderTrackContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
};

const sliderInputStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
  zIndex: 2,
};

const sliderFillStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  height: '4px',
  borderRadius: '2px',
  pointerEvents: 'none',
  transition: 'box-shadow 0.2s',
};

const sliderThumbStyle: React.CSSProperties = {
  position: 'absolute',
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
  transition: 'box-shadow 0.2s',
  zIndex: 1,
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const actionButtonStyle: React.CSSProperties = {
  flex: 1,
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.5)',
  padding: '10px 16px',
  fontSize: '10px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const footerStyle: React.CSSProperties = {
  padding: '12px 24px',
  borderTop: '1px solid rgba(255, 50, 50, 0.1)',
  textAlign: 'center',
};

const footerTextStyle: React.CSSProperties = {
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.3)',
  letterSpacing: '1px',
};

const kbdStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '2px 6px',
  borderRadius: '3px',
  fontFamily: 'monospace',
  fontSize: '10px',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export default VolumeControls;
