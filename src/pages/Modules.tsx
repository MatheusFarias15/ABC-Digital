import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { modules } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";
import useSpeech from "@/hooks/useSpeech";

const Modules = () => {
  const navigate = useNavigate();
  const speechText = modules
    .map((mod, i) => `Tópico ${i + 1}: ${mod.title}. ${mod.description}.`)
    .join(" ");

  const { speak } = useSpeech(
    `Escolha um módulo para começar. ${speechText} Toque no que você quer aprender.`
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="p-2 rounded-xl bg-card shadow">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground">Módulos 📚</h1>
      </div>

      <div className="px-6 space-y-4">
        {modules.map((mod, i) => (
          <motion.button
            key={mod.id}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              speak(mod.title);
              setTimeout(() => navigate(`/lesson/${mod.id}`), 800);
            }}
            className="card-module w-full flex items-center gap-4 text-left"
          >
            <div className={`${mod.color} rounded-2xl p-4 text-3xl`}>
              {mod.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg text-card-foreground">{mod.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-muted rounded-full h-2.5">
                  <div
                    className={`${mod.color} h-2.5 rounded-full transition-all`}
                    style={{ width: `${(mod.completedLessons / mod.lessonsCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-muted-foreground">
                  {mod.completedLessons}/{mod.lessonsCount}
                </span>
              </div>
            </div>
            <span className="text-2xl">▶️</span>
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Modules;
