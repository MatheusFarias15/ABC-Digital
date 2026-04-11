import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

interface AudioButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  sm: { icon: 20, button: "p-2" },
  md: { icon: 28, button: "p-3" },
  lg: { icon: 36, button: "p-4" },
};

const AudioButton = ({ size = "md", className = "", onClick }: AudioButtonProps) => {
  const s = sizeMap[size];

  const handleClick = () => {
    // Play a click sound effect via Web Audio API
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 520;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
    onClick?.();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      className={`bg-accent rounded-full shadow-md ${s.button} ${className}`}
    >
      <Volume2 size={s.icon} className="text-accent-foreground" />
    </motion.button>
  );
};

export default AudioButton;
