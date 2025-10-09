import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/image_1759903949194.png";

interface IdleScreenProps {
  isVisible: boolean;
}

export default function IdleScreen({ isVisible }: IdleScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          data-testid="idle-screen"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          </div>

          {/* Holographic glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent pointer-events-none"
          />

          {/* Hologram Cross Layout (✚) - 4 views for pyramid glass reflection */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Top view (Front) */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 60px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square flex items-center justify-center bg-white/90"
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-[85%] h-[85%] object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Right view (Right side) - rotated 90° */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.75
                }
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 60px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square flex items-center justify-center bg-white/90"
                style={{ transform: 'rotateY(90deg)' }}
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-[85%] h-[85%] object-contain"
                  style={{ transform: 'rotateY(-90deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Bottom view (Back) - rotated 180° */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 60px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square flex items-center justify-center bg-white/90"
                style={{ transform: 'rotate(180deg)' }}
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-[85%] h-[85%] object-contain"
                  style={{ transform: 'rotate(-180deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Left view (Left side) - rotated 270° */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.25
                }
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 60px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 aspect-square flex items-center justify-center bg-white/90"
                style={{ transform: 'rotateY(-90deg)' }}
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-[85%] h-[85%] object-contain"
                  data-testid="img-school-logo"
                  style={{ transform: 'rotateY(90deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Center area - empty for pyramid glass placement */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-cyan-500/20 blur-xl z-0"
            />
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
