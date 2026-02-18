'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import { useMode } from '@/contexts/ModeContext';

const navItems = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/milestones', label: 'Milestones' },
  { href: '/wins', label: 'Wins' },
  { href: '/reflect', label: 'Reflect' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { mode } = useMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeColor = mode === 'career' ? 'text-sage-700' : 'text-coral-700';
  const activeBg = mode === 'career' ? 'bg-sage-50' : 'bg-coral-50';

  return (
    <header className="bg-paper/95 backdrop-blur-sm sticky top-0 z-50 border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="group flex-shrink-0">
            <Logo className="group-hover:opacity-80 transition-opacity duration-400" />
          </Link>

          {/* Mode Toggle - center on mobile */}
          <div className="flex-shrink-0">
            <ModeToggle />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-400 ${
                    isActive
                      ? activeColor
                      : 'text-ink-500 hover:text-ink-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink-600 hover:text-ink-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-ink-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? `${activeColor} ${activeBg}`
                        : 'text-ink-600 hover:text-ink-800 hover:bg-ink-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
