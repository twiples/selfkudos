'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMode } from './ModeContext';
import { AppMode } from '@/types';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  mode: AppMode;
}

const careerColors: ThemeColors = {
  primary: 'sage-600',
  primaryHover: 'sage-700',
  primaryLight: 'sage-50',
  primaryDark: 'sage-800',
  accent: 'sage-600',
  accentLight: 'sage-100',
};

const lifeColors: ThemeColors = {
  primary: 'coral-600',
  primaryHover: 'coral-700',
  primaryLight: 'coral-50',
  primaryDark: 'coral-800',
  accent: 'coral-600',
  accentLight: 'coral-100',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mode } = useMode();
  const colors = mode === 'career' ? careerColors : lifeColors;

  return (
    <ThemeContext.Provider value={{ colors, mode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function getThemeColors(mode: AppMode): ThemeColors {
  return mode === 'career' ? careerColors : lifeColors;
}
