import { useRef } from 'react';

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

  const speak = async (text: string) => {
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
      
      audioRef.current = audio;
      await audio.play();
    } catch (error) {
      console.error('Text-to-speech error:', error);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const isSpeaking = () => {
    return audioRef.current?.paused === false;
  };

  return { speak, stop, isSpeaking };
}
