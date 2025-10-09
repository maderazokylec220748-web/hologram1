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
      
      // Try to use a male voice
      const voices = window.speechSynthesis.getVoices();
      
      // Priority order for male voices
      const maleVoicePatterns = [
        'Male',
        'Matthew',
        'David',
        'Daniel',
        'Fred',
        'Jorge',
        'Diego',
        'Google UK English Male',
        'Google US English Male',
        'Microsoft David',
        'Microsoft Mark'
      ];
      
      let preferredVoice = null;
      
      // Try to find a male voice in priority order
      for (const pattern of maleVoicePatterns) {
        preferredVoice = voices.find(voice => voice.name.includes(pattern));
        if (preferredVoice) break;
      }
      
      // Filter out female voices if no male voice found
      if (!preferredVoice) {
        preferredVoice = voices.find(voice => 
          !voice.name.toLowerCase().includes('female') &&
          !voice.name.toLowerCase().includes('samantha') &&
          !voice.name.toLowerCase().includes('victoria') &&
          !voice.name.toLowerCase().includes('karen')
        );
      }
      
      // Fallback to first voice
      if (!preferredVoice && voices.length > 0) {
        preferredVoice = voices[0];
      }
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log('Using voice:', preferredVoice.name);
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
