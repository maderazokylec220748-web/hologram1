import { useRef, useState, useCallback, useEffect } from 'react';

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
    // Clean up any existing audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);

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
      const handlePlay = () => setIsSpeaking(true);
      const handlePause = () => setIsSpeaking(false);
      const handleEnded = () => setIsSpeaking(false);
      const handleError = () => setIsSpeaking(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      
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
    }
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { speak, stop, isSpeaking };
}
