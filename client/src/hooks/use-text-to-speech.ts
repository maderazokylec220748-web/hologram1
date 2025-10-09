import { useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    puter: {
      ai: {
        txt2speech: (text: string, options?: {
          voice?: string;
          engine?: string;
          language?: string;
        }) => Promise<HTMLAudioElement>;
      };
    };
  }
}

export function useTextToSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      if (!window.puter) {
        console.warn('Puter.js not loaded, text-to-speech unavailable');
        return;
      }

      const audio = await window.puter.ai.txt2speech(text, {
        voice: "Matthew",
        engine: "neural",
        language: "en-US"
      });
      
      audio.playbackRate = 1.3;
      
      // Set up event listeners to track speaking state
      audio.addEventListener('play', () => {
        setIsSpeaking(true);
      });

      audio.addEventListener('pause', () => {
        setIsSpeaking(false);
      });

      audio.addEventListener('ended', () => {
        setIsSpeaking(false);
      });

      audio.addEventListener('error', () => {
        setIsSpeaking(false);
      });
      
      audioRef.current = audio;
      await audio.play();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking };
}
