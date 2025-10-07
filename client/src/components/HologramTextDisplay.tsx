import { motion } from "framer-motion";

interface HologramTextDisplayProps {
  content: string;
}

export default function HologramTextDisplay({ content }: HologramTextDisplayProps) {
  const sides = [
    { label: "Front", rotateY: 0, translateZ: 150 },
    { label: "Right", rotateY: 90, translateZ: 150 },
    { label: "Back", rotateY: 180, translateZ: 150 },
    { label: "Left", rotateY: -90, translateZ: 150 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full min-h-[280px] flex items-center justify-center my-6"
      data-testid="hologram-text-display"
      style={{ perspective: "1000px" }}
    >
      <div 
        className="relative w-[300px] h-[200px]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-10deg) rotateY(15deg)",
        }}
      >
        {sides.map((side, index) => (
          <motion.div
            key={side.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${side.rotateY}deg) translateZ(${side.translateZ}px)`,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-md animate-pulse" />
              
              <div className="relative glass border-2 border-cyan-400/50 rounded-lg p-4 w-full h-full flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan pointer-events-none rounded-lg" />
                
                <div className="relative z-10">
                  <p className="text-xs leading-relaxed text-cyan-100/90 font-medium">
                    {content}
                  </p>
                </div>

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <span className="text-xs text-cyan-400/70 font-mono">{side.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
