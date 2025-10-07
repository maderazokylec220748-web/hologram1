import { useState } from "react";
import KioskHeader from "@/components/KioskHeader";
import ChatInterface from "@/components/ChatInterface";
import HologramBackground from "@/components/HologramBackground";
import { apiRequest } from "@/lib/queryClient";

export default function Kiosk() {
  const [key, setKey] = useState(0);

  const handleReset = async () => {
    try {
      await apiRequest('POST', '/api/chat/reset', {});
    } catch (error) {
      console.error('Reset error:', error);
    }
    setKey(prev => prev + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground" data-testid="page-kiosk">
      <HologramBackground />
      
      <KioskHeader onReset={handleReset} />

      <main className="flex-1 overflow-hidden" key={key}>
        <ChatInterface />
      </main>
    </div>
  );
}
