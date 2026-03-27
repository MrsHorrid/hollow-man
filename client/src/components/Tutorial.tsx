/** Tutorial.tsx - Interactive tutorial for new players */
import React, { useState, useEffect } from 'react';

interface TutorialProps {
  onClose: () => void;
  autoShow?: boolean;
}

interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  controls?: { key: string; action: string }[];
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'WELCOME TO THE FOREST',
    description: 'You and your team are trapped in a dark forest. The Hollow Man is hunting you. Your only hope is to collect all 8 pages scattered throughout the woods.',
    controls: [],
  },
  {
    title: 'MOVEMENT',
    description: 'Use WASD or Arrow Keys to move through the forest. Hold SHIFT to sprint, but beware - sprinting drains your stamina quickly!',
    controls: [
      { key: 'W', action: 'Move Forward' },
      { key: 'A', action: 'Move Left' },
      { key: 'S', action: 'Move Back' },
      { key: 'D', action: 'Move Right' },
      { key: 'SHIFT', action: 'Sprint' },
    ],
  },
  {
    title: 'FLASHLIGHT',
    description: 'Press F to toggle your flashlight. It helps you see in the dark, but it also makes you more visible to the Hollow Man. Use it wisely!',
    controls: [
      { key: 'F', action: 'Toggle Flashlight' },
    ],
  },
  {
    title: 'COLLECTING PAGES',
    description: 'Find glowing pages throughout the forest. Get close and press E to collect them. The more pages you collect, the angrier the Hollow Man becomes.',
    controls: [
      { key: 'E', action: 'Collect Page / Interact' },
    ],
  },
  {
    title: 'THE HOLLOW MAN',
    description: 'It hunts those who are alone. Stay with your team! If you look directly at it, it slows down. But if it gets too close... pray.',
    controls: [],
  },
  {
    title: 'PUZZLES',
    description: 'Some areas are blocked by puzzles. Some require multiple players to solve. Work together! Wrong answers may attract unwanted attention.',
    controls: [],
  },
  {
    title: 'VOICE CHAT',
    description: 'Use proximity voice chat to communicate with nearby players. The closer you are, the clearer you hear each other. Stay close to coordinate!',
    controls: [],
  },
  {
    title: 'STAY ALIVE',
    description: 'If the Hollow Man catches you, you die. If all players die, the game is over. Collect all 8 pages before it\'s too late...',
    controls: [],
  },
];

export const Tutorial: React.FC<TutorialProps> = ({ onClose, autoShow = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(!autoShow);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (autoShow) {
      const hasSeenTutorial = localStorage.getItem('hollow-man-tutorial-seen');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [autoShow]);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hollow-man-tutorial-seen', 'true');
    }
    setShowTutorial(false);
    onClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!showTutorial) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        {/* Progress bar */}
        <div style={progressContainerStyle}>
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              style={{
                ...progressDotStyle,
                background: index <= currentStep ? '#cc2222' : 'rgba(255,255,255,0.2)',
                boxShadow: index <= currentStep ? '0 0 10px rgba(200,0,0,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <h2 style={titleStyle}>{step.title}</h2>
          
          <p style={descriptionStyle}>{step.description}</p>

          {/* Controls display */}
          {step.controls && step.controls.length > 0 && (
            <div style={controlsContainerStyle}>
              <h4 style={controlsTitleStyle}>CONTROLS</h4>
              <div style={controlsGridStyle}>
                {step.controls.map((control, index) => (
                  <div key={index} style={controlItemStyle}>
                    <kbd style={keyStyle}>{control.key}</kbd>
                    <span style={actionStyle}>{control.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <div style={leftSectionStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                style={checkboxStyle}
              />
              Don't show again
            </label>
            <button onClick={handleSkip} style={skipButtonStyle}>
              Skip Tutorial
            </button>
          </div>

          <div style={navigationStyle}>
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              style={{
                ...navButtonStyle,
                opacity: isFirstStep ? 0.3 : 1,
                cursor: isFirstStep ? 'not-allowed' : 'pointer',
              }}
            >
              ← BACK
            </button>
            <button onClick={handleNext} style={nextButtonStyle}>
              {isLastStep ? 'ENTER THE FOREST →' : 'NEXT →'}
            </button>
          </div>
        </div>

        {/* Step counter */}
        <div style={stepCounterStyle}>
          {currentStep + 1} / {TUTORIAL_STEPS.length}
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10001,
  animation: 'tutorialFadeIn 0.3s ease-out',
};

const containerStyle: React.CSSProperties = {
  background: 'rgba(10, 0, 0, 0.95)',
  border: '1px solid rgba(255, 50, 50, 0.3)',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const progressContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  padding: '20px',
  borderBottom: '1px solid rgba(255, 50, 50, 0.1)',
};

const progressDotStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  transition: 'all 0.3s',
};

const contentStyle: React.CSSProperties = {
  padding: '30px',
  flex: 1,
  overflow: 'auto',
};

const titleStyle: React.CSSProperties = {
  fontSize: '22px',
  letterSpacing: '4px',
  color: '#cc2222',
  textShadow: '0 0 10px rgba(200, 0, 0, 0.3)',
  marginBottom: '16px',
  fontFamily: 'Courier New, monospace',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.8',
  color: 'rgba(255, 255, 255, 0.7)',
  letterSpacing: '0.5px',
};

const controlsContainerStyle: React.CSSProperties = {
  marginTop: '24px',
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 50, 50, 0.1)',
  borderRadius: '6px',
};

const controlsTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '3px',
  color: '#cc2222',
  marginBottom: '16px',
};

const controlsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '12px',
};

const controlItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const keyStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '12px',
  fontFamily: 'monospace',
  color: '#fff',
  minWidth: '40px',
  textAlign: 'center',
};

const actionStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.5)',
  letterSpacing: '0.5px',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 30px',
  borderTop: '1px solid rgba(255, 50, 50, 0.1)',
  background: 'rgba(0, 0, 0, 0.3)',
};

const leftSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '11px',
  color: 'rgba(255, 255, 255, 0.4)',
  cursor: 'pointer',
};

const checkboxStyle: React.CSSProperties = {
  accentColor: '#cc2222',
};

const skipButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.3)',
  fontSize: '11px',
  letterSpacing: '1px',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontFamily: 'Courier New, monospace',
};

const navigationStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const navButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.5)',
  padding: '10px 20px',
  fontSize: '11px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
};

const nextButtonStyle: React.CSSProperties = {
  background: 'rgba(100, 0, 0, 0.4)',
  border: '1px solid rgba(200, 0, 0, 0.5)',
  color: '#cc2222',
  padding: '10px 24px',
  fontSize: '11px',
  letterSpacing: '2px',
  cursor: 'pointer',
  borderRadius: '3px',
  fontFamily: 'Courier New, monospace',
  transition: 'all 0.2s',
  boxShadow: '0 0 15px rgba(150, 0, 0, 0.2)',
};

const stepCounterStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '10px',
  letterSpacing: '2px',
  color: 'rgba(255, 255, 255, 0.2)',
};

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tutorialFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export default Tutorial;
