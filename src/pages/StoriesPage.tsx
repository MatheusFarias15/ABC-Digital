import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Volume2 } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import useSpeech from "@/hooks/useSpeech";

interface StoryWord {
  word: string;
  isMissing: boolean;
  options?: string[];
}

interface Story {
  id: string;
  title: string;
  emoji: string;
  words: StoryWord[];
  fullText: string;
}

const stories: Story[] = [
  {
    id: "s1",
    title: "O Gato e o Sol",
    emoji: "🐱",
    fullText: "O gato dormia no sol. Ele era bonito e feliz.",
    words: [
      { word: "O", isMissing: false },
      { word: "gato", isMissing: true, options: ["gato", "pato", "rato"] },
      { word: "dormia", isMissing: false },
      { word: "no", isMissing: false },
      { word: "sol", isMissing: true, options: ["sol", "sal", "sul"] },
      { word: ".", isMissing: false },
      { word: "Ele", isMissing: false },
      { word: "era", isMissing: false },
      { word: "bonito", isMissing: true, options: ["bonito", "boneco", "banana"] },
      { word: "e", isMissing: false },
      { word: "feliz", isMissing: false },
      { word: ".", isMissing: false },
    ],
  },
  {
    id: "s2",
    title: "A Casa da Vovó",
    emoji: "🏠",
    fullText: "A casa da vovó é grande. Tem um jardim com flores bonitas.",
    words: [
      { word: "A", isMissing: false },
      { word: "casa", isMissing: true, options: ["casa", "mesa", "vaso"] },
      { word: "da", isMissing: false },
      { word: "vovó", isMissing: false },
      { word: "é", isMissing: false },
      { word: "grande", isMissing: true, options: ["grande", "verde", "triste"] },
      { word: ".", isMissing: false },
      { word: "Tem", isMissing: false },
      { word: "um", isMissing: false },
      { word: "jardim", isMissing: false },
      { word: "com", isMissing: false },
      { word: "flores", isMissing: true, options: ["flores", "cores", "dores"] },
      { word: "bonitas", isMissing: false },
      { word: ".", isMissing: false },
    ],
  },
  {
    id: "s3",
    title: "O Cachorro Brincalhão",
    emoji: "🐕",
    fullText: "O cachorro corre no parque. Ele brinca com a bola azul.",
    words: [
      { word: "O", isMissing: false },
      { word: "cachorro", isMissing: true, options: ["cachorro", "cavalo", "coelho"] },
      { word: "corre", isMissing: false },
      { word: "no", isMissing: false },
      { word: "parque", isMissing: true, options: ["parque", "barco", "banco"] },
      { word: ".", isMissing: false },
      { word: "Ele", isMissing: false },
      { word: "brinca", isMissing: false },
      { word: "com", isMissing: false },
      { word: "a", isMissing: false },
      { word: "bola", isMissing: true, options: ["bola", "mola", "cola"] },
      { word: "azul", isMissing: false },
      { word: ".", isMissing: false },
    ],
  },
];

