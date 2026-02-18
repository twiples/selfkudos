'use client';

import { useMode } from '@/contexts/ModeContext';
import { ReactNode } from 'react';

export default function ModeBody({ children, className }: { children: ReactNode; className?: string }) {
  const { mode } = useMode();

  return (
    <div data-mode={mode} className={className}>
      {children}
    </div>
  );
}
