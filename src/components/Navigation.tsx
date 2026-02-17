'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/milestones', label: 'Milestones' },
  { href: '/wins', label: 'Private Wins' },
  { href: '/reflect', label: 'Reflect' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-calm-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-light tracking-wide text-calm-800">self kudos</span>
          </Link>
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-calm-100 text-calm-900'
                      : 'text-calm-600 hover:text-calm-900 hover:bg-calm-50'
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
