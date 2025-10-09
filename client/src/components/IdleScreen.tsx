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

          {/* Hologram container with 4-sided logos */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              scale: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.8, ease: "easeOut" }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* 4-sided hologram logo display */}
            <div className="relative w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
              {/* Top logo */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  y: 0
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0
                  },
                  y: { duration: 0.8 }
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
                  className="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square flex items-center justify-center bg-white/80"
                >
                  <img 
                    src={logoPath} 
                    alt="Westmead International School" 
                    className="w-[85%] h-[85%] object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Right logo */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  x: 0
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.75
                  },
                  x: { duration: 0.8 }
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
                  className="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square flex items-center justify-center bg-white/80"
                >
                  <img 
                    src={logoPath} 
                    alt="Westmead International School" 
                    className="w-[85%] h-[85%] object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Bottom logo */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  y: 0
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  },
                  y: { duration: 0.8 }
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
                  className="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square flex items-center justify-center bg-white/80"
                >
                  <img 
                    src={logoPath} 
                    alt="Westmead International School" 
                    className="w-[85%] h-[85%] object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Left logo */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  x: 0
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.25
                  },
                  x: { duration: 0.8 }
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
                  className="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 aspect-square flex items-center justify-center bg-white/80"
                >
                  <img 
                    src={logoPath} 
                    alt="Westmead International School" 
                    className="w-[85%] h-[85%] object-contain"
                    data-testid="img-school-logo"
                  />
                </motion.div>
              </motion.div>

              {/* Center glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-cyan-500/30 blur-2xl"
              />
            </div>

            {/* School name text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                WESTMEAD INTERNATIONAL SCHOOL
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mt-2 text-cyan-400 text-sm md:text-base"
              >
                Touch to continue
              </motion.p>
            </motion.div>
          </motion.div>

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
