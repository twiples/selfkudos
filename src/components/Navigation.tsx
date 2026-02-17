'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navItems = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/milestones', label: 'Milestones' },
  { href: '/wins', label: 'Wins' },
  { href: '/reflect', label: 'Reflect' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-paper/95 backdrop-blur-sm sticky top-0 z-50 border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <Logo className="group-hover:opacity-80 transition-opacity duration-400" />
          </Link>
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-400 ${
                    isActive
                      ? 'text-sage-700'
                      : 'text-ink-500 hover:text-ink-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
