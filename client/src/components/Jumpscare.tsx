import React, { useEffect, useState, useRef } from 'react';
import { JumpscareEvent } from '@shared/types/game';
import { soundManager } from '../engine/SoundManager';

interface JumpscareProps {
  event: JumpscareEvent | null;
  onComplete: () => void;
}

interface JumpscareState {
  active: boolean;
  intensity: number;
  type: JumpscareEvent['type'] | null;
  phase: 'flash' | 'image' | 'fading' | null;
}

export const Jumpscare: React.FC<JumpscareProps> = ({ event, onComplete }) => {
  const [state, setState] = useState<JumpscareState>({
    active: false,
    intensity: 0,
    type: null,
    phase: null,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!event) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    const { intensity, type } = event;

    // Play appropriate sound
    if (type === 'monster_close' || type === 'player_scream') {
      soundManager.playSfx('monster_growl', { volume: intensity });
    } else {
      soundManager.playSfx('sanity_drain', { volume: intensity * 0.6 });
    }

    setState({ active: true, intensity, type, phase: 'flash' });

    if (type === 'monster_close' || type === 'player_scream') {
      timerRef.current = setTimeout(() => {
        setState(s => ({ ...s, phase: 'image' }));
        timerRef.current = setTimeout(() => {
          setState(s => ({ ...s, phase: 'fading' }));
          timerRef.current = setTimeout(() => {
            setState({ active: false, intensity: 0, type: null, phase: null });
            onComplete();
          }, 500 * intensity);
        }, 300 * intensity);
      }, 50);
    } else {
      timerRef.current = setTimeout(() => {
        setState(s => ({ ...s, phase: 'fading' }));
        timerRef.current = setTimeout(() => {
          setState({ active: false, intensity: 0, type: null, phase: null });
          onComplete();
        }, 300);
      }, 100 + intensity * 300);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [event]);

  if (!state.active) return null;

  const overlayAlpha = state.phase === 'fading' ? 0 : state.phase === 'image' ? 0.7 : state.intensity;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        transition: state.phase === 'fading' ? 'opacity 0.5s' : 'none',
        opacity: state.phase === 'fading' ? 0 : 1,
      }}
    >
      {/* Flash overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: state.type === 'ambient' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.95)',
          opacity: overlayAlpha,
        }}
      />

      {/* Monster face */}
      {(state.phase === 'image' || state.phase === 'flash') &&
       (state.type === 'monster_close' || state.type === 'player_scream') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: state.phase === 'image' ? 1 : 0.5,
          }}
        >
          <MonsterFace intensity={state.intensity} />
        </div>
      )}

      {/* Red vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(200,0,0,${state.intensity * 0.4}) 100%)`,
        }}
      />

      {/* Static noise */}
      {state.intensity > 0.5 && <StaticNoise />}

      {/* Ambient text */}
      {state.type === 'ambient' && (
        <div
          style={{
            position: 'absolute',
            bottom: '40%',
            width: '100%',
            textAlign: 'center',
            color: 'rgba(255,50,50,0.6)',
            fontSize: '14px',
            letterSpacing: '4px',
            fontFamily: 'Courier New',
          }}
        >
          {getAmbientText()}
        </div>
      )}
    </div>
  );
};

const MonsterFace: React.FC<{ intensity: number }> = ({ intensity }) => (
  <div
    style={{
      position: 'relative',
      width: `${300 + intensity * 400}px`,
      height: `${500 + intensity * 600}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      filter: `blur(${(1 - intensity) * 3}px)`,
    }}
  >
    {/* Featureless head */}
    <div
      style={{
        width: '180px',
        height: '240px',
        borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
        boxShadow: `0 0 ${intensity * 60}px rgba(100,0,0,0.8)`,
        background: 'radial-gradient(ellipse at center, #110000 0%, #000000 70%)',
      } as React.CSSProperties}
    />
    {/* Elongated body */}
    <div
      style={{
        width: '100px',
        height: '300px',
        background: '#030303',
        marginTop: '-20px',
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        boxShadow: `0 0 ${intensity * 40}px rgba(50,0,0,0.5)`,
      }}
    />
    {/* Arms */}
    {[-1, 1].map(side => (
      <div
        key={side}
        style={{
          position: 'absolute',
          top: '100px',
          [side < 0 ? 'left' : 'right']: '-150px',
          width: '200px',
          height: '12px',
          background: '#040404',
          transform: `rotate(${side * 15}deg)`,
          transformOrigin: side < 0 ? 'right center' : 'left center',
          borderRadius: '6px',
        }}
      />
    ))}
  </div>
);

const StaticNoise: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame: number;
    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 50;
        data[i] = v;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = Math.random() * 100;
      }
      ctx.putImageData(imageData, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.3,
        mixBlendMode: 'screen',
      }}
    />
  );
};

const AMBIENT_TEXTS = [
  'IT KNOWS WHERE YOU ARE',
  'DO NOT LOOK BEHIND YOU',
  'YOU CANNOT ESCAPE',
  'IT IS WATCHING',
  'RUN',
  'NOWHERE TO HIDE',
];

function getAmbientText(): string {
  return AMBIENT_TEXTS[Math.floor(Math.random() * AMBIENT_TEXTS.length)];
}
