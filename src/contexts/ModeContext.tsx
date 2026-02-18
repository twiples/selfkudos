'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppMode } from '@/types';

interface ModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const STORAGE_KEY = 'selfkudos_mode';

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>('career');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'career' || stored === 'life') {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    setModeState((currentMode) => {
      const newMode = currentMode === 'career' ? 'life' : 'career';
      localStorage.setItem(STORAGE_KEY, newMode);
      return newMode;
    });
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ModeContext.Provider value={{ mode: 'career', setMode: () => {}, toggleMode: () => {} }}>
        {children}
      </ModeContext.Provider>
    );
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
