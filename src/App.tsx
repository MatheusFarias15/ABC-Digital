import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import LessonPage from "./pages/LessonPage";
import ExercisePage from "./pages/ExercisePage";
import Progress from "./pages/Progress";
import ProgressMapPage from "./pages/ProgressMapPage";
import SettingsPage from "./pages/SettingsPage";
import StoriesPage from "./pages/StoriesPage";
import VoicePracticePage from "./pages/VoicePracticePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/lesson/:moduleId" element={<LessonPage />} />
          <Route path="/exercise/:moduleId" element={<ExercisePage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/progress-map" element={<ProgressMapPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/voice-practice" element={<VoicePracticePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
