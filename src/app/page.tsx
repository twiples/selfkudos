'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData } from '@/lib/storage';
import { getDailyPrompt } from '@/lib/prompts';
import { AppData } from '@/types';

export default function Home() {
  const [data, setData] = useState<AppData | null>(null);
  const [dailyPrompt, setDailyPrompt] = useState<string>('');

  useEffect(() => {
    setData(getData());
    setDailyPrompt(getDailyPrompt().text);
  }, []);

  const hasEntries = data && (
    data.challenges.length > 0 ||
    data.milestones.length > 0 ||
    data.privateWins.length > 0
  );

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section - Inspiring */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-calm-900 mb-6 leading-tight">
          The most meaningful growth<br />
          <span className="text-calm-600">happens in silence</span>
        </h1>
        <p className="text-xl text-calm-500 leading-relaxed">
          Not every accomplishment needs an audience.<br />
          Not every victory needs applause.
        </p>
      </section>

      {/* Philosophy Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <PhilosophyCard
          title="Surprise yourself"
          description="The most meaningful accomplishments are the ones that make you think 'I didn't know I could do that.'"
        />
        <PhilosophyCard
          title="Compare only to yesterday"
          description="The only competition worth having is with who you were before. Everyone else is on their own journey."
        />
        <PhilosophyCard
          title="Silent wins count"
          description="Some of your greatest achievements will never be recognized by others. That doesn't make them less real."
        />
      </section>

      {/* Daily Reflection */}
      <section className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-calm-50 to-calm-100 rounded-2xl p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-calm-500 mb-4">A question for today</p>
          <p className="text-2xl text-calm-800 font-light leading-relaxed mb-6">
            &ldquo;{dailyPrompt}&rdquo;
          </p>
          <Link
            href="/reflect"
            className="inline-flex items-center text-calm-600 hover:text-calm-800 font-medium transition-colors"
          >
            Take a moment to reflect
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* The Invisible Skills */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-calm-800 mb-4">
          Real growth is often invisible
        </h2>
        <p className="text-calm-500 mb-8">
          The skills that matter most rarely show up on a resume—reading a room,
          knowing when to let go, staying calm when it counts, choosing progress over perfection.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Navigation Intelligence',
            'Strategic Judgment',
            'Influence Without Authority',
            'Self-Mastery',
            'Systems Thinking'
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-white border border-calm-200 rounded-full text-sm text-calm-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-2xl mx-auto">
        <div className="border-l-2 border-calm-200 pl-8 space-y-6">
          <ManifestoItem>
            Your growth is yours. You don&apos;t need anyone else to validate what you&apos;ve learned.
          </ManifestoItem>
          <ManifestoItem>
            Struggle is the signal. If it was easy, you didn&apos;t grow.
          </ManifestoItem>
          <ManifestoItem>
            Reflection beats reaction. Take time to understand your growth, don&apos;t just chase the next hit.
          </ManifestoItem>
          <ManifestoItem>
            Intrinsic over extrinsic. The satisfaction of meaningful work outlasts any amount of applause.
          </ManifestoItem>
        </div>
      </section>

      {/* Gentle CTA */}
      <section className="text-center max-w-xl mx-auto pt-8">
        {hasEntries ? (
          <div className="space-y-4">
            <p className="text-calm-500">Continue your journey</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/challenges"
                className="px-6 py-3 text-calm-700 hover:text-calm-900 transition-colors"
              >
                Your Challenges
              </Link>
              <Link
                href="/milestones"
                className="px-6 py-3 text-calm-700 hover:text-calm-900 transition-colors"
              >
                Your Milestones
              </Link>
              <Link
                href="/wins"
                className="px-6 py-3 text-calm-700 hover:text-calm-900 transition-colors"
              >
                Your Wins
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-calm-600 text-lg">
              When you&apos;re ready, this is a space to track the growth<br />
              that only you can see.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/challenges/new"
                className="px-6 py-3 bg-calm-800 text-white rounded-lg hover:bg-calm-900 transition-colors"
              >
                Begin with a challenge
              </Link>
              <Link
                href="/reflect"
                className="px-6 py-3 text-calm-600 hover:text-calm-800 transition-colors"
              >
                Or simply reflect
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PhilosophyCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-calm-100">
      <h3 className="text-lg font-medium text-calm-800 mb-2">{title}</h3>
      <p className="text-calm-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ManifestoItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-calm-700 text-lg font-light leading-relaxed">
      {children}
    </p>
  );
}
