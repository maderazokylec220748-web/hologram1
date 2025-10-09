import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LanguageSelectorProps {
  isOpen: boolean;
  onSelectLanguage: (language: 'english' | 'tagalog') => void;
}

export default function LanguageSelector({ isOpen, onSelectLanguage }: LanguageSelectorProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md glass border-primary/30 !top-[10%] !translate-y-0">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 flex items-center justify-center glow-cyan">
              <Globe className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Choose Your Language
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Piliin ang iyong wika
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => onSelectLanguage('english')}
            size="lg"
            className="w-full text-lg h-14 glow-cyan-hover"
            data-testid="button-select-english"
          >
            English
          </Button>
          <Button
            onClick={() => onSelectLanguage('tagalog')}
            size="lg"
            variant="outline"
            className="w-full text-lg h-14"
            data-testid="button-select-tagalog"
          >
            Tagalog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
