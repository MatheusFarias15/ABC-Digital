import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { achievements } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";
import useSpeech from "@/hooks/useSpeech";

// Mock data for progress charts
const weeklyData = [
  { day: "Seg", score: 3 },
  { day: "Ter", score: 5 },
  { day: "Qua", score: 2 },
  { day: "Qui", score: 7 },
  { day: "Sex", score: 4 },
  { day: "Sáb", score: 6 },
  { day: "Dom", score: 8 },
];

const letterDifficulty = [
  { letter: "A", level: 1 },
  { letter: "B", level: 1 },
  { letter: "C", level: 2 },
  { letter: "D", level: 3 },
  { letter: "E", level: 1 },
  { letter: "F", level: 3 },
  { letter: "G", level: 2 },
  { letter: "H", level: 3 },
  { letter: "I", level: 1 },
  { letter: "J", level: 3 },
];

const getDifficultyColor = (level: number) => {
  if (level === 1) return "bg-success";
  if (level === 2) return "bg-warning";
  return "bg-destructive";
};

const Progress = () => {
  const navigate = useNavigate();

  useSpeech(
    "Seu progresso. Você está no nível 1, Iniciante. Você completou 25 por cento. " +
    "Seu melhor dia foi domingo com 8 acertos. " +
    "As letras mais difíceis para você são D, F, H e J. Continue praticando!",
  );

  const maxScore = Math.max(...weeklyData.map((d) => d.score));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-black text-foreground mb-6">Progresso 🏆</h1>

        {/* Level card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl p-6 shadow-lg mb-6 flex items-center gap-4"
        >
          <div className="bg-secondary rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-md">
            ⭐
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Nível</p>
            <p className="text-3xl font-black text-foreground">1</p>
            <p className="text-sm font-semibold text-muted-foreground">Iniciante</p>
          </div>
        </motion.div>

        {/* Overall progress */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <p className="font-bold text-muted-foreground mb-3">Progresso Geral</p>
          <div className="relative">
            <div className="bg-muted rounded-full h-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "25%" }}
                transition={{ duration: 1 }}
                className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
              >
                <span className="text-xs font-black text-primary-foreground">25%</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Weekly chart */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <p className="font-bold text-muted-foreground mb-4">📊 Evolução Semanal</p>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.score / maxScore) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-primary rounded-t-lg min-h-[4px]"
                />
                <span className="text-xs font-bold text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Letter difficulty heatmap */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <p className="font-bold text-muted-foreground mb-2">🔥 Dificuldade por Letra</p>
          <p className="text-xs text-muted-foreground mb-4">
            🟢 Fácil &nbsp; 🟡 Médio &nbsp; 🔴 Difícil
          </p>
          <div className="grid grid-cols-5 gap-2">
            {letterDifficulty.map((ld, i) => (
              <motion.div
                key={ld.letter}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`${getDifficultyColor(ld.level)} rounded-xl p-3 flex flex-col items-center`}
              >
                <span className="text-lg font-black text-white">{ld.letter}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey map button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/progress-map")}
          className="w-full bg-card rounded-3xl p-5 shadow-lg mb-6 flex items-center gap-4"
        >
          <span className="text-4xl">🗺️</span>
          <div className="text-left">
            <p className="font-black text-lg text-foreground">Mapa da Jornada</p>
            <p className="text-sm font-semibold text-muted-foreground">
              Veja seu caminho completo
            </p>
          </div>
          <span className="ml-auto text-2xl">▶️</span>
        </motion.button>

        {/* Achievements */}
        <h2 className="text-xl font-black text-foreground mb-4">Conquistas 🎖️</h2>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`bg-card rounded-2xl p-4 flex flex-col items-center shadow-md ${
                !ach.unlocked ? "opacity-40 grayscale" : ""
              }`}
            >
              <span className="text-3xl mb-1">{ach.icon}</span>
              <span className="text-xs font-bold text-center text-card-foreground">
                {ach.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Progress;
