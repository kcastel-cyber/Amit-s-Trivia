
import React, { useState, useCallback } from 'react';
import { GameState, QuizResults, Question } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { TRIVIA_QUESTIONS } from './constants/questions';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startGame = useCallback(() => {
    // Shuffle the entire questions bank when the game starts
    const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setGameState(GameState.QUIZ);
    setResults(null);
  }, []);

  const finishGame = useCallback((correctCount: number) => {
    setResults({
      score: Math.round((correctCount / shuffledQuestions.length) * 10),
      totalQuestions: shuffledQuestions.length,
      correctAnswers: correctCount
    });
    setGameState(GameState.RESULTS);
  }, [shuffledQuestions.length]);

  const goHome = useCallback(() => {
    setGameState(GameState.WELCOME);
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
      {gameState === GameState.WELCOME && (
        <WelcomeScreen onStart={startGame} />
      )}
      {gameState === GameState.QUIZ && (
        <QuizScreen questions={shuffledQuestions} onFinish={finishGame} onBack={goHome} />
      )}
      {gameState === GameState.RESULTS && results && (
        <ResultScreen results={results} onRestart={startGame} onHome={goHome} />
      )}
    </div>
  );
};

export default App;
