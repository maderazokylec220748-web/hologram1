import HologramScanner from '../HologramScanner';

export default function HologramScannerExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <HologramScanner onScanComplete={(data) => console.log('Scanned:', data)} />
    </div>
  );
}
