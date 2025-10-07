import { useEffect, useRef } from 'react';

export function useTextToSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    if (!synthRef.current) {
      console.warn('Text-to-speech not supported in this browser');
      return;
    }

    synthRef.current.cancel();

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1.1;
    utteranceRef.current.volume = 1;

    synthRef.current.speak(utteranceRef.current);
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const isSpeaking = () => {
    return synthRef.current?.speaking || false;
  };

  return { speak, stop, isSpeaking };
}
