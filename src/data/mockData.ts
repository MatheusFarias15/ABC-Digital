import letterA from "@/assets/letter-a.png";
import catImg from "@/assets/cat.png";
import dogImg from "@/assets/dog.png";
import houseImg from "@/assets/house.png";
import sunImg from "@/assets/sun.png";

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

export interface Exercise {
  id: string;
  lessonId: string;
  type: "multiple_choice" | "audio_select";
  questionText: string;
  options: ExerciseOption[];
}

export interface ExerciseOption {
  id: string;
  content: string;
  imageUrl: string;
  isCorrect: boolean;
}

export const modules: Module[] = [
  {
    id: "1",
    title: "Letras",
    icon: "🔤",
    description: "Aprenda as letras do alfabeto",
    color: "bg-primary",
    lessonsCount: 5,
    completedLessons: 2,
  },
  {
    id: "2",
    title: "Sílabas",
    icon: "📝",
    description: "Junte as letras em sílabas",
    color: "bg-secondary",
    lessonsCount: 4,
    completedLessons: 0,
  },
  {
    id: "3",
    title: "Palavras",
    icon: "📖",
    description: "Forme suas primeiras palavras",
    color: "bg-accent",
    lessonsCount: 6,
    completedLessons: 0,
  },
  {
    id: "4",
    title: "Frases",
    icon: "💬",
    description: "Construa frases simples",
    color: "bg-warning",
    lessonsCount: 4,
    completedLessons: 0,
  },
];

export const lessons: Lesson[] = [
  { id: "l1", moduleId: "1", title: "Letra A", contentType: "letra", imageUrl: letterA, textContent: "A", orderIndex: 1 },
  { id: "l2", moduleId: "1", title: "Letra B", contentType: "letra", imageUrl: letterA, textContent: "B", orderIndex: 2 },
  { id: "l3", moduleId: "1", title: "Letra C", contentType: "letra", imageUrl: letterA, textContent: "C", orderIndex: 3 },
  { id: "l4", moduleId: "3", title: "Gato", contentType: "palavra", imageUrl: catImg, textContent: "GATO", orderIndex: 1 },
  { id: "l5", moduleId: "3", title: "Casa", contentType: "palavra", imageUrl: houseImg, textContent: "CASA", orderIndex: 2 },
  { id: "l6", moduleId: "3", title: "Sol", contentType: "palavra", imageUrl: sunImg, textContent: "SOL", orderIndex: 3 },
];

export const exercises: Exercise[] = [
  {
    id: "e1",
    lessonId: "l1",
    type: "multiple_choice",
    questionText: "Qual é a letra A?",
    options: [
      { id: "o1", content: "A", imageUrl: letterA, isCorrect: true },
      { id: "o2", content: "B", imageUrl: dogImg, isCorrect: false },
      { id: "o3", content: "C", imageUrl: houseImg, isCorrect: false },
    ],
  },
  {
    id: "e2",
    lessonId: "l4",
    type: "multiple_choice",
    questionText: "Onde está o GATO?",
    options: [
      { id: "o4", content: "Cachorro", imageUrl: dogImg, isCorrect: false },
      { id: "o5", content: "Gato", imageUrl: catImg, isCorrect: true },
      { id: "o6", content: "Casa", imageUrl: houseImg, isCorrect: false },
    ],
  },
];

export const avatars = ["🧑", "👧", "👦", "👩", "👨", "🧒", "👵", "👴"];

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  { id: "a1", title: "Primeira Aula", icon: "⭐", unlocked: true },
  { id: "a2", title: "5 Acertos", icon: "🎯", unlocked: true },
  { id: "a3", title: "Módulo Completo", icon: "🏆", unlocked: false },
  { id: "a4", title: "Sem Erros", icon: "💎", unlocked: false },
  { id: "a5", title: "7 Dias Seguidos", icon: "🔥", unlocked: false },
  { id: "a6", title: "Todas as Letras", icon: "🎓", unlocked: false },
];
