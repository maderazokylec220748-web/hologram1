import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KioskHeaderProps {
  onReset?: () => void;
}

export default function KioskHeader({ onReset }: KioskHeaderProps) {
  return (
    <header className="glass-strong border-b border-card-border">
      <div className="h-20 px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-cyan">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-glow-cyan" data-testid="text-title">
              Hologram Assistant
            </h1>
            <p className="text-sm text-muted-foreground">School Information Kiosk</p>
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
