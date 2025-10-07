import { RotateCcw, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KioskHeaderProps {
  onReset?: () => void;
}

export default function KioskHeader({ onReset }: KioskHeaderProps) {
  return (
    <header className="glass-strong border-b border-card-border">
      <div className="h-20 px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 glow-cyan animate-pulse" />
            <div className="absolute inset-0.5 rounded-xl bg-background flex items-center justify-center">
              <div className="relative">
                <GraduationCap className="w-7 h-7 text-cyan-400" strokeWidth={2.5} />
                <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
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

        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2 glass"
          data-testid="button-reset"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Session
        </Button>
      </div>
    </header>
  );
}
