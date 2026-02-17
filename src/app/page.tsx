'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDailyPrompt } from '@/lib/prompts';

export default function Home() {
  const [dailyPrompt, setDailyPrompt] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDailyPrompt(getDailyPrompt().text);
    setMounted(true);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Hero - Full viewport, centered */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-calm-900 mb-8">
          Growth is quiet
        </h1>
        <p className="text-lg md:text-xl text-calm-400 font-light max-w-md">
          Your wins. Your pace. Your validation.
        </p>
      </section>

      {/* Single prompt - minimal */}
      <section className="border-t border-calm-100">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-2xl md:text-3xl font-light text-calm-700 leading-relaxed mb-8">
            &ldquo;{dailyPrompt}&rdquo;
          </p>
          <Link
            href="/reflect"
            className={`inline-block text-sm tracking-widest uppercase text-calm-400 hover:text-calm-800 transition-colors duration-300 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Reflect
          </Link>
        </div>
      </section>

      {/* Minimal nav hints */}
      <section className="border-t border-calm-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-3 gap-8 text-center">
            <Link href="/challenges" className="group">
              <span className="block text-4xl md:text-5xl font-extralight text-calm-200 group-hover:text-calm-400 transition-colors duration-300">
                01
              </span>
              <span className="block mt-2 text-xs tracking-widest uppercase text-calm-400 group-hover:text-calm-600 transition-colors duration-300">
                Challenges
              </span>
            </Link>
            <Link href="/milestones" className="group">
              <span className="block text-4xl md:text-5xl font-extralight text-calm-200 group-hover:text-calm-400 transition-colors duration-300">
                02
              </span>
              <span className="block mt-2 text-xs tracking-widest uppercase text-calm-400 group-hover:text-calm-600 transition-colors duration-300">
                Milestones
              </span>
            </Link>
            <Link href="/wins" className="group">
              <span className="block text-4xl md:text-5xl font-extralight text-calm-200 group-hover:text-calm-400 transition-colors duration-300">
                03
              </span>
              <span className="block mt-2 text-xs tracking-widest uppercase text-calm-400 group-hover:text-calm-600 transition-colors duration-300">
                Private Wins
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
