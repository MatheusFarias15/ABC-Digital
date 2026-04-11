import { Home, BookOpen, Trophy, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, path: "/dashboard", label: "Início" },
  { icon: BookOpen, path: "/modules", label: "Aprender" },
  { icon: Trophy, path: "/progress", label: "Progresso" },
  { icon: Settings, path: "/settings", label: "Config" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center py-2 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-colors"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`p-2 rounded-2xl ${isActive ? "bg-primary" : ""}`}
              >
                <item.icon
                  size={28}
                  className={isActive ? "text-primary-foreground" : "text-muted-foreground"}
                />
              </motion.div>
              <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
