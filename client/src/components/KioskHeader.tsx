import { RotateCcw, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KioskHeaderProps {
  language: 'english' | 'tagalog';
  onReset?: () => void;
  onLanguageChange?: () => void;
}

export default function KioskHeader({ language, onReset, onLanguageChange }: KioskHeaderProps) {
  return (
    <header className="glass-strong border-b border-card-border">
      <div className="h-20 px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 glow-cyan animate-pulse" />
            <div className="absolute inset-0.5 rounded-xl bg-background flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter">
                W.I.S.
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-display font-bold text-glow-cyan tracking-tight" data-testid="text-title">
                WIS Hologram Assistant
              </h1>
            </div>
            <p className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Where Ideas Spark ✨
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onLanguageChange}
            className="gap-2 glass"
            data-testid="button-language-toggle"
          >
            <Languages className="w-4 h-4" />
            {language === 'english' ? 'Tagalog' : 'English'}
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="gap-2 glass"
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4" />
            {language === 'english' ? 'Reset Session' : 'I-reset ang Session'}
          </Button>
        </div>
      </div>
    </header>
  );
}
