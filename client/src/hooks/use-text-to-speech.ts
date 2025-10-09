import { useRef, useState, useCallback, useEffect } from 'react';

export function useTextToSpeech(language: 'english' | 'tagalog' = 'english') {
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
      utterance.pitch = 0.8; // Lower pitch for more masculine sound
      utterance.volume = 1.0;
      
      // Try to use an appropriate voice based on language
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      
      // Tagalog/Filipino voice patterns (prioritize when language is Tagalog)
      const tagalogVoicePatterns = [
        'fil-PH',
        'Filipino',
        'Tagalog',
        'Rosa',
        'Angelo',
        'Google Filipino',
        'Microsoft Rosa',
        'Microsoft Angelo',
        'fil-',
        'tl-PH',
        'tl-'
      ];
      
      // Comprehensive list of male voice names across platforms
      const maleVoicePatterns = [
        'Male',
        // Google voices
        'Google UK English Male',
        'Google US English Male',
        'en-US-Neural2-D',
        'en-US-Neural2-A',
        'en-US-Neural2-I',
        'en-US-Neural2-J',
        'en-US-Wavenet-D',
        'en-US-Wavenet-A',
        'en-US-Wavenet-B',
        'en-US-Wavenet-I',
        'en-US-Wavenet-J',
        // Microsoft voices (modern)
        'Microsoft Guy',
        'Microsoft Ryan',
        'Microsoft Brian',
        'Microsoft Andrew',
        'Microsoft Davis',
        'Microsoft Tony',
        'Microsoft Christopher',
        'Microsoft Eric',
        'Microsoft Jacob',
        'Microsoft Steffan',
        // Microsoft voices (legacy)
        'Microsoft David',
        'Microsoft Mark',
        'Microsoft George',
        'Microsoft James',
        // macOS voices
        'Alex',
        'Daniel',
        'Fred',
        'Jorge',
        'Juan',
        'Thomas',
        'Matthew',
        // Other common male voices
        'David',
        'Diego',
        'Paul',
        'Ralph',
        'Ryan',
        'Aaron',
        'Bruce',
        'Oliver',
        'Rishi'
      ];
      
      // Known female voice patterns to exclude
      const femaleVoicePatterns = [
        'Female',
        // Modern Microsoft voices
        'Microsoft Aria',
        'Microsoft Jenny',
        'Microsoft Michelle',
        'Microsoft Ana',
        'Microsoft Emma',
        'Microsoft Heather',
        'Microsoft Natasha',
        'Microsoft Sonia',
        'Microsoft Ava',
        // Legacy Microsoft voices
        'Microsoft Zira',
        'Samantha',
        'Victoria',
        'Karen',
        'Kate',
        'Susan',
        // Google voices
        'en-US-Neural2-C',
        'en-US-Neural2-E',
        'en-US-Neural2-F',
        'en-US-Neural2-G',
        'en-US-Neural2-H',
        'en-US-Neural2-L',
        'en-US-Wavenet-C',
        'en-US-Wavenet-E',
        'en-US-Wavenet-F',
        'en-US-Wavenet-G',
        'en-US-Wavenet-H',
        // macOS and other voices
        'Allison',
        'Amelie',
        'Anna',
        'Catherine',
        'Ellen',
        'Fiona',
        'Joanna',
        'Kendra',
        'Kimberly',
        'Laura',
        'Monica',
        'Moira',
        'Nicky',
        'Paulina',
        'Princess',
        'Serena',
        'Tessa',
        'Vicki',
        'Zosia',
        'Zuzana'
      ];
      
      let preferredVoice = null;
      
      // If language is Tagalog, prioritize Tagalog/Filipino voices first
      if (language === 'tagalog') {
        for (const pattern of tagalogVoicePatterns) {
          preferredVoice = voices.find(voice => 
            voice.name.includes(pattern) || voice.lang.includes(pattern)
          );
          if (preferredVoice) {
            console.log('Found Tagalog voice:', preferredVoice.name);
            break;
          }
        }
      }
      
      // If no Tagalog voice found (or language is English), try to find a male voice
      if (!preferredVoice) {
        for (const pattern of maleVoicePatterns) {
          preferredVoice = voices.find(voice => voice.name.includes(pattern));
          if (preferredVoice) break;
        }
      }
      
      // If no male voice found, filter out known female voices
      if (!preferredVoice) {
        preferredVoice = voices.find(voice => {
          const voiceName = voice.name.toLowerCase();
          return !femaleVoicePatterns.some(pattern => 
            voiceName.includes(pattern.toLowerCase())
          );
        });
      }
      
      // Fallback to first voice if absolutely necessary
      if (!preferredVoice && voices.length > 0) {
        preferredVoice = voices[0];
      }
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log('Using voice:', preferredVoice.name, 'for language:', language);
      } else {
        console.warn('No suitable voice found, using browser default with lowered pitch');
      }
      
      // Note: Lower pitch (0.8) helps make any voice sound more masculine
      // This provides a fallback in case voice selection picks a female voice

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
  }, [startChecking, language]);

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
