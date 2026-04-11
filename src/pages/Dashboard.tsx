import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, RotateCcw, ArrowRight, Mic, BookOpenText } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import mascot from "@/assets/mascot.png";
import useSpeech from "@/hooks/useSpeech";

const Dashboard = () => {
  const navigate = useNavigate();

  useSpeech(
    "Olá! Você está na tela inicial. " +
    "Botão 1: Aprender, para começar uma aula nova. " +
    "Botão 2: Continuar, para seguir de onde parou. " +
    "Botão 3: Histórias, para ouvir e completar histórias. " +
    "Botão 4: Praticar Voz, para treinar sua pronúncia com o microfone.",
  );

  const actions = [
    { icon: BookOpen, label: "Aprender", emoji: "📚", color: "bg-primary", path: "/modules" },
    { icon: ArrowRight, label: "Continuar", emoji: "▶️", color: "bg-secondary", path: "/modules" },
    { icon: BookOpenText, label: "Histórias", emoji: "📖", color: "bg-accent", path: "/stories" },
    { icon: Mic, label: "Praticar Voz", emoji: "🎤", color: "bg-warning", path: "/voice-practice" },
    { icon: RotateCcw, label: "Revisar", emoji: "🔄", color: "bg-muted", path: "/modules" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-6 pt-10 pb-12 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <img src={mascot} alt="" className="w-14 h-14 bg-card rounded-full p-1" />
          <div>
            <p className="text-primary-foreground/80 font-semibold text-sm">Olá! 👋</p>
            <h1 className="text-primary-foreground text-xl font-black">Vamos aprender!</h1>
          </div>
        </div>

        <div className="bg-primary-foreground/20 rounded-full h-4 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-primary-foreground h-4 rounded-full"
          />
        </div>
        <p className="text-primary-foreground/80 text-sm font-bold mt-2">25% concluído ⭐</p>
      </div>

      <div className="px-6 -mt-6 space-y-3">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className={`w-full ${action.color} rounded-3xl p-5 flex items-center gap-4 shadow-lg`}
          >
            <span className="text-4xl">{action.emoji}</span>
            <span className="text-xl font-black text-primary-foreground">{action.label}</span>
            <ArrowRight className="ml-auto text-primary-foreground" size={28} />
          </motion.button>
        ))}
      </div>

      <div className="px-6 mt-6 grid grid-cols-3 gap-3">
        {[
          { value: "2", label: "Aulas", emoji: "📖" },
          { value: "5", label: "Acertos", emoji: "✅" },
          { value: "1", label: "Nível", emoji: "⭐" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-card rounded-2xl p-4 flex flex-col items-center shadow-md"
          >
            <span className="text-2xl">{stat.emoji}</span>
            <span className="text-2xl font-black text-foreground">{stat.value}</span>
            <span className="text-xs font-bold text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
