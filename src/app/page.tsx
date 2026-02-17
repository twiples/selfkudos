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
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-ink mb-8">
          Growth is quiet
        </h1>
        <p className="text-lg md:text-xl text-ink-400 font-light">
          Your wins. Your pace. Your validation.
        </p>
      </section>

      {/* Daily prompt */}
      <section className="border-t border-ink-100">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-8">
            Today&apos;s reflection
          </p>
          <p className="text-2xl md:text-3xl font-light text-ink-700 leading-relaxed mb-10">
            &ldquo;{dailyPrompt}&rdquo;
          </p>
          <Link
            href="/reflect"
            className={`inline-block text-xs tracking-[0.15em] uppercase text-ink-400 hover:text-ink transition-colors duration-400 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Reflect on this &rarr;
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-ink-100 bg-paper-warm">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-6">
                Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-ink leading-tight">
                The most meaningful accomplishments don&apos;t need applause
              </h2>
            </div>
            <div className="space-y-8 text-ink-500">
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
      <section className="border-t border-ink-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-6">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-ink leading-tight mb-12">
              The validation trap
            </h2>
            <div className="space-y-6 text-ink-500 text-lg font-light leading-relaxed">
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
      <section className="border-t border-ink-100 bg-paper-warm">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-6">
              The alternative
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-ink leading-tight mb-12">
              Satisfaction that comes from within
            </h2>
            <div className="space-y-6 text-ink-500 text-lg font-light leading-relaxed">
              <p>
                True career satisfaction comes from taking on meaningful, impactful challenges—and
                then surprising yourself with what you can achieve.
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
      <section className="border-t border-ink-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-6">
                For who
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-ink leading-tight">
                Built for people who&apos;ve learned that growth is personal
              </h2>
            </div>
            <div className="space-y-8 text-ink-500">
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
      <section className="border-t border-ink-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              number="01"
              title="Challenges"
              description="Document the hard things you're taking on. Track why they matter to you."
              href="/challenges"
            />
            <FeatureCard
              number="02"
              title="Milestones"
              description="Capture moments when you surprised yourself. What can you do now that you couldn't before?"
              href="/milestones"
            />
            <FeatureCard
              number="03"
              title="Private Wins"
              description="Small victories that only you know the significance of. No audience required."
              href="/wins"
            />
          </div>
        </div>
      </section>

      {/* Invisible Skills */}
      <section className="border-t border-ink-100 bg-paper-warm">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-6">
            The invisible skills
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight text-ink mb-12 max-w-2xl">
            Real career growth rarely shows up on a resume
          </h2>
          <div className="flex flex-wrap gap-4">
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
                className="px-5 py-2.5 border border-ink-200 text-ink-600 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-ink-100">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-ink-300 mb-12 text-center">
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
      <section className="border-t border-ink-100 bg-ink text-paper">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extralight mb-6">
            Start tracking your growth
          </h2>
          <p className="text-ink-400 mb-10 text-lg font-light">
            Private. No accounts. Your data stays on your device.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/challenges/new"
              className="px-8 py-4 bg-paper text-ink text-sm tracking-wide hover:bg-ink-100 transition-colors duration-400"
            >
              Add a challenge
            </Link>
            <Link
              href="/reflect"
              className="px-8 py-4 border border-ink-600 text-paper text-sm tracking-wide hover:bg-ink-800 transition-colors duration-400"
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
}: {
  number: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <span className="block text-5xl font-extralight text-ink-200 group-hover:text-ink-400 transition-colors duration-400 mb-4">
        {number}
      </span>
      <h3 className="text-lg font-medium text-ink mb-3 group-hover:text-ink-600 transition-colors duration-400">
        {title}
      </h3>
      <p className="text-ink-400 text-sm leading-relaxed">
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
