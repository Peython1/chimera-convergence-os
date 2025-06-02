
import { useState, useEffect, useCallback } from 'react';

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

  const handleUserActivity = useCallback(() => {
    try {
      setThemeState(prev => ({
        ...prev,
        mythosLevel: Math.min(100, prev.mythosLevel + 1)
      }));
    } catch (error) {
      console.error('Error handling user activity:', error);
    }
  }, []);

  const playMythologicalSound = useCallback((soundType: 'login' | 'notification' | 'shutdown') => {
    try {
      if (!themeState.soundEnabled) return;
      console.log(`Playing ${soundType} sound with current form: ${themeState.currentForm}`);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [themeState.soundEnabled, themeState.currentForm]);

  // Evolve theme based on user interaction
  useEffect(() => {
    try {
      // Cycle through forms every 30 seconds
      const formCycle = setInterval(() => {
        setThemeState(prev => {
          const forms: ChimeraThemeState['currentForm'][] = ['lion', 'goat', 'serpent'];
          const currentIndex = forms.indexOf(prev.currentForm);
          const nextIndex = (currentIndex + 1) % forms.length;
          
          return {
            ...prev,
            currentForm: forms[nextIndex],
            fireIntensity: Math.max(0.1, Math.min(1, Math.random() * 0.5 + 0.5))
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
    } catch (error) {
      console.error('Error setting up theme effects:', error);
      return () => {};
    }
  }, [handleUserActivity]);

  const setMythosLevel = useCallback((level: number) => {
    try {
      const safeLevel = Math.max(0, Math.min(100, level));
      setThemeState(prev => ({ ...prev, mythosLevel: safeLevel }));
    } catch (error) {
      console.error('Error setting mythos level:', error);
    }
  }, []);

  const setFireIntensity = useCallback((intensity: number) => {
    try {
      const safeIntensity = Math.max(0.1, Math.min(1, intensity));
      setThemeState(prev => ({ ...prev, fireIntensity: safeIntensity }));
    } catch (error) {
      console.error('Error setting fire intensity:', error);
    }
  }, []);

  const toggleSound = useCallback(() => {
    try {
      setThemeState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    } catch (error) {
      console.error('Error toggling sound:', error);
    }
  }, []);

  return {
    ...themeState,
    setMythosLevel,
    setFireIntensity,
    toggleSound,
    playMythologicalSound
  };
};
