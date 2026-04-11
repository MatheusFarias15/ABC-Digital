import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import useSpeech from "@/hooks/useSpeech";

interface MapNode {
  id: string;
  emoji: string;
  label: string;
  completed: boolean;
  current: boolean;
  x: number;
  y: number;
}

const mapNodes: MapNode[] = [
  { id: "1", emoji: "🔤", label: "Vogais", completed: true, current: false, x: 50, y: 90 },
  { id: "2", emoji: "🅰️", label: "Letra A-E", completed: true, current: false, x: 30, y: 75 },
  { id: "3", emoji: "🅱️", label: "Letra F-J", completed: false, current: true, x: 65, y: 62 },
  { id: "4", emoji: "📝", label: "Sílabas BA", completed: false, current: false, x: 40, y: 48 },
  { id: "5", emoji: "📝", label: "Sílabas MA", completed: false, current: false, x: 60, y: 35 },
  { id: "6", emoji: "📖", label: "Palavras", completed: false, current: false, x: 35, y: 22 },
  { id: "7", emoji: "💬", label: "Frases", completed: false, current: false, x: 55, y: 10 },
  { id: "8", emoji: "🏆", label: "Formatura!", completed: false, current: false, x: 50, y: 0 },
];

const ProgressMapPage = () => {
  const navigate = useNavigate();

  useSpeech(
    "Mapa do seu progresso. Você já completou as Vogais e as letras A até E. Agora está nas letras F até J. Continue praticando para avançar no mapa!",
  );

  // Letter collection
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const masteredLetters = ["A", "B", "C", "D", "E"];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/progress")} className="p-2 rounded-xl bg-card shadow">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-2xl font-black text-foreground">Mapa da Jornada 🗺️</h1>
      </div>

      {/* Visual journey map */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-3xl p-6 shadow-lg relative" style={{ minHeight: 420 }}>
          {/* Path line */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 90 C 30 80, 30 75, 30 75 C 30 70, 65 65, 65 62 C 65 55, 40 50, 40 48 C 40 42, 60 38, 60 35 C 60 28, 35 25, 35 22 C 35 15, 55 12, 55 10 C 55 5, 50 2, 50 0"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="2"
              strokeDasharray="3,2"
            />
          </svg>

          {mapNodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={
                  node.current
                    ? { scale: [1, 1.2, 1], y: [0, -5, 0] }
                    : {}
                }
                transition={node.current ? { repeat: Infinity, duration: 2 } : {}}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md ${
                  node.completed
                    ? "bg-success"
                    : node.current
                      ? "bg-primary"
                      : "bg-muted opacity-50"
                }`}
              >
                {node.completed ? "✅" : node.emoji}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Star collection - letters mastered */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-black text-foreground mb-3">Coleção de Estrelas ⭐</h2>
        <div className="bg-card rounded-3xl p-4 shadow-lg">
          <div className="grid grid-cols-7 gap-2">
            {allLetters.map((letter) => {
              const mastered = masteredLetters.includes(letter);
              return (
                <motion.div
                  key={letter}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                    mastered
                      ? "bg-warning text-warning-foreground shadow-md"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {mastered ? "⭐" : letter}
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-sm font-bold text-muted-foreground mt-3">
            {masteredLetters.length}/26 letras dominadas
          </p>
        </div>
      </div>

      {/* Trophies */}
      <div className="px-6">
        <h2 className="text-xl font-black text-foreground mb-3">Troféus 🏆</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🏆", title: "Vogais", unlocked: true },
            { emoji: "🥇", title: "Consoantes", unlocked: false },
            { emoji: "🎖️", title: "Sílabas", unlocked: false },
            { emoji: "👑", title: "Palavrinhas", unlocked: false },
          ].map((trophy, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`bg-card rounded-2xl p-4 flex flex-col items-center shadow-md ${
                !trophy.unlocked ? "opacity-40 grayscale" : ""
              }`}
            >
              <span className="text-4xl mb-1">{trophy.emoji}</span>
              <span className="text-sm font-bold text-card-foreground">{trophy.title}</span>
              {trophy.unlocked && (
                <span className="text-xs font-bold text-success mt-1">Completo!</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProgressMapPage;
