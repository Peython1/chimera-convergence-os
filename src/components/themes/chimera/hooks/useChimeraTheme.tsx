
import { useState, useEffect } from 'react';

interface ChimeraThemeState {
  mythosLevel: number;
  fireIntensity: number;
  currentForm: 'lion' | 'goat' | 'serpent';
  soundEnabled: boolean;
}

export const useChimeraTheme = () => {
  const [themeState, setThemeState] = useState<ChimeraThemeState>({
    mythosLevel: 75,
    fireIntensity: 0.7,
    currentForm: 'lion',
    soundEnabled: true
  });

  // Evolve theme based on user interaction
  useEffect(() => {
    const handleUserActivity = () => {
      setThemeState(prev => ({
        ...prev,
        mythosLevel: Math.min(100, prev.mythosLevel + 1)
      }));
    };

    // Cycle through forms every 30 seconds
    const formCycle = setInterval(() => {
      setThemeState(prev => {
        const forms: ChimeraThemeState['currentForm'][] = ['lion', 'goat', 'serpent'];
        const currentIndex = forms.indexOf(prev.currentForm);
        const nextIndex = (currentIndex + 1) % forms.length;
        
        return {
          ...prev,
          currentForm: forms[nextIndex],
          fireIntensity: Math.random() * 0.5 + 0.5
        };
      });
    }, 30000);

    document.addEventListener('click', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    return () => {
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      clearInterval(formCycle);
    };
  }, []);

  const playMythologicalSound = (soundType: 'login' | 'notification' | 'shutdown') => {
    if (!themeState.soundEnabled) return;
    
    // This would integrate with actual audio files
    console.log(`Playing ${soundType} sound with current form: ${themeState.currentForm}`);
  };

  return {
    ...themeState,
    setMythosLevel: (level: number) => 
      setThemeState(prev => ({ ...prev, mythosLevel: level })),
    setFireIntensity: (intensity: number) => 
      setThemeState(prev => ({ ...prev, fireIntensity: intensity })),
    toggleSound: () => 
      setThemeState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled })),
    playMythologicalSound
  };
};
