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

          {/* Pepper's Ghost Hologram - 4-way pyramid layout */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Top view - 0° rotation */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0"
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
                className="overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 aspect-square flex items-center justify-center"
                style={{ transform: 'rotate(0deg)' }}
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(0deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Right view - 270° rotation (90° clockwise) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-0"
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
                className="overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 aspect-square flex items-center justify-center"
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(270deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Bottom view - 180° rotation */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0"
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
                className="overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 aspect-square flex items-center justify-center"
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-full h-full object-contain"
                  style={{ transform: 'rotate(180deg)' }}
                />
              </motion.div>
            </motion.div>

            {/* Left view - 90° rotation (90° counter-clockwise) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0"
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
                className="overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 aspect-square flex items-center justify-center"
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-full h-full object-contain"
                  data-testid="img-school-logo"
                  style={{ transform: 'rotate(90deg)' }}
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-cyan-500/20 blur-xl z-0"
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
