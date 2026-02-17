'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/challenges', label: 'Challenges' },
  { href: '/milestones', label: 'Milestones' },
  { href: '/wins', label: 'Wins' },
  { href: '/reflect', label: 'Reflect' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <span className="text-lg font-light tracking-wider text-calm-400 group-hover:text-calm-800 transition-colors duration-300">
              self kudos
            </span>
          </Link>
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-calm-900'
                      : 'text-calm-400 hover:text-calm-800'
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
