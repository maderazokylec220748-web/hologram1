import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeConfig = size === "large"
    ? { 
        width: 320, 
        height: 480, 
        translateZ: 160, 
        iconSize: 120,
        glowSize: "64px",
        perspective: "2000px",
        containerSize: "w-[400px] h-[600px]"
      }
    : { 
        width: 160, 
        height: 240, 
        translateZ: 80, 
        iconSize: 60,
        glowSize: "32px",
        perspective: "1000px",
        containerSize: "w-[200px] h-[300px]"
      };

  const sides = [
    { label: "Front", rotateY: 0, translateZ: sizeConfig.translateZ },
    { label: "Right", rotateY: 90, translateZ: sizeConfig.translateZ },
    { label: "Back", rotateY: 180, translateZ: sizeConfig.translateZ },
    { label: "Left", rotateY: -90, translateZ: sizeConfig.translateZ }
  ];

  return (
    <div 
      className={`relative ${sizeConfig.containerSize} flex items-center justify-center`}
      style={{ perspective: sizeConfig.perspective }}
      data-testid="hologram-avatar"
    >
      <motion.div
        className="relative"
        style={{
          width: sizeConfig.width,
          height: sizeConfig.height,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {sides.map((side, index) => (
          <motion.div
            key={side.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${side.rotateY}deg) translateZ(${side.translateZ}px)`,
            }}
          >
            <div className="relative w-full h-full border-2 border-cyan-400/40 bg-gradient-to-b from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-lg backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/5 to-transparent animate-scan pointer-events-none rounded-lg" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div 
                  className="relative"
                  style={{
                    filter: `drop-shadow(0 0 ${sizeConfig.glowSize} rgba(6, 182, 212, 0.6))`,
                  }}
                >
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" 
                       style={{ 
                         width: sizeConfig.iconSize * 1.5, 
                         height: sizeConfig.iconSize * 1.5,
                         marginLeft: -(sizeConfig.iconSize * 0.25),
                         marginTop: -(sizeConfig.iconSize * 0.25)
                       }} 
                  />
                  
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <GraduationCap 
                      className="text-cyan-400"
                      style={{ 
                        width: sizeConfig.iconSize, 
                        height: sizeConfig.iconSize,
                        filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))"
                      }}
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <div className="text-cyan-300 font-bold text-sm tracking-wider uppercase">
                    WIS AI
                  </div>
                  <div className="text-cyan-400/60 text-xs mt-1">
                    Student Assistant
                  </div>
                </motion.div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
            </div>
          </motion.div>
        ))}
        
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-cyan-400/20 blur-xl rounded-full"
          style={{
            transform: "translateX(-50%) translateZ(-50px) rotateX(90deg)",
          }}
        />
      </motion.div>
    </div>
  );
}
