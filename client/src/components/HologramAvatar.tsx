import { motion } from "framer-motion";
import avatarImage from "@assets/image_1759813985087.png";

export default function HologramAvatar() {
  const angles = [
    { label: "Front", rotation: 0, scale: 1 },
    { label: "Right", rotation: -15, scale: 0.9 },
    { label: "Back", rotation: 180, scale: 0.85 },
    { label: "Left", rotation: 15, scale: 0.9 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex gap-3 mb-4"
      data-testid="hologram-avatar"
    >
      {angles.map((angle, index) => (
        <motion.div
          key={angle.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative w-20 h-28">
            {/* Holographic glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm animate-pulse" />
            
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
                    transform: `perspective(200px) rotateY(${angle.rotation}deg) scale(${angle.scale})`,
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
          
          {/* Angle label */}
          <span className="text-xs text-cyan-400/70 font-mono">{angle.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
