
export const triggerConfetti = () => {
  if (typeof (window as any).confetti === 'function') {
    (window as any).confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#eebd2b', '#8EC5FC', '#E0C3FC', '#ffffff']
    });
  }
};
