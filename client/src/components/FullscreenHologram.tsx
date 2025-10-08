import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import HologramAvatar from "./HologramAvatar";

interface FullscreenHologramProps {
  isVisible: boolean;
  duration?: number;
  onComplete?: () => void;
}

export default function FullscreenHologram({ isVisible, duration = 5000, onComplete }: FullscreenHologramProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible && onComplete) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set timer to auto-hide
      timerRef.current = setTimeout(() => {
        onComplete();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible, duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-sm pointer-events-none"
          data-testid="fullscreen-hologram"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <HologramAvatar size="large" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
