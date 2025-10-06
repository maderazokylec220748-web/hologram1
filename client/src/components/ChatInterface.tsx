import { useState, useRef, useEffect } from "react";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onMessageSend?: (message: string) => void;
}

export default function ChatInterface({ onMessageSend }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your holographic assistant. I can help you with school-related questions about courses, campus facilities, schedules, and academic information. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    onMessageSend?.(input);

    // Simulate non-school topic detection
    const nonSchoolKeywords = ['weather', 'movie', 'game', 'food', 'recipe'];
    const isNonSchool = nonSchoolKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    );

    setIsTyping(true);

    setTimeout(() => {
      if (isNonSchool) {
        setShowWarning(true);
        const warningMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I can only help with school-related questions. Please ask about courses, campus facilities, schedules, academic programs, or student services.'
        };
        setMessages(prev => [...prev, warningMessage]);
        
        setTimeout(() => setShowWarning(false), 3000);
      } else {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I understand your question about ' + input + '. Based on our school records, I can provide you with detailed information. Would you like me to elaborate on any specific aspect?'
        };
        setMessages(prev => [...prev, responseMessage]);
      }
      setIsTyping(false);
    }, 1000);
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
