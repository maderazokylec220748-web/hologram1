import { useState } from "react";
import KioskHeader from "@/components/KioskHeader";
import ChatInterface from "@/components/ChatInterface";
import HologramBackground from "@/components/HologramBackground";
import FullscreenHologram from "@/components/FullscreenHologram";
import { apiRequest } from "@/lib/queryClient";

export default function Kiosk() {
  const [key, setKey] = useState(0);
  const [isHologramVisible, setIsHologramVisible] = useState(false);
  const [hologramDuration, setHologramDuration] = useState(5000);

  const handleReset = async () => {
    try {
      await apiRequest('POST', '/api/chat/reset', {});
    } catch (error) {
      console.error('Reset error:', error);
    }
    setKey(prev => prev + 1);
  };

  const showHologram = (duration?: number) => {
    setHologramDuration(duration || 5000);
    setIsHologramVisible(true);
  };

  const hideHologram = () => {
    setIsHologramVisible(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground" data-testid="page-kiosk">
      <HologramBackground />
      
      <FullscreenHologram 
        isVisible={isHologramVisible}
        duration={hologramDuration}
        onComplete={hideHologram}
      />

      {!isHologramVisible && (
        <>
          <KioskHeader onReset={handleReset} />

          <main className="flex-1 overflow-hidden" key={key}>
            <ChatInterface onHologramTrigger={showHologram} />
          </main>
        </>
      )}
    </div>
  );
}
