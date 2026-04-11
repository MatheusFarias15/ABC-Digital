import { useState } from "react";
import { Volume2, Globe, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import useSpeech from "@/hooks/useSpeech";

const SettingsPage = () => {
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);

  useSpeech("Configurações. Aqui você pode ajustar o volume e a velocidade do áudio.");

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-black text-foreground mb-6">Configurações ⚙️</h1>

        <div className="space-y-4">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-card rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary rounded-xl p-2">
                <Volume2 size={24} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-card-foreground">Volume</span>
              <span className="ml-auto text-lg font-black text-foreground">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent rounded-xl p-2">
                <Gauge size={24} className="text-accent-foreground" />
              </div>
              <span className="text-lg font-bold text-card-foreground">Velocidade do Áudio</span>
            </div>
            <div className="flex gap-2">
              {[{ label: "🐢", value: 25 }, { label: "🚶", value: 50 }, { label: "🏃", value: 75 }].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSpeed(s.value)}
                  className={`flex-1 py-3 rounded-2xl text-2xl font-bold transition-all ${
                    speed === s.value
                      ? "bg-accent shadow-md scale-105"
                      : "bg-muted"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="bg-secondary rounded-xl p-2">
                <Globe size={24} className="text-secondary-foreground" />
              </div>
              <span className="text-lg font-bold text-card-foreground">Idioma</span>
              <span className="ml-auto text-lg font-bold text-muted-foreground">🇧🇷 Português</span>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
