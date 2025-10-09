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
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

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

  const positions = [
    { position: "top-1/4 left-1/2 -translate-x-1/2", rotation: 0 },
    { position: "top-1/2 right-1/4 -translate-y-1/2", rotation: 90 },
    { position: "bottom-1/4 left-1/2 -translate-x-1/2", rotation: 180 },
    { position: "top-1/2 left-1/4 -translate-y-1/2", rotation: 270 }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black pointer-events-none"
          data-testid="fullscreen-hologram"
        >
          {positions.map((pos, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`absolute ${pos.position}`}
              style={{ transform: `${pos.position.includes('translate') ? pos.position.split(' ').filter(c => c.includes('translate')).join(' ') : ''} rotate(${pos.rotation}deg)` }}
            >
              <HologramAvatar size="large" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