const StoriesPage = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentMissing, setCurrentMissing] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const missingWords = selectedStory?.words
    .map((w, i) => ({ ...w, index: i }))
    .filter((w) => w.isMissing) ?? [];

  const currentWord = missingWords[currentMissing];

  const { speak } = useSpeech(
    selectedStory
      ? `História: ${selectedStory.title}. Ouça a história e complete as palavras que faltam.`
      : "Histórias interativas. Escolha uma história para ouvir e completar as palavras.",
  );

  const handleSelectOption = useCallback(
    (option: string) => {
      if (!currentWord) return;

      const correct = option === currentWord.word;
      setAnswers((prev) => ({ ...prev, [currentWord.index]: option }));

      if (correct) {
        speak("Muito bem! Você acertou!");
        // Play correct sound
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
        speak(`Não é essa. A palavra certa é: ${currentWord.word}`);
        setAnswers((prev) => ({ ...prev, [currentWord.index]: currentWord.word }));
      }

      setTimeout(() => {
        if (currentMissing < missingWords.length - 1) {
          setCurrentMissing((i) => i + 1);
        } else {
          setShowResult(true);
          const correctCount = Object.entries({ ...answers, [currentWord.index]: option }).filter(
            ([idx, ans]) => {
              const mw = selectedStory?.words[Number(idx)];
              return mw && ans === mw.word;
            },
          ).length;
          speak(
            `Parabéns! Você completou a história! Acertou ${correct ? correctCount : correctCount} de ${missingWords.length} palavras.`,
          );
        }
      }, 1500);
    },
    [currentWord, currentMissing, missingWords, answers, selectedStory, speak],
  );

  // Story selection screen
  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="px-6 pt-8 pb-4 flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-xl bg-card shadow">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <h1 className="text-2xl font-black text-foreground">Histórias 📖</h1>
        </div>

        <div className="px-6 space-y-4">
          {stories.map((story, i) => (
            <motion.button
              key={story.id}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedStory(story);
                setAnswers({});
                setCurrentMissing(0);
                setShowResult(false);
              }}
              className="card-module w-full flex items-center gap-4 text-left"
            >
              <div className="bg-secondary rounded-2xl p-4 text-4xl">{story.emoji}</div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-card-foreground">{story.title}</h3>
                <p className="text-sm text-muted-foreground font-semibold">
                  {story.words.filter((w) => w.isMissing).length} palavras para completar
                </p>
              </div>
              <span className="text-2xl">▶️</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult) {
    const correctCount = Object.entries(answers).filter(([idx, ans]) => {
      const w = selectedStory.words[Number(idx)];
      return w && ans === w.word;
    }).length;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">
          🎉
        </motion.div>
        <h1 className="text-3xl font-black text-foreground mb-2">Parabéns!</h1>
        <p className="text-xl text-muted-foreground font-semibold mb-2">
          Você completou: {selectedStory.title}
        </p>
        <p className="text-lg text-muted-foreground font-semibold mb-6">
          Acertou {correctCount} de {missingWords.length} palavras
        </p>
        <div className="flex gap-1 mb-8">
          {missingWords.map((_, i) => (
            <span key={i} className="text-3xl">
              {answers[missingWords[i].index] === missingWords[i].word ? "⭐" : "☆"}
            </span>
          ))}
        </div>
        <div className="space-y-3 w-full max-w-sm">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setSelectedStory(null);
              setAnswers({});
              setCurrentMissing(0);
              setShowResult(false);
            }}
            className="btn-learning bg-primary text-primary-foreground w-full"
          >
            📖 Mais Histórias
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/dashboard")}
            className="btn-learning bg-card text-foreground border-2 border-border w-full"
          >
            🏠 Início
          </motion.button>
        </div>
      </div>
    );
  }

  // Story reading screen
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6 flex items-center gap-3">
        <button
          onClick={() => {
            setSelectedStory(null);
            setAnswers({});
            setCurrentMissing(0);
            setShowResult(false);
          }}
          className="p-2 rounded-xl bg-card shadow"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <div className="flex-1 bg-muted rounded-full h-3">
          <div
            className="bg-secondary h-3 rounded-full transition-all"
            style={{
              width: `${((currentMissing + 1) / missingWords.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="px-6 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{selectedStory.emoji}</span>
          <h2 className="text-xl font-black text-foreground">{selectedStory.title}</h2>
          <AudioButton
            size="sm"
            className="ml-auto"
            onClick={() => speak(selectedStory.fullText)}
          />
        </div>

        {/* Story text with blanks */}
        <div className="bg-card rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex flex-wrap gap-1.5 text-lg leading-relaxed">
            {selectedStory.words.map((w, i) => {
              if (!w.isMissing) {
                return (
                  <span key={i} className="font-semibold text-foreground">
                    {w.word}
                  </span>
                );
              }

              const answered = answers[i];
              const isCurrentBlank = currentWord?.index === i;

              if (answered) {
                const isCorrect = answered === w.word;
                return (
                  <span
                    key={i}
                    className={`font-black px-2 py-0.5 rounded-lg ${
                      isCorrect
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {answered}
                  </span>
                );
              }

              return (
                <motion.span
                  key={i}
                  animate={isCurrentBlank ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`px-4 py-0.5 rounded-lg border-2 border-dashed font-black ${
                    isCurrentBlank
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  ___
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Current word prompt */}
        {currentWord && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord.index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <p className="text-center font-bold text-muted-foreground mb-4">
                🎧 Qual palavra completa a frase?
              </p>
              <div className="grid grid-cols-1 gap-3">
                {currentWord.options?.map((option) => (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectOption(option)}
                    className="card-module flex items-center gap-4 justify-center"
                  >
                    <Volume2
                      size={20}
                      className="text-muted-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(option);
                      }}
                    />
                    <span className="text-xl font-black text-card-foreground">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
