import HologramBackground from '../HologramBackground';

export default function HologramBackgroundExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <HologramBackground />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-display font-bold text-primary">Holographic Background</h1>
        <p className="text-muted-foreground mt-2">Grid pattern with floating elements</p>
      </div>
    </div>
  );
}
