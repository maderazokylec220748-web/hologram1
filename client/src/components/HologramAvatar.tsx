import { motion } from "framer-motion";
import avatarImage from "@assets/image_1759819806739.png";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeClasses = size === "large" 
    ? "w-32 h-40 md:w-40 md:h-48"
    : "w-24 h-32 md:w-28 md:h-36";

  const renderPanel = (rotation: number, position: string) => (
    <div className={`relative ${sizeClasses}`}>
      {/* Holographic glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Main hologram panel */}
      <div className="relative w-full h-full rounded-lg border-2 border-cyan-400/50 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 backdrop-blur-sm overflow-hidden">
        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
        
        {/* Person image with holographic effect */}
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <img 
            src={avatarImage}
            alt="Hologram Assistant"
            className="w-full h-full object-cover object-top opacity-70 mix-blend-screen"
            style={{ 
              transform: `perspective(300px) rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
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
      className="relative w-full h-64 md:h-80 mx-auto"
      data-testid="hologram-avatar"
    >
      {/* Pepper's Ghost Hologram Cross Layout (✚) - 4 views for pyramid glass */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Top view (Front) */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '0' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          {renderPanel(0, "top")}
        </motion.div>

        {/* Right view (Right side) - rotated 90° */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: '0' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          {renderPanel(90, "right")}
        </motion.div>

        {/* Bottom view (Back) - rotated 180° */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: '0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {renderPanel(180, "bottom")}
        </motion.div>

        {/* Left view (Left side) - rotated 270° */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: '0' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          {renderPanel(270, "left")}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-500/30 blur-2xl"
        />
      </div>
    </motion.div>
  );
}
