import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeConfig = size === "large"
    ? { 
        width: 280, 
        height: 280, 
        iconSize: 140,
        glowSize: "80px",
      }
    : { 
        width: 120, 
        height: 120, 
        iconSize: 60,
        glowSize: "40px",
      };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: sizeConfig.width, height: sizeConfig.height }}
      data-testid="hologram-avatar"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-radial from-cyan-400/30 via-cyan-400/10 to-transparent rounded-full blur-2xl animate-pulse" />
        
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none rounded-full" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div 
              className="relative"
              style={{
                filter: `drop-shadow(0 0 ${sizeConfig.glowSize} rgba(6, 182, 212, 0.8))`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GraduationCap 
                  className="text-cyan-300"
                  style={{ 
                    width: sizeConfig.iconSize, 
                    height: sizeConfig.iconSize,
                    filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 1))"
                  }}
                />
              </motion.div>
            </div>
            
            {size === "large" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <div className="text-cyan-300 font-bold text-lg tracking-wider uppercase">
                  WIS AI
                </div>
                <div className="text-cyan-400/70 text-sm mt-1">
                  Student Assistant
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
          </div>
        </div>

        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-cyan-400/30 blur-xl rounded-full"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-cyan-400"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                position: 'absolute',
                top: `${Math.sin((i * Math.PI) / 2) * sizeConfig.width * 0.45}px`,
                left: `${Math.cos((i * Math.PI) / 2) * sizeConfig.width * 0.45}px`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
