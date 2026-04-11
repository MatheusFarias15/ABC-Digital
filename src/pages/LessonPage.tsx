import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { lessons } from "@/data/mockData";
import AudioButton from "@/components/AudioButton";
import useSpeech from "@/hooks/useSpeech";

const LessonPage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const moduleLessons = lessons.filter((l) => l.moduleId === moduleId);
  const [current, setCurrent] = useState(0);

  const lesson = moduleLessons[current];

  const { speak } = useSpeech("", false);

  useEffect(() => {
    if (lesson) {
      const text =
        lesson.contentType === "letra"
          ? `Esta é a letra ${lesson.textContent}. Letra ${lesson.textContent}.`
          : `Esta é a palavra ${lesson.textContent}. ${lesson.textContent}.`;
      setTimeout(() => speak(text), 500);
    }
  }, [current, lesson, speak]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <span className="text-6xl mb-4">📚</span>
        <p className="text-xl font-bold text-foreground mb-6">Em breve!</p>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/modules")}
          className="btn-learning bg-primary text-primary-foreground"
        >
          ← Voltar
        </motion.button>
      </div>
    );
  }

  const goNext = () => {
    if (current < moduleLessons.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate(`/exercise/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <button onClick={() => navigate("/modules")} className="p-2 rounded-xl bg-card shadow">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <div className="flex-1 bg-muted rounded-full h-3">
          <motion.div
            className="bg-primary h-3 rounded-full"
            animate={{ width: `${((current + 1) / moduleLessons.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">
          {current + 1}/{moduleLessons.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={lesson.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="flex flex-col items-center gap-6 w-full max-w-sm"
          >
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              className="w-48 h-48 object-contain drop-shadow-lg"
            />

            <div className="bg-card rounded-3xl px-12 py-6 shadow-lg border-2 border-border">
              <h2 className="text-6xl font-black text-foreground text-center">
                {lesson.textContent}
              </h2>
            </div>

            <AudioButton
              size="lg"
              onClick={() => {
                const text =
                  lesson.contentType === "letra"
                    ? `Letra ${lesson.textContent}`
                    : lesson.textContent;
                speak(text);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={goNext}
          className="btn-learning bg-primary text-primary-foreground w-full flex items-center justify-center gap-3"
        >
          {current < moduleLessons.length - 1 ? (
            <>Próximo <ArrowRight size={24} /></>
          ) : (
            <>Exercícios 🎮</>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default LessonPage;
