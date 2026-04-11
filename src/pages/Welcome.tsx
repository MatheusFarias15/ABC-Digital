import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import mascot from "@/assets/mascot.png";
import AudioButton from "@/components/AudioButton";
import useSpeech from "@/hooks/useSpeech";

const Welcome = () => {
  const navigate = useNavigate();
  const { speak } = useSpeech(
    "Bem-vindo ao Aprenda a Ler! Aqui você vai aprender as letras, sílabas e palavras. Toque no botão verde para começar!"
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="flex flex-col items-center gap-6 max-w-sm w-full"
      >
        <img src={mascot} alt="Mascote" className="w-48 h-48 drop-shadow-lg" />

        <h1 className="text-3xl font-black text-foreground text-center">
          Aprenda a Ler! 📚
        </h1>

        <p className="text-lg text-muted-foreground text-center font-semibold">
          Seu caminho para a leitura começa aqui
        </p>

        <AudioButton
          size="lg"
          onClick={() =>
            speak("Bem-vindo ao Aprenda a Ler! Toque no botão verde para começar!")
          }
        />

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/register")}
          className="btn-learning bg-primary text-primary-foreground w-full text-center mt-4"
        >
          ▶️ Começar
        </motion.button>
      </motion.div>

      <div className="flex gap-3 mt-10">
        {["📖", "🎧", "🎮"].map((icon, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className="bg-card rounded-2xl p-4 shadow-md flex flex-col items-center gap-1"
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-xs font-bold text-muted-foreground">
              {["Lições", "Áudio", "Jogos"][i]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
