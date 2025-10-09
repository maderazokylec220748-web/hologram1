import { motion } from "framer-motion";
import logoImage from "@assets/image_1759903949194.png";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeClasses = size === "large" 
    ? "w-40 h-40 md:w-48 md:h-48"
    : "w-28 h-28 md:w-32 md:h-32";

  const renderPanel = (rotation: number, position: string) => (
    <div className={`relative ${sizeClasses}`}>
      {/* Holographic glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-md"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main hologram panel - circular */}
      <div 
        className="relative w-full h-full rounded-full border-2 border-cyan-400/50 bg-white/90 backdrop-blur-sm overflow-hidden flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
        
        {/* Logo with proper rotation */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img 
            src={logoImage}
            alt="Westmead International School"
            className="w-full h-full object-contain"
            style={{ 
              transform: `rotate(${-rotation}deg)`
            }}
          />
        </div>

        {/* Subtle cyan overlay for holographic effect */}
        <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay" />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-md mx-auto aspect-square"
      data-testid="hologram-avatar"
    >
      {/* Pepper's Ghost Hologram - 4-way pyramid layout */}
      <div className="relative w-full h-full">
        {/* Top view - 0° rotation */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          {renderPanel(0, "top")}
        </motion.div>

        {/* Right view - 270° rotation (90° clockwise) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          {renderPanel(270, "right")}
        </motion.div>

        {/* Bottom view - 180° rotation */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {renderPanel(180, "bottom")}
        </motion.div>

        {/* Left view - 90° rotation (90° counter-clockwise) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          {renderPanel(90, "left")}
        </motion.div>

        {/* Center glow for hologram effect */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-500/30 blur-2xl"
        />
      </div>
    </motion.div>
  );
}
