import { useState, useRef, useEffect } from "react";
import { Send, AlertCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import ChatMessage from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onMessageSend?: (message: string) => void;
}

export default function ChatInterface({ onMessageSend }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { speak, stop } = useTextToSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const response = await apiRequest('POST', '/api/chat', { message: messageContent });

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

      if (isSpeechEnabled) {
        speak(data.message.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4" data-testid="chat-messages">
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
            Please ask school-related questions only
          </p>
        </div>
      )}

      <div className="p-6 pt-0">
        <div className="glass-strong rounded-2xl p-2 flex gap-2">
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
          >
            {isSpeechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about school topics only..."
            className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 placeholder:text-muted-foreground"
            data-testid="input-message"
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!input.trim()}
            className="flex-shrink-0"
            data-testid="button-send"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
