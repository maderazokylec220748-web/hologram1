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

          {/* Logo container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Logo with glow effect */}
            <div className="relative">
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
                className="rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 aspect-square"
              >
                <img 
                  src={logoPath} 
                  alt="Westmead International School" 
                  className="w-full h-full object-cover object-center"
                  data-testid="img-school-logo"
                />
              </motion.div>

              {/* Scanning line effect */}
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
              />
            </div>

            {/* School name text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
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
