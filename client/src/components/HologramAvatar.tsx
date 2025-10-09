import { motion } from "framer-motion";
import studentPhoto from "@assets/346137222_1889194298129054_6236466007637640536_n_1759993951636.jpg";

interface HologramAvatarProps {
  size?: "small" | "large";
}

export default function HologramAvatar({ size = "small" }: HologramAvatarProps) {
  const sizeConfig = size === "large"
    ? { 
        width: 280, 
        height: 280, 
        glowSize: "80px",
      }
    : { 
        width: 120, 
        height: 120, 
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
        <div className="absolute inset-0 bg-gradient-radial from-cyan-400/30 via-cyan-400/10 to-transparent blur-2xl animate-pulse" />
        
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(6, 182, 212, 0.3)",
              "0 0 60px rgba(6, 182, 212, 0.5)",
              "0 0 20px rgba(6, 182, 212, 0.3)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-2 border-cyan-400/40 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <motion.img
              src={studentPhoto}
              alt="WIS Student Assistant"
              className="w-full h-full object-cover"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.6))"
              }}
            />
          </div>
          
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
          </div>
        </motion.div>

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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
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
                top: `${Math.sin((i * Math.PI) / 2) * sizeConfig.width * 0.5}px`,
                left: `${Math.cos((i * Math.PI) / 2) * sizeConfig.width * 0.5}px`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
