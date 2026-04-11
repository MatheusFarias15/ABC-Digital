import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Check, X } from "lucide-react";
import { exercises } from "@/data/mockData";
import AudioButton from "@/components/AudioButton";
import useSpeech from "@/hooks/useSpeech";

const ExercisePage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const exercise = exercises[currentIdx];

  const { speak } = useSpeech(
    exercise ? exercise.questionText : `Parabéns! Você acertou ${score} de ${exercises.length}. Muito bem!`
  );

  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h1 className="text-3xl font-black text-foreground mb-2">Parabéns!</h1>
        <p className="text-xl text-muted-foreground font-semibold mb-2">
          Você acertou {score} de {exercises.length}
        </p>
        <div className="flex gap-1 mb-8">
          {Array.from({ length: exercises.length }).map((_, i) => (
            <span key={i} className="text-3xl">{i < score ? "⭐" : "☆"}</span>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/dashboard")}
          className="btn-learning bg-primary text-primary-foreground w-full max-w-sm"
        >
          🏠 Início
        </motion.button>
      </div>
    );
  }

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelected(optionId);
    const option = exercise.options.find((o) => o.id === optionId);
    const correct = option?.isCorrect ?? false;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);

    // Speak feedback
    speak(correct ? "Muito bem! Você acertou!" : "Não foi dessa vez. Tente de novo na próxima!");

    // Play feedback sound
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = correct ? 660 : 200;
      osc.type = correct ? "sine" : "square";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setCurrentIdx((i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <button onClick={() => navigate("/modules")} className="p-2 rounded-xl bg-card shadow">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <div className="flex-1 bg-muted rounded-full h-3">
          <div
            className="bg-secondary h-3 rounded-full transition-all"
            style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        <AudioButton size="lg" className="mb-6" onClick={() => speak(exercise.questionText)} />
        <h2 className="text-xl font-black text-foreground text-center mb-8">
          {exercise.questionText}
        </h2>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          {exercise.options.map((option) => {
            let borderClass = "border-border";
            if (showFeedback && selected === option.id) {
              borderClass = isCorrect ? "border-success" : "border-destructive";
            }
            if (showFeedback && option.isCorrect) {
              borderClass = "border-success";
            }

            return (
              <motion.button
                key={option.id}
                whileTap={!showFeedback ? { scale: 0.95 } : {}}
                animate={
                  showFeedback && selected === option.id && !isCorrect
                    ? { x: [0, -8, 8, -8, 0] }
                    : {}
                }
                onClick={() => handleSelect(option.id)}
                className={`card-module flex items-center gap-4 border-3 ${borderClass}`}
              >
                <img src={option.imageUrl} alt="" className="w-16 h-16 object-contain" />
                <span className="text-lg font-black text-card-foreground">{option.content}</span>
                {showFeedback && option.isCorrect && (
                  <Check className="ml-auto text-success" size={28} />
                )}
                {showFeedback && selected === option.id && !option.isCorrect && (
                  <X className="ml-auto text-destructive" size={28} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className={`px-6 py-6 ${isCorrect ? "bg-success/10" : "bg-destructive/10"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{isCorrect ? "🎉" : "💪"}</span>
            <div>
              <p className="text-lg font-black text-foreground">
                {isCorrect ? "Muito bem!" : "Tente de novo!"}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {isCorrect ? "Você acertou!" : "Não desista, continue praticando!"}
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            className="btn-learning bg-primary text-primary-foreground w-full"
          >
            Próximo ➡️
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ExercisePage;
