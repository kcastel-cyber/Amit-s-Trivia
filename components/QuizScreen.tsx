
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { audioService } from '../services/audioService';
import { triggerConfetti } from '../utils/confetti';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (correctCount: number) => void;
  onBack: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctIndexInShuffled, setCorrectIndexInShuffled] = useState(-1);

  const currentQuestion = questions[currentIndex];

  const prepareQuestion = (question: Question) => {
    if (!question) return;
    const originalOptions = [...question.options];
    const correctValue = originalOptions[question.correctAnswer];
    
    // Shuffle options to make it more challenging
    for (let i = originalOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [originalOptions[i], originalOptions[j]] = [originalOptions[j], originalOptions[i]];
    }
    
    setCurrentOptions(originalOptions);
    setCorrectIndexInShuffled(originalOptions.indexOf(correctValue));
  };

  useEffect(() => {
    prepareQuestion(currentQuestion);
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleOptionSelect(-1); 
    }
  }, [timeLeft, isAnswered]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === correctIndexInShuffled) {
      setCorrectCount(prev => prev + 1);
      audioService.playCorrect();
      triggerConfetti();
    } else {
      audioService.playIncorrect();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      onFinish(correctCount);
    }
  };

  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-2 justify-between">
        <button onClick={onBack} className="p-3 hover:bg-black/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-xl font-bold">{currentQuestion.category}</h2>
        <div className="w-12"></div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <p className="text-sm font-bold opacity-60">שאלה {currentIndex + 1} מתוך {questions.length}</p>
          <div className="flex items-center gap-1 text-primary font-bold">
            <span className="material-symbols-outlined filled text-lg">stars</span>
            <span>{correctCount * 100} נקודות</span>
          </div>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden text-right">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto pb-32 scrollbar-hide">
        <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-slate-800 mb-6 relative border-4 border-white dark:border-slate-700 flex items-center justify-center p-12">
           <img 
              src={currentQuestion.image} 
              alt="Question Visual" 
              className="w-full h-full object-contain animate-fadeIn drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://img.icons8.com/3d-fluency/512/idea.png';
              }}
            />
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
            <span className={`material-symbols-outlined ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>timer</span>
            <p className="font-bold text-lg">00:{timeLeft.toString().padStart(2, '0')}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="flex flex-col gap-3">
          {currentOptions.map((option, idx) => {
            let stateClass = "bg-white dark:bg-slate-800 border-2 border-transparent";
            if (isAnswered) {
              if (idx === correctIndexInShuffled) {
                stateClass = "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-300";
              } else if (idx === selectedOption) {
                stateClass = "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-300";
              } else {
                stateClass = "bg-slate-50 dark:bg-slate-800/50 opacity-50";
              }
            } else {
              stateClass = "bg-white dark:bg-slate-800 hover:border-primary/50 shadow-sm active:scale-95";
            }

            return (
              <button
                key={`${currentIndex}-${idx}`}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`relative flex items-center w-full p-1 rounded-2xl transition-all duration-200 ${stateClass}`}
              >
                <div className={`flex items-center justify-center size-12 rounded-xl font-bold text-xl mr-2 m-1 shadow-sm 
                  ${isAnswered && idx === correctIndexInShuffled ? 'bg-green-500 text-white' : 
                    isAnswered && idx === selectedOption ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-lg font-bold flex-1 text-right px-4">{option}</span>
                {isAnswered && idx === correctIndexInShuffled && (
                  <span className="material-symbols-outlined text-green-500 px-4">check_circle</span>
                )}
                {isAnswered && idx === selectedOption && idx !== correctIndexInShuffled && (
                  <span className="material-symbols-outlined text-red-500 px-4">cancel</span>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-primary/20 shadow-lg text-center animate-fadeIn mb-8">
            <div className="inline-block p-2 bg-primary/20 rounded-full mb-2">
              <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
            </div>
            <p className="font-black text-xl text-slate-900 dark:text-white mb-2">הסבר קצר:</p>
            <p className="text-lg font-medium leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-background-light dark:from-background-dark pt-8">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`w-full flex items-center justify-center gap-2 font-bold text-lg h-16 rounded-2xl shadow-game active:shadow-game-active transition-all active:translate-y-1
            ${isAnswered ? 'bg-primary text-slate-900' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <span>{currentIndex < questions.length - 1 ? 'לשאלה הבאה' : 'לסיום הסיבוב'}</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
