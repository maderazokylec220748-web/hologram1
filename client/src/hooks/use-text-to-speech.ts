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
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChecking = useCallback(() => {
    // Clear any existing interval
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    // Check audio state periodically
    checkIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const isPlaying = !audioRef.current.paused && !audioRef.current.ended;
        setIsSpeaking(isPlaying);
        
        // Stop checking if audio has ended
        if (audioRef.current.ended) {
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
            checkIntervalRef.current = null;
          }
        }
      } else {
        setIsSpeaking(false);
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
      }
    }, 100); // Check every 100ms
  }, []);

  const speak = useCallback(async (text: string) => {
    // Clean up any existing audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    setIsSpeaking(false);

    try {
      if (!window.puter) {
        console.warn('Puter.js not loaded, text-to-speech unavailable');
        return;
      }

      console.log('Creating audio for text-to-speech...');
      const audio = await window.puter.ai.txt2speech(text, {
        voice: "Matthew",
        engine: "neural",
        language: "en-US"
      });
      
      audio.playbackRate = 1.3;
      audioRef.current = audio;
      
      console.log('Starting audio playback and state checking');
      await audio.play();
      startChecking();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  }, [startChecking]);

  const stop = useCallback(() => {
    console.log('Stop button clicked');
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { speak, stop, isSpeaking };
}
