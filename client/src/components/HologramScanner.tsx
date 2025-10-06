import { useState } from "react";
import { Scan, Upload, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HologramScannerProps {
  onScanComplete?: (data: string) => void;
}

export default function HologramScanner({ onScanComplete }: HologramScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning
    setTimeout(() => {
      const mockData = "STUDENT_ID_12345";
      setScanResult(mockData);
      setIsScanning(false);
      onScanComplete?.(mockData);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative">
        <div 
          className={`
            w-64 h-64 rounded-full border-4 flex items-center justify-center
            transition-all duration-500
            ${isScanning 
              ? 'border-primary animate-pulse-glow' 
              : scanResult 
                ? 'border-[hsl(var(--glow-green))] glow-green' 
                : 'border-primary/30'
            }
          `}
        >
          {isScanning && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
            </div>
          )}
          
          <div className="text-center">
            {scanResult ? (
              <div className="space-y-2">
                <QrCode className="w-16 h-16 mx-auto text-[hsl(var(--glow-green))]" />
                <p className="text-sm font-mono text-muted-foreground">Scan Complete</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Scan className={`w-16 h-16 mx-auto ${isScanning ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-sm text-muted-foreground">
                  {isScanning ? 'Scanning...' : 'Ready to Scan'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-2 bg-primary/20 blur-xl rounded-full" />
      </div>

      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={handleScan}
          disabled={isScanning}
          className="min-h-14 px-8 text-lg gap-2"
          data-testid="button-scan"
        >
          <Scan className="w-5 h-5" />
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="min-h-14 px-6 gap-2 glass"
          data-testid="button-upload"
        >
          <Upload className="w-5 h-5" />
          Upload
        </Button>
      </div>

      {scanResult && (
        <div className="glass rounded-2xl p-4 w-full max-w-md">
          <p className="text-xs text-muted-foreground mb-1">Scan Result</p>
          <p className="font-mono text-lg text-[hsl(var(--glow-green))]" data-testid="text-scan-result">
            {scanResult}
          </p>
        </div>
      )}
    </div>
  );
}
