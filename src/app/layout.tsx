import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import { LogoIcon } from '@/components/Logo';

const inter = Inter({ subsets: ['latin'] });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'self kudos',
  description: 'A personal career development tool that helps you measure and celebrate growth through intrinsic satisfaction rather than external validation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cormorant.variable} antialiased bg-cream`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-stone-200 bg-cream-warm">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-4">
              <LogoIcon size={28} className="text-amber-600" />
              <span className="font-logo text-lg text-stone-500">self kudos</span>
              <p className="text-stone-400 text-xs tracking-wide">
                Growth is quiet. Your wins. Your pace. Your validation.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
