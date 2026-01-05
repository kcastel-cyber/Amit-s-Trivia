
export enum GameState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

export interface Question {
  id: number;
  text: string;
  image?: string;
  imagePrompt?: string; // Prompt for AI image generation
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}
