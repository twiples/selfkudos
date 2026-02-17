import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="text-center py-8 text-ink-300 text-xs tracking-[0.15em] uppercase">
            <p>self kudos</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
