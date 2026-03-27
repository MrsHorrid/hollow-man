import React, { useEffect, useRef, useState } from 'react';
import { gameState } from '../engine/GameState';
import { SocketEvents } from '@shared/types/game';

interface VoiceChatProps {
  myPlayerId: string | null;
}

interface VoiceSource {
  sourceId: string;
  gainNode: GainNode;
  lastActivity: number;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ myPlayerId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSpeakers, setActiveSpeakers] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const voiceSourcesRef = useRef<Map<string, VoiceSource>>(new Map());
  const recordingRef = useRef(false);

  useEffect(() => {
    initVoiceChat();
    return () => cleanup();
  }, []);

  useEffect(() => {
    const socket = gameState.getSocket();
    if (!socket) return;

    socket.on(SocketEvents.VOICE_RECEIVE, (data: {
      senderId: string;
      audioData: ArrayBuffer;
      volume: number;
      distance: number;
    }) => {
      playVoiceData(data.senderId, data.audioData, data.volume);
    });

    return () => {
      socket.off(SocketEvents.VOICE_RECEIVE);
    };
  }, []);

  const initVoiceChat = async () => {
    try {
      audioCtxRef.current = new AudioContext();
    } catch (e) {
      setError('Web Audio not supported');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000, // Low bitrate for gaming
      });

      mediaRecorderRef.current = mediaRecorder;
      recordingRef.current = true;

      mediaRecorder.ondataavailable = async (e) => {
        if (e.data.size > 0 && recordingRef.current) {
          const buffer = await e.data.arrayBuffer();
          gameState.sendVoiceData(buffer);
        }
      };

      mediaRecorder.start(100); // Send chunks every 100ms
      setIsRecording(true);
    } catch (e) {
      setError('Microphone access denied');
      console.error('Voice chat error:', e);
    }
  };

  const stopRecording = () => {
    recordingRef.current = false;
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop();
    }
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsRecording(false);
  };

  const playVoiceData = async (senderId: string, audioData: ArrayBuffer, volume: number) => {
    if (!audioCtxRef.current) return;

    try {
      const audioBuffer = await audioCtxRef.current.decodeAudioData(audioData.slice(0));
      const source = audioCtxRef.current.createBufferSource();
      const gainNode = audioCtxRef.current.createGain();

      gainNode.gain.value = Math.min(1, volume * 1.5);
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      source.start();

      // Track active speakers
      setActiveSpeakers(prev => {
        if (!prev.includes(senderId)) return [...prev, senderId];
        return prev;
      });

      source.onended = () => {
        setActiveSpeakers(prev => prev.filter(id => id !== senderId));
      };
    } catch (e) {
      // Audio decode failed (expected sometimes)
    }
  };

  const cleanup = () => {
    stopRecording();
    audioCtxRef.current?.close();
  };

  const handlePushToTalk = (active: boolean) => {
    if (active && !isRecording) {
      startRecording();
    } else if (!active && isRecording) {
      stopRecording();
    }
  };

  return (
    <div className="voice-chat-ui" style={{
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      zIndex: 200,
      pointerEvents: 'auto',
    }}>
      {error && (
        <div style={{ color: '#ff4444', fontSize: '11px', marginBottom: '8px' }}>
          ⚠ {error}
        </div>
      )}

      {/* Push to talk button */}
      <button
        onMouseDown={() => handlePushToTalk(true)}
        onMouseUp={() => handlePushToTalk(false)}
        onTouchStart={() => handlePushToTalk(true)}
        onTouchEnd={() => handlePushToTalk(false)}
        style={{
          background: isRecording ? 'rgba(255,50,50,0.3)' : 'rgba(0,0,0,0.5)',
          border: `1px solid ${isRecording ? 'rgba(255,50,50,0.8)' : 'rgba(255,255,255,0.2)'}`,
          color: isRecording ? '#ff4444' : 'rgba(255,255,255,0.5)',
          padding: '8px 16px',
          fontSize: '10px',
          letterSpacing: '2px',
          cursor: 'pointer',
          fontFamily: 'Courier New',
          textTransform: 'uppercase',
          borderRadius: '3px',
          transition: 'all 0.1s',
          boxShadow: isRecording ? '0 0 10px rgba(255,50,50,0.5)' : 'none',
        }}
      >
        {isRecording ? '🎙 TRANSMITTING' : '[V] PUSH TO TALK'}
      </button>

      {/* Active speakers */}
      {activeSpeakers.length > 0 && (
        <div style={{
          marginTop: '6px',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '1px',
        }}>
          {activeSpeakers.map(id => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#44ff88', animation: 'pulse 0.5s infinite' }}>▶</span>
              <span>{id.slice(0, 6)}...</span>
            </div>
          ))}
        </div>
      )}

      {/* Proximity hint */}
      <div style={{
        marginTop: '4px',
        fontSize: '9px',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '1px',
      }}>
        PROXIMITY CHAT — 25M RANGE
      </div>
    </div>
  );
};
