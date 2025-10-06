import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KioskHeader from "@/components/KioskHeader";
import HologramScanner from "@/components/HologramScanner";
import ChatInterface from "@/components/ChatInterface";
import HologramBackground from "@/components/HologramBackground";

export default function Kiosk() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'chat'>('scanner');
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey(prev => prev + 1);
    setActiveTab('scanner');
  };

  const handleScanComplete = (data: string) => {
    console.log('Scan complete:', data);
    setTimeout(() => setActiveTab('chat'), 500);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground" data-testid="page-kiosk">
      <HologramBackground />
      
      <KioskHeader onReset={handleReset} />

      <main className="flex-1 overflow-hidden" key={key}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'scanner' | 'chat')} className="h-full flex flex-col">
          <div className="border-b border-card-border bg-card/50 backdrop-blur-sm">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-14 glass" data-testid="tabs-navigation">
              <TabsTrigger value="scanner" className="text-base gap-2" data-testid="tab-scanner">
                Scanner
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-base gap-2" data-testid="tab-chat">
                AI Assistant
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="scanner" className="flex-1 flex items-center justify-center m-0">
            <HologramScanner onScanComplete={handleScanComplete} />
          </TabsContent>

          <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
