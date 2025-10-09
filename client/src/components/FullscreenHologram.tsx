import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import HologramAvatar from "./HologramAvatar";

interface FullscreenHologramProps {
  isVisible: boolean;
  duration?: number;
  onComplete?: () => void;
}

export default function FullscreenHologram({ isVisible, duration, onComplete }: FullscreenHologramProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only use timer if duration is provided (when speech is disabled)
    if (isVisible && duration && onComplete) {
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
    { className: "absolute left-1/2 -translate-x-1/2 top-0", rotation: 0, delay: 0 },
    { className: "absolute top-1/2 -translate-y-1/2 right-0", rotation: 270, delay: 0.1 },
    { className: "absolute left-1/2 -translate-x-1/2 bottom-0", rotation: 180, delay: 0.2 },
    { className: "absolute top-1/2 -translate-y-1/2 left-0", rotation: 90, delay: 0.3 }
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: pos.delay, ease: "easeOut" }}
              className={pos.className}
              style={{ transform: `${pos.className.includes('translate') ? pos.className.split(' ').filter(c => c.includes('translate')).join(' ') : ''} rotate(${pos.rotation}deg)` }}
            >
              <HologramAvatar size="large" />
            </motion.div>
          ))}

          {/* Center glow */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-cyan-500/20 blur-xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
