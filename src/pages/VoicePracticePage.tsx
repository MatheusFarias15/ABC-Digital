import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Mic, MicOff } from "lucide-react";
import useSpeech from "@/hooks/useSpeech";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import AudioButton from "@/components/AudioButton";

interface PracticeItem {
  text: string;
  type: "letra" | "silaba" | "palavra";
  emoji: string;
}

const practiceItems: PracticeItem[] = [
  { text: "A", type: "letra", emoji: "🍎" },
  { text: "E", type: "letra", emoji: "⭐" },
  { text: "I", type: "letra", emoji: "🏝️" },
  { text: "O", type: "letra", emoji: "👁️" },
  { text: "U", type: "letra", emoji: "🍇" },
  { text: "BA", type: "silaba", emoji: "🍌" },
  { text: "MA", type: "silaba", emoji: "👩" },
  { text: "PA", type: "silaba", emoji: "👨" },
  { text: "BOLA", type: "palavra", emoji: "⚽" },
  { text: "CASA", type: "palavra", emoji: "🏠" },
  { text: "GATO", type: "palavra", emoji: "🐱" },
  { text: "SOL", type: "palavra", emoji: "☀️" },
];

const VoicePracticePage = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);

  const item = practiceItems[currentIdx];

  const { speak } = useSpeech(
    item
      ? `Pratique sua voz. Toque no microfone e diga: ${item.text}`
      : `Parabéns! Você acertou ${score} de ${practiceItems.length}!`,
  );

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const handleResult = useCallback(
    (transcript: string) => {
      if (!item) return;
      const said = normalize(transcript);
      const expected = normalize(item.text);
      const isCorrect = said.includes(expected) || expected.includes(said);

      setFeedback(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        setScore((s) => s + 1);
        speak("Muito bem! Você falou corretamente!");
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 660;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch {}
      } else {
        speak(`Você disse: ${transcript}. Tente dizer: ${item.text}`);
      }

      setTimeout(() => {
        setFeedback(null);
        if (isCorrect) {
          setCurrentIdx((i) => i + 1);
        }
      }, 2000);
    },
    [item, speak],
  );

  const { isSupported, isListening, transcript, startListening, stopListening } =
    useSpeechRecognition({
      onResult: handleResult,
    });

  // Finished screen
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
          🎤
        </motion.div>
        <h1 className="text-3xl font-black text-foreground mb-2">Parabéns!</h1>
        <p className="text-xl text-muted-foreground font-semibold mb-6">
          Você praticou {score} sons corretamente!
        </p>
        <div className="flex gap-1 mb-8">
          {practiceItems.map((_, i) => (
            <span key={i} className="text-2xl">
              {i < score ? "⭐" : "☆"}
            </span>
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="p-2 rounded-xl bg-card shadow">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <div className="flex-1 bg-muted rounded-full h-3">
          <div
            className="bg-accent h-3 rounded-full transition-all"
            style={{ width: `${((currentIdx + 1) / practiceItems.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">
          {currentIdx + 1}/{practiceItems.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          key={currentIdx}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-8xl">{item.emoji}</span>

          <div className="bg-card rounded-3xl px-16 py-8 shadow-lg border-2 border-border">
            <h2 className="text-7xl font-black text-foreground text-center">{item.text}</h2>
          </div>

          <AudioButton size="lg" onClick={() => speak(item.text)} />

          <p className="text-muted-foreground font-bold text-center">
            🎤 Toque no microfone e diga: <span className="text-foreground">{item.text}</span>
          </p>

          {!isSupported ? (
            <p className="text-destructive font-bold text-center">
              Seu navegador não suporta reconhecimento de voz 😔
            </p>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={
                isListening
                  ? { scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 0 20px rgba(239,68,68,0.3)", "0 0 0 0 rgba(239,68,68,0)"] }
                  : {}
              }
              transition={isListening ? { repeat: Infinity, duration: 1.5 } : {}}
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-colors ${
                isListening
                  ? "bg-destructive"
                  : "bg-primary"
              }`}
            >
              {isListening ? (
                <MicOff size={40} className="text-destructive-foreground" />
              ) : (
                <Mic size={40} className="text-primary-foreground" />
              )}
            </motion.button>
          )}

          {isListening && transcript && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-muted-foreground"
            >
              Ouvindo: "{transcript}"
            </motion.p>
          )}

          {feedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-center p-4 rounded-2xl ${
                feedback === "correct" ? "bg-success/20" : "bg-destructive/20"
              }`}
            >
              <span className="text-5xl">{feedback === "correct" ? "🎉" : "💪"}</span>
              <p className="text-lg font-black text-foreground mt-2">
                {feedback === "correct" ? "Muito bem!" : "Tente de novo!"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VoicePracticePage;
