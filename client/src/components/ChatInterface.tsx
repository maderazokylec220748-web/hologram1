import { useState, useRef, useEffect } from "react";
import { Send, AlertCircle, Volume2, VolumeX, Mic, MicOff, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import ChatMessage from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  language: 'english' | 'tagalog';
  onMessageSend?: (message: string) => void;
  onHologramTrigger?: (duration?: number) => void;
  onStopHologram?: () => void;
}

export default function ChatInterface({ language, onMessageSend, onHologramTrigger, onStopHologram }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { speak, stop, isSpeaking: checkIsSpeaking } = useTextToSpeech();
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleMicClick = () => {
    if (!isSupported) {
      toast({
        title: language === 'tagalog' ? "Hindi Suportado" : "Not Supported",
        description: language === 'tagalog' 
          ? "Ang speech recognition ay hindi suportado sa inyong browser."
          : "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = input;
    setInput('');
    onMessageSend?.(messageContent);

    setIsTyping(true);

    try {
      const response = await apiRequest('POST', '/api/chat', { message: messageContent, language });

      const data = await response.json();

      if (!data.isSchoolRelated) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }

      const assistantMessage: Message = {
        id: data.message.id,
        role: 'assistant',
        content: data.message.content
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Calculate display duration based on response length
      const baseTime = 3000;
      const additionalTime = Math.floor(data.message.content.length / 50) * 500;
      const displayDuration = Math.min(baseTime + additionalTime, 15000);

      if (isSpeechEnabled) {
        setIsSpeaking(true);
        
        // Trigger hologram at the same time as speech starts
        if (onHologramTrigger) {
          onHologramTrigger(displayDuration);
        }
        
        speak(data.message.content).then(() => {
          setIsSpeaking(false);
        }).catch(() => {
          setIsSpeaking(false);
        });
      } else {
        // Show hologram even when speech is disabled
        if (onHologramTrigger) {
          onHologramTrigger(displayDuration);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'tagalog' ? "May Mali" : "Error",
        description: language === 'tagalog'
          ? "Hindi naipadala ang mensahe. Subukan muli."
          : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4" data-testid="chat-messages">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4" data-testid="container-greeting">
            <div className="glass-strong rounded-2xl p-8 max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 glow-text-cyan" data-testid="text-greeting-title">
                {language === 'tagalog' ? 'Maligayang Pagdating sa WIS Hologram Assistant!' : 'Welcome to WIS Hologram Assistant!'}
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-greeting-description">
                {language === 'tagalog' 
                  ? 'Kumusta! Ako ang inyong AI assistant para sa Westmead International School. Nandito ako upang tulungan kayo na malaman ang tungkol sa aming mga programa, admission, pasilidad, at marami pang iba.'
                  : "Hello! I'm your AI assistant for Westmead International School. I'm here to help you learn about our programs, admissions, facilities, and more."
                }
              </p>
              <p className="text-md text-muted-foreground" data-testid="text-greeting-cta">
                {language === 'tagalog'
                  ? 'Magtanong tungkol sa aming paaralan at ako ay masayang tutulong sa inyo!'
                  : "Ask me anything about our school and I'll be happy to assist you!"
                }
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        
        {isTyping && (
          <div className="flex gap-3 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground glow-cyan flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {showWarning && (
        <div className="mx-6 mb-2 glass-strong rounded-xl p-3 flex items-center gap-2 border-[hsl(var(--glow-green))]">
          <AlertCircle className="w-5 h-5 text-[hsl(var(--glow-green))]" />
          <p className="text-sm text-muted-foreground">
            {language === 'tagalog' 
              ? 'Mangyaring magtanong tungkol sa paaralan lamang'
              : 'Please ask school-related questions only'
            }
          </p>
        </div>
      )}

      <div className="p-6 pt-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="glass-strong rounded-2xl p-2 flex gap-2">
          <Button
            onClick={() => {
              setIsSpeechEnabled(!isSpeechEnabled);
              if (isSpeechEnabled) {
                stop();
              }
            }}
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            data-testid="button-toggle-speech"
            aria-label={language === 'tagalog' 
              ? (isSpeechEnabled ? "I-off ang tunog" : "I-on ang tunog")
              : (isSpeechEnabled ? "Turn off sound" : "Turn on sound")
            }
          >
            {isSpeechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
          <Button
            onClick={handleMicClick}
            size="icon"
            variant="ghost"
            className={`flex-shrink-0 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
            data-testid="button-microphone"
            aria-label={language === 'tagalog'
              ? (isListening ? "Huminto sa pakikinig" : "Magsimulang makinig")
              : (isListening ? "Stop listening" : "Start listening")
            }
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening 
              ? (language === 'tagalog' ? "Nakikinig..." : "Listening...")
              : (language === 'tagalog' ? "Magtanong tungkol sa paaralan..." : "Ask about school topics only...")
            }
            className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 placeholder:text-muted-foreground"
            data-testid="input-message"
          />
          {isSpeaking ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                stop();
                setIsSpeaking(false);
                onStopHologram?.();
              }}
              size="lg"
              className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white fixed bottom-8 right-8 z-[9999] shadow-2xl rounded-full h-16 w-16"
              data-testid="button-stop-speech"
              aria-label={language === 'tagalog' ? "Ihinto ang pagsasalita" : "Stop speaking"}
              type="button"
            >
              <Pause className="w-8 h-8" />
            </Button>
          ) : (
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!input.trim()}
              className="flex-shrink-0"
              data-testid="button-send"
              aria-label={language === 'tagalog' ? "Ipadala ang mensahe" : "Send message"}
              type="button"
            >
              <Send className="w-5 h-5" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
