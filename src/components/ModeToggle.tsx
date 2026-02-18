'use client';

import { useMode } from '@/contexts/ModeContext';

export default function ModeToggle() {
  const { mode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      className="relative flex items-center h-8 px-1 rounded-full bg-ink-100 border border-ink-200 transition-colors hover:bg-ink-200"
      aria-label={`Switch to ${mode === 'career' ? 'life' : 'career'} mode`}
    >
      <span
        className={`absolute h-6 w-14 rounded-full transition-all duration-300 ${
          mode === 'career'
            ? 'left-1 bg-sage-600'
            : 'left-[calc(100%-3.75rem)] bg-coral-600'
        }`}
      />
      <span
        className={`relative z-10 px-3 py-1 text-xs font-medium tracking-wide transition-colors duration-300 ${
          mode === 'career' ? 'text-white' : 'text-ink-600'
        }`}
      >
        Career
      </span>
      <span
        className={`relative z-10 px-3 py-1 text-xs font-medium tracking-wide transition-colors duration-300 ${
          mode === 'life' ? 'text-white' : 'text-ink-600'
        }`}
      >
        Life
      </span>
    </button>
  );
}
