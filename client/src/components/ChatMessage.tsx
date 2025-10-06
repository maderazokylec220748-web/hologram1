import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isUser 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-primary text-primary-foreground glow-cyan'
        }
      `}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className={`
        max-w-[75%] rounded-2xl px-4 py-3
        ${isUser 
          ? 'bg-accent/20 border border-accent/30' 
          : 'glass border-primary/30'
        }
      `}>
        <p className="text-base leading-relaxed" data-testid={`text-message-${role}`}>
          {content}
        </p>
      </div>
    </div>
  );
}
