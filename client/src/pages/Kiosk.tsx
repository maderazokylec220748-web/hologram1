import { useState, useEffect } from "react";
import KioskHeader from "@/components/KioskHeader";
import ChatInterface from "@/components/ChatInterface";
import HologramBackground from "@/components/HologramBackground";
import FullscreenHologram from "@/components/FullscreenHologram";
import LanguageSelector from "@/components/LanguageSelector";
import { apiRequest } from "@/lib/queryClient";

type Language = 'english' | 'tagalog';

export default function Kiosk() {
  const [key, setKey] = useState(0);
  const [isHologramVisible, setIsHologramVisible] = useState(false);
  const [hologramDuration, setHologramDuration] = useState(5000);
  const [language, setLanguage] = useState<Language | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('wis-language') as Language | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setShowLanguageSelector(true);
    }
  }, []);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    localStorage.setItem('wis-language', selectedLanguage);
    setLanguage(selectedLanguage);
    setShowLanguageSelector(false);
  };

  const handleLanguageToggle = async () => {
    const newLanguage = language === 'english' ? 'tagalog' : 'english';
    localStorage.setItem('wis-language', newLanguage);
    setLanguage(newLanguage);
    
    // Reset chat to show greeting in new language
    try {
      await apiRequest('POST', '/api/chat/reset', {});
    } catch (error) {
      console.error('Reset error:', error);
    }
    setKey(prev => prev + 1);
  };

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
      
      <LanguageSelector 
        isOpen={showLanguageSelector}
        onSelectLanguage={handleSelectLanguage}
      />
      
      <FullscreenHologram 
        isVisible={isHologramVisible}
        duration={hologramDuration}
        onComplete={hideHologram}
      />

      {!isHologramVisible && language && (
        <KioskHeader 
          language={language} 
          onReset={handleReset}
          onLanguageChange={handleLanguageToggle}
        />
      )}

      <main className="flex-1 overflow-hidden" key={key}>
        {language && <ChatInterface language={language} onHologramTrigger={showHologram} />}
      </main>
    </div>
  );
}
