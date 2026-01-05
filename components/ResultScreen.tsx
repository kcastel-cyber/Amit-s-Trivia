
import React, { useEffect, useState } from 'react';
import { QuizResults } from '../types';
import { triggerConfetti } from '../utils/confetti';
import { audioService } from '../services/audioService';

interface ResultScreenProps {
  results: QuizResults;
  onRestart: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ results, onRestart, onHome }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (results.correctAnswers / results.totalQuestions) * 100;
  const isBigWin = results.correctAnswers > 12;

  useEffect(() => {
    if (isBigWin) {
      audioService.playFanfare();
      setTimeout(triggerConfetti, 300);
      setTimeout(triggerConfetti, 800); // Double confetti for big win
    } else if (results.correctAnswers >= 8) {
      setTimeout(triggerConfetti, 300);
    }
    
    // Animation for progress bar and score
    const timeout = setTimeout(() => {
      setAnimatedScore(percentage);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [results.correctAnswers, percentage, isBigWin]);

  const getFeedback = () => {
    if (isBigWin) return {
      title: "אלוף הפתגמים!",
      message: "מדהים! פשוט וואו. הידע שלך בפתגמים הוא ברמה של מומחה!",
      icon: "workspace_premium",
      color: "text-yellow-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx_wb67utaC-l76mxun9L8wy8_hDp2F4QIUJInBl0PD00Sx_oeCfEcd7EOxdNAJgXrZZ1nZHb20NvK4qV6PeXSBmxvb9Lfuyg5LSxU5T32rtIReUZcUTs60-3Y3eg1I5QLhgSZaRmw0dbOOWMtNDaq1Lt1KrvEjLYOgH99shbn1wmLRkMOrBtaMvkqFDSKlVjw_G3BekLkAFKe_zIarYlb7Z690h052sB-hdqhzUlmvtRS01C57x9OGNYUfzAkuYvu0fRJ9pytIJah"
    };
    if (percentage >= 100) return {
      title: "מושלם! אלוף!",
      message: "פיצחת את כל הפתגמים! אתה מאסטר אמיתי.",
      icon: "trophy",
      color: "text-yellow-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc2nkRQ_MVbwtNkFdcVNE--9L9lqEf3duqIf_ea0Wjb5jW743KKLsuS9h-KtmruV4j5FP4Bm6hAIakcFWpSBXP6QofMxcbe4ovQar3ePXJTowNzk1LnLnpv6D4AQ9auGPbtIgd9Fz6uqaBdLZWol3xBfK_CQ0SILmzDaL15ADtKkxiv57fC1gbCQKrvNO7f6e7Agxdg59s7HOZafZGVLO-S1UyS6hOUwKtEHpmGB6-HVB9EsWMrzAZozxiYEwAqZ9ZY1fUUkxe3xI2"
    };
    if (percentage >= 60) return {
      title: "עבודה מצוינת!",
      message: "יש לך הבנה טובה מאוד, המשך כך!",
      icon: "thumb_up",
      color: "text-blue-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc2nkRQ_MVbwtNkFdcVNE--9L9lqEf3duqIf_ea0Wjb5jW743KKLsuS9h-KtmruV4j5FP4Bm6hAIakcFWpSBXP6QofMxcbe4ovQar3ePXJTowNzk1LnLnpv6D4AQ9auGPbtIgd9Fz6uqaBdLZWol3xBfK_CQ0SILmzDaL15ADtKkxiv57fC1gbCQKrvNO7f6e7Agxdg59s7HOZafZGVLO-S1UyS6hOUwKtEHpmGB6-HVB9EsWMrzAZozxiYEwAqZ9ZY1fUUkxe3xI2"
    };
    return {
      title: "כל התחלה היא קשה",
      message: "אל תוותר! נסה שוב ותגלה עולם שלם של פתגמים.",
      icon: "refresh",
      color: "text-slate-500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc2nkRQ_MVbwtNkFdcVNE--9L9lqEf3duqIf_ea0Wjb5jW743KKLsuS9h-KtmruV4j5FP4Bm6hAIakcFWpSBXP6QofMxcbe4ovQar3ePXJTowNzk1LnLnpv6D4AQ9auGPbtIgd9Fz6uqaBdLZWol3xBfK_CQ0SILmzDaL15ADtKkxiv57fC1gbCQKrvNO7f6e7Agxdg59s7HOZafZGVLO-S1UyS6hOUwKtEHpmGB6-HVB9EsWMrzAZozxiYEwAqZ9ZY1fUUkxe3xI2"
    };
  };

  const feedback = getFeedback();
  const starsCount = Math.ceil((percentage / 100) * 5);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark p-6 items-center justify-start max-w-md mx-auto relative overflow-hidden">
      {/* 3D Trumpet Animations on Win */}
      {isBigWin && (
        <>
          <div className="fixed top-1/4 -left-12 z-50 trumpet-left pointer-events-none">
            <div className="relative w-32 h-32">
              <img 
                src="https://img.icons8.com/3d-fluency/512/trumpet.png" 
                alt="Trumpet Left" 
                className="w-full h-full object-contain drop-shadow-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/20 blur-2xl rounded-full -z-10"></div>
            </div>
          </div>
          <div className="fixed top-1/4 -right-12 z-50 trumpet-right pointer-events-none">
            <div className="relative w-32 h-32">
              <img 
                src="https://img.icons8.com/3d-fluency/512/trumpet.png" 
                alt="Trumpet Right" 
                className="w-full h-full object-contain drop-shadow-xl scale-x-[-1]"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/20 blur-2xl rounded-full -z-10"></div>
            </div>
          </div>
        </>
      )}

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full flex justify-center mt-8 mb-4">
        <div className="w-56 h-56 floating relative">
           <div className={`absolute inset-0 ${isBigWin ? 'bg-yellow-400/30' : 'bg-white/40 dark:bg-slate-800/40'} rounded-full blur-2xl -z-10 animate-pulse`}></div>
           <img 
            src={feedback.image} 
            alt="Result Mascot" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="text-center mb-6 animate-fadeIn">
        <div className={`inline-flex items-center justify-center p-2 mb-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700`}>
          <span className={`material-symbols-outlined filled ${feedback.color} text-3xl`}>{feedback.icon}</span>
        </div>
        <h1 className={`text-4xl font-black mb-1 ${isBigWin ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-900 dark:text-white'}`}>{feedback.title}</h1>
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto">
          {feedback.message}
        </p>
      </div>

      <div className="w-full bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl p-8 mb-8 border border-white dark:border-slate-700 relative">
        <div className="flex flex-col items-center gap-6">
          
          <div className="flex gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`material-symbols-outlined text-4xl transition-all duration-700 transform ${i < starsCount ? 'text-primary scale-110' : 'text-slate-100 dark:text-slate-700'}`}
                style={{ 
                  fontVariationSettings: "'FILL' 1",
                  transitionDelay: `${i * 150}ms`
                }}
              >
                star
              </span>
            ))}
          </div>

          <div className="text-center relative">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">תוצאה סופית</div>
            <div className="flex items-baseline justify-center">
              <span className={`text-7xl font-black tabular-nums ${isBigWin ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-900 dark:text-white'}`}>{results.correctAnswers}</span>
              <span className="text-3xl text-slate-300 font-bold ml-1">/{results.totalQuestions}</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-slate-400">התקדמות</span>
              <span className="text-sm font-black text-primary">{Math.round(animatedScore)}%</span>
            </div>
            <div className="h-6 bg-slate-100 dark:bg-slate-900/50 rounded-full p-1.5 shadow-inner">
              <div 
                className={`h-full ${isBigWin ? 'bg-gradient-to-l from-yellow-600 to-yellow-300' : 'bg-gradient-to-l from-primary to-yellow-300'} rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                style={{ width: `${animatedScore}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-2">
            <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">נקודות</p>
              <p className="text-xl font-black text-slate-800 dark:text-white">+{results.correctAnswers * 100}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">דיוק</p>
              <p className="text-xl font-black text-slate-800 dark:text-white">{Math.round(percentage)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 mt-auto">
        <button 
          onClick={onRestart}
          className="w-full bg-primary hover:bg-primary-hover text-slate-900 font-black text-xl py-5 rounded-2xl shadow-game active:shadow-game-active active:translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined font-black">replay</span>
          <span>שחק שוב</span>
        </button>
        <button 
          onClick={onHome}
          className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-lg py-4 rounded-2xl transition-all"
        >
          חזרה לתפריט הראשי
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
