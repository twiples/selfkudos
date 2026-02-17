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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-paper">
        <p className="text-xs tracking-[0.3em] uppercase text-sage-600 mb-6 font-medium">
          A different kind of growth tracker
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-ink-900 mb-8">
          Growth is quiet
        </h1>
        <p className="text-lg md:text-xl text-ink-600 font-light max-w-lg">
          Your wins. Your pace. Your validation.
        </p>
      </section>

      {/* Daily prompt */}
      <section className="bg-sage-700 text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-sage-200 mb-8 font-medium">
            Today&apos;s reflection
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-10">
            &ldquo;{dailyPrompt}&rdquo;
          </p>
          <Link
            href="/reflect"
            className={`inline-block text-sm tracking-[0.15em] uppercase text-white hover:text-gold-300 transition-colors duration-400 border-b border-sage-400 hover:border-gold-300 pb-1 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Reflect on this
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-paper-sand">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-coral-600 mb-6 font-medium">
                Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-ink-900 leading-tight">
                The most meaningful accomplishments don&apos;t need applause
              </h2>
            </div>
            <div className="space-y-8 text-ink-700">
              <p className="text-lg font-light leading-relaxed">
                In a world optimized for external validation, we&apos;ve forgotten
                how to recognize our own growth.
              </p>
              <p className="text-lg font-light leading-relaxed">
                Self kudos is a private space to track the skills that matter—reading
                a room, knowing when to let go, choosing progress over perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-paper">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-ink-500 mb-6 font-medium">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-ink-900 leading-tight mb-12">
              The validation trap
            </h2>
            <div className="space-y-6 text-ink-700 text-lg font-light leading-relaxed">
              <p>
                We live in the social media generation. Every accomplishment needs a post.
                Every milestone needs likes. Every promotion needs announcements.
              </p>
              <p>
                This constant seeking of external validation has crept into our professional lives.
                We measure our worth by performance reviews, peer recognition, and visible achievements.
              </p>
              <p>
                But the dopamine hit from a LinkedIn like fades fast. The satisfaction from
                a public pat on the back doesn&apos;t sustain you through the next challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Alternative */}
      <section className="bg-coral-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-coral-700 mb-6 font-medium">
              The alternative
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-ink-900 leading-tight mb-12">
              Satisfaction that comes from within
            </h2>
            <div className="space-y-6 text-ink-800 text-lg font-light leading-relaxed">
              <p>
                True career satisfaction comes from taking on meaningful, impactful challenges—and
                then surprising yourself with what you can achieve.
              </p>
              <p>
                Every impossible challenge gifts you a superpower you never knew you needed.
                That presentation that terrified you? It gave you presence. That difficult
                conversation you dreaded? It taught you courage. That project that felt
                overwhelming? It showed you capacity you didn&apos;t know you had.
              </p>
              <p>
                It&apos;s the moment you realize you just navigated a situation that would have
                paralyzed you two years ago. It&apos;s the quiet confidence that builds when you
                prove something to yourself, not to your manager.
              </p>
              <p>
                This kind of satisfaction doesn&apos;t need an audience. It doesn&apos;t fade
                after a week. It compounds over a career and becomes the foundation of
                genuine professional confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="bg-paper-warm">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-sage-600 mb-6 font-medium">
                For who
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-ink-900 leading-tight">
                Built for people who&apos;ve learned that growth is personal
              </h2>
            </div>
            <div className="space-y-8 text-ink-700">
              <p className="text-lg font-light leading-relaxed">
                For mid-career professionals who understand that the most important skills
                aren&apos;t on any performance review. For leaders who want to model intrinsic
                motivation, not just preach it.
              </p>
              <p className="text-lg font-light leading-relaxed">
                For anyone who&apos;s realized that chasing external validation is exhausting—and
                that the alternative is more sustainable and more fulfilling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-sage-50">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-sage-700 mb-12 font-medium">
            What you can track
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              number="01"
              title="Challenges"
              description="Document the hard things you're taking on. Track why they matter to you."
              href="/challenges"
              color="sage"
            />
            <FeatureCard
              number="02"
              title="Milestones"
              description="Capture moments when you surprised yourself. What can you do now that you couldn't before?"
              href="/milestones"
              color="coral"
            />
            <FeatureCard
              number="03"
              title="Private Wins"
              description="Small victories that only you know the significance of. No audience required."
              href="/wins"
              color="gold"
            />
          </div>
        </div>
      </section>

      {/* Invisible Skills */}
      <section className="bg-gold-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-800 mb-6 font-medium">
            The invisible skills
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight text-ink-900 mb-12 max-w-2xl">
            Real career growth rarely shows up on a resume
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Reading people',
              'Navigating ambiguity',
              'Knowing when to quit',
              'Progress over perfection',
              'Staying calm under pressure',
              'Influence without authority',
              'Systems thinking',
              'Strategic patience',
            ].map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 bg-white border border-gold-300 text-ink-800 text-sm rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-paper-sand">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-coral-600 mb-12 text-center font-medium">
            What we believe
          </p>
          <div className="space-y-8">
            <ManifestoItem>
              Your growth is yours. You don&apos;t need anyone else to validate it.
            </ManifestoItem>
            <ManifestoItem>
              Struggle is the signal. If it was easy, you didn&apos;t grow.
            </ManifestoItem>
            <ManifestoItem>
              Compare only to yesterday. Everyone else is on their own path.
            </ManifestoItem>
            <ManifestoItem>
              Reflection beats reaction. Understanding matters more than speed.
            </ManifestoItem>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-night text-white">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extralight mb-6">
            Start tracking your growth
          </h2>
          <p className="text-ink-400 mb-10 text-lg font-light">
            Private. No accounts. Your data stays on your device.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/challenges/new"
              className="px-8 py-4 bg-sage-600 text-white text-sm tracking-wide font-medium hover:bg-sage-500 transition-colors duration-400 rounded-lg"
            >
              Add a challenge
            </Link>
            <Link
              href="/reflect"
              className="px-8 py-4 border border-ink-600 text-ink-300 text-sm tracking-wide hover:bg-night-light hover:text-white transition-colors duration-400 rounded-lg"
            >
              Start reflecting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  description,
  href,
  color,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  color: 'sage' | 'coral' | 'gold';
}) {
  const accentColors = {
    sage: 'text-sage-600 group-hover:text-sage-700',
    coral: 'text-coral-600 group-hover:text-coral-700',
    gold: 'text-gold-600 group-hover:text-gold-700',
  };

  return (
    <Link href={href} className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-400">
      <span className={`block text-4xl font-light mb-4 transition-colors duration-400 ${accentColors[color]}`}>
        {number}
      </span>
      <h3 className="text-lg font-semibold text-ink-900 mb-3 group-hover:text-ink-700 transition-colors duration-400">
        {title}
      </h3>
      <p className="text-ink-600 text-sm leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

function ManifestoItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl md:text-2xl font-extralight text-ink-700 leading-relaxed text-center">
      {children}
    </p>
  );
}
