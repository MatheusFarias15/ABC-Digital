/**
 * api.ts — cliente HTTP para o backend Flask
 * Substitui as chamadas ao Supabase.
 * 
 * Uso: importe as funções diretamente nos hooks/componentes.
 * Exemplo: import { fetchModules } from "@/lib/api";
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// ─── Tipos (espelham as interfaces do mockData.ts original) ───────────────────

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  lessonsCount: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  contentType: "letra" | "silaba" | "palavra" | "frase";
  imageUrl: string;
  textContent: string;
  orderIndex: number;
}

export interface ExerciseOption {
  id: string;
  content: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: "multiple_choice" | "audio_select";
  questionText: string;
  options: ExerciseOption[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ─── Módulos ──────────────────────────────────────────────────────────────────

export const fetchModules = () =>
  apiFetch<Module[]>("/api/modules");

export const fetchModule = (id: string) =>
  apiFetch<Module>(`/api/modules/${id}`);

export const updateModuleProgress = (id: string, completedLessons: number) =>
  apiFetch<Module>(`/api/modules/${id}/progress`, {
    method: "PATCH",
    body: JSON.stringify({ completedLessons }),
  });

// ─── Lições ───────────────────────────────────────────────────────────────────

export const fetchLessons = (moduleId?: string) =>
  apiFetch<Lesson[]>(`/api/lessons${moduleId ? `?moduleId=${moduleId}` : ""}`);

export const fetchLesson = (id: string) =>
  apiFetch<Lesson>(`/api/lessons/${id}`);

// ─── Exercícios ───────────────────────────────────────────────────────────────

export const fetchExercises = (params?: { lessonId?: string; moduleId?: string }) => {
  const qs = params?.lessonId
    ? `?lessonId=${params.lessonId}`
    : params?.moduleId
    ? `?moduleId=${params.moduleId}`
    : "";
  return apiFetch<Exercise[]>(`/api/exercises${qs}`);
};

export const fetchExercise = (id: string) =>
  apiFetch<Exercise>(`/api/exercises/${id}`);

// ─── Conquistas ───────────────────────────────────────────────────────────────

export const fetchAchievements = () =>
  apiFetch<Achievement[]>("/api/achievements");

export const unlockAchievement = (id: string) =>
  apiFetch<Achievement>(`/api/achievements/${id}/unlock`, { method: "PATCH" });

// ─── Utilitário: resolve URL de imagem ───────────────────────────────────────
// As imageUrls retornadas pelo backend são "/api/assets/xxx.png".
// Esta função adiciona o BASE_URL para uso em <img src={}>.

export const resolveImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${BASE_URL}${imageUrl}`;
};
