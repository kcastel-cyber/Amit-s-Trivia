
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 bg-pattern">
      <div className="absolute top-6 left-6 right-6 flex justify-between">
        <button className="p-3 bg-white/50 rounded-full shadow-sm">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="p-3 bg-white/50 rounded-full shadow-sm">
          <span className="material-symbols-outlined">volume_up</span>
        </button>
      </div>

      <div className="floating relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center">
        <div className="absolute inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc2nkRQ_MVbwtNkFdcVNE--9L9lqEf3duqIf_ea0Wjb5jW743KKLsuS9h-KtmruV4j5FP4Bm6hAIakcFWpSBXP6QofMxcbe4ovQar3ePXJTowNzk1LnLnpv6D4AQ9auGPbtIgd9Fz6uqaBdLZWol3xBfK_CQ0SILmzDaL15ADtKkxiv57fC1gbCQKrvNO7f6e7Agxdg59s7HOZafZGVLO-S1UyS6hOUwKtEHpmGB6-HVB9EsWMrzAZozxiYEwAqZ9ZY1fUUkxe3xI2" 
          alt="Owl mascot" 
          className="relative w-full h-full object-contain"
        />
      </div>

      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1 mb-3 rounded-full bg-secondary-accent/20 text-blue-800 text-sm font-bold tracking-wide uppercase">
          הרפתקת הפתגמים הגדולה
        </div>
        <h1 className="text-5xl font-black mb-2 text-slate-900 dark:text-white">זמן טריוויה!</h1>
        <p className="text-xl font-medium text-slate-600 dark:text-slate-300">בואו נראה כמה פתגמים אתם מכירים!</p>
      </div>

      <button 
        onClick={onStart}
        className="group relative flex w-full max-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-16 bg-primary text-[#221d10] shadow-game active:shadow-game-active active:translate-y-1 transition-all"
      >
        <div className="flex items-center gap-3 relative z-10">
          <span className="text-2xl font-black tracking-wide">התחל משחק</span>
          <span className="material-symbols-outlined text-3xl font-bold">play_circle</span>
        </div>
      </button>

      <button className="mt-6 flex items-center gap-2 text-slate-500 font-bold">
        <span className="material-symbols-outlined text-sm">lock</span>
        <span>אזור הורים</span>
      </button>
    </div>
  );
};

export default WelcomeScreen;
