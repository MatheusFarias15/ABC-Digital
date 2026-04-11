import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { avatars } from "@/data/mockData";
import mascot from "@/assets/mascot.png";
import useSpeech from "@/hooks/useSpeech";

const Register = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState("");

  useSpeech("Escolha seu avatar tocando em um dos rostos. Você também pode digitar seu nome. Quando terminar, toque no botão verde.");

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-background">
      <img src={mascot} alt="" className="w-20 h-20 mb-4" />
      <h1 className="text-2xl font-black text-foreground mb-2">Quem é você?</h1>
      <p className="text-muted-foreground font-semibold mb-8 text-center">
        Escolha seu avatar 👇
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {avatars.map((av, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.85 }}
            onClick={() => setSelectedAvatar(i)}
            className={`text-4xl p-3 rounded-2xl border-3 transition-all ${
              selectedAvatar === i
                ? "border-primary bg-primary/10 shadow-lg scale-110"
                : "border-border bg-card"
            }`}
          >
            {av}
          </motion.button>
        ))}
      </div>

      <div className="w-full max-w-sm mb-8">
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl bg-card border-2 border-border text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => navigate("/dashboard")}
        className="btn-learning bg-primary text-primary-foreground w-full max-w-sm"
      >
        ✅ Pronto!
      </motion.button>
    </div>
  );
};

export default Register;
