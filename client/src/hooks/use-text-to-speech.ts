import { useRef, useState, useCallback, useEffect } from 'react';

export function useTextToSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChecking = useCallback(() => {
    // Clear any existing interval
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    // Check speech state periodically
    checkIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis) {
        const speaking = window.speechSynthesis.speaking;
        setIsSpeaking(speaking);
        
        // Stop checking if speech has ended
        if (!speaking) {
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
    // Clean up any existing speech first
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    setIsSpeaking(false);

    try {
      if (!window.speechSynthesis) {
        console.warn('SpeechSynthesis not supported in this browser');
        return;
      }

      console.log('Creating speech synthesis for text...');
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings
      utterance.rate = 1.1; // Slightly faster than normal
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use a male voice (Matthew-like)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Matthew') ||
        voice.name.includes('Google US English')
      ) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        console.log('Speech started');
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
      };
      
      utteranceRef.current = utterance;
      
      console.log('Starting speech synthesis');
      window.speechSynthesis.speak(utterance);
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
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Load voices when available
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return { speak, stop, isSpeaking };
}
