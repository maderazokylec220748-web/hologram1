import { motion } from "framer-motion";
import avatarImage from "@assets/image_1759819806739.png";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeClasses = size === "large" 
    ? "w-40 h-52 md:w-48 md:h-60"
    : "w-20 h-28 md:w-24 md:h-32";

  const renderPanel = (rotation: number, position: string) => (
    <div className={`relative ${sizeClasses}`}>
      {/* Holographic glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main hologram panel */}
      <div 
        className="relative w-full h-full rounded-lg border-2 border-cyan-400/50 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 backdrop-blur-sm overflow-hidden"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
        
        {/* Person image with holographic effect */}
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <img 
            src={avatarImage}
            alt="Hologram Assistant"
            className="w-full h-full object-cover object-top opacity-70 mix-blend-screen"
            style={{ 
              transform: `rotate(${-rotation}deg)`,
              filter: 'brightness(1.2) contrast(1.1) hue-rotate(180deg)'
            }}
          />
        </div>

        {/* Cyan overlay for holographic effect */}
        <div className="absolute inset-0 bg-cyan-400/20 mix-blend-color" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full h-full flex items-center justify-center"
      data-testid="hologram-avatar"
    >
      {/* Pepper's Ghost Hologram - 4-way diamond layout matching reference */}
      <div className="relative w-[800px] h-[800px]">
        {/* Top view - 0° rotation */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-[8%]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.6 }}
        >
          {renderPanel(0, "top")}
        </motion.div>

        {/* Right view - 270° rotation (90° clockwise) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-[8%]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {renderPanel(270, "right")}
        </motion.div>

        {/* Bottom view - 180° rotation */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-[8%]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {renderPanel(180, "bottom")}
        </motion.div>

        {/* Left view - 90° rotation (90° counter-clockwise) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 left-[8%]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          {renderPanel(90, "left")}
        </motion.div>

        {/* Center glow for hologram effect */}
        <motion.div
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"
        />
      </div>
    </motion.div>
  );
}
