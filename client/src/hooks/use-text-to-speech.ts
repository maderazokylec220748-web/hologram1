import { useRef } from 'react';

export function useTextToSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRequestRef = useRef<AbortController | null>(null);

  const speak = async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }

    currentRequestRef.current = new AbortController();

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
        signal: currentRequestRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.onended = () => {
        if (audioRef.current) {
          URL.revokeObjectURL(audioUrl);
        }
      };

      await audioRef.current.play();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Text-to-speech error:', error);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
      currentRequestRef.current = null;
    }
  };

  const isSpeaking = () => {
    return audioRef.current?.paused === false;
  };

  return { speak, stop, isSpeaking };
}
