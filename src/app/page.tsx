'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData } from '@/lib/storage';
import { getDailyPrompt } from '@/lib/prompts';
import { AppData, Challenge, Milestone, PrivateWin } from '@/types';

export default function Dashboard() {
  const [data, setData] = useState<AppData | null>(null);
  const [dailyPrompt, setDailyPrompt] = useState<string>('');

  useEffect(() => {
    setData(getData());
    setDailyPrompt(getDailyPrompt().text);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-calm-500">Loading...</div>
      </div>
    );
  }

  const activeChallenges = data.challenges.filter(c => c.status === 'active');
  const completedChallenges = data.challenges.filter(c => c.status === 'completed');
  const recentMilestones = data.milestones.slice(0, 3);
  const recentWins = data.privateWins.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl font-semibold text-calm-900 mb-3">
          Your Growth Journey
        </h1>
        <p className="text-calm-600 max-w-2xl mx-auto">
          The most meaningful accomplishments are the ones that make you think
          &ldquo;I didn&apos;t know I could do that.&rdquo;
        </p>
      </section>

      {/* Daily Reflection Prompt */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
        <h2 className="text-sm font-medium text-primary-700 mb-2">Today&apos;s Reflection</h2>
        <p className="text-xl text-primary-900 font-medium mb-4">{dailyPrompt}</p>
        <Link
          href="/reflect"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Reflect on this
        </Link>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Active Challenges"
          value={activeChallenges.length}
          href="/challenges"
        />
        <StatCard
          label="Completed"
          value={completedChallenges.length}
          href="/challenges"
        />
        <StatCard
          label="Milestones"
          value={data.milestones.length}
          href="/milestones"
        />
        <StatCard
          label="Private Wins"
          value={data.privateWins.length}
          href="/wins"
        />
      </section>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-calm-800">Active Challenges</h2>
            <Link href="/challenges" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {activeChallenges.slice(0, 3).map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Milestones */}
      {recentMilestones.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-calm-800">Recent Milestones</h2>
            <Link href="/milestones" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Wins */}
      {recentWins.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-calm-800">Recent Private Wins</h2>
            <Link href="/wins" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentWins.map((win) => (
              <WinCard key={win.id} win={win} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {data.challenges.length === 0 && data.milestones.length === 0 && data.privateWins.length === 0 && (
        <section className="text-center py-12 bg-calm-50 rounded-2xl">
          <h2 className="text-xl font-semibold text-calm-800 mb-2">Begin Your Journey</h2>
          <p className="text-calm-600 mb-6 max-w-md mx-auto">
            Start tracking your growth. Add a challenge you&apos;re facing,
            record a milestone, or capture a private win.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/challenges/new"
              className="px-4 py-2 bg-calm-800 text-white rounded-lg text-sm font-medium hover:bg-calm-900 transition-colors"
            >
              Add Challenge
            </Link>
            <Link
              href="/milestones/new"
              className="px-4 py-2 bg-white text-calm-800 border border-calm-300 rounded-lg text-sm font-medium hover:bg-calm-50 transition-colors"
            >
              Record Milestone
            </Link>
            <Link
              href="/wins/new"
              className="px-4 py-2 bg-white text-calm-800 border border-calm-300 rounded-lg text-sm font-medium hover:bg-calm-50 transition-colors"
            >
              Capture Win
            </Link>
          </div>
        </section>
      )}

      {/* Manifesto Reminder */}
      <section className="bg-calm-50 rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-calm-800 mb-3">Remember</h3>
        <ul className="space-y-2 text-calm-600 text-sm">
          <li><strong>Your growth is yours.</strong> You don&apos;t need anyone else to validate what you&apos;ve learned.</li>
          <li><strong>Surprise yourself.</strong> The most meaningful accomplishments make you think &ldquo;I didn&apos;t know I could do that.&rdquo;</li>
          <li><strong>Compare only to yesterday.</strong> The only competition is with your past self.</li>
          <li><strong>Silent wins count.</strong> Not everything meaningful needs an audience.</li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-4 border border-calm-200 hover:border-calm-300 transition-colors"
    >
      <div className="text-2xl font-semibold text-calm-800">{value}</div>
      <div className="text-sm text-calm-500">{label}</div>
    </Link>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Link
      href={`/challenges/${challenge.id}`}
      className="block bg-white rounded-xl p-4 border border-calm-200 hover:border-calm-300 transition-colors"
    >
      <h3 className="font-medium text-calm-800">{challenge.title}</h3>
      <p className="text-sm text-calm-500 mt-1 line-clamp-1">{challenge.whyItMatters}</p>
      <div className="text-xs text-calm-400 mt-2">
        Started {new Date(challenge.dateStarted).toLocaleDateString()}
      </div>
    </Link>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-calm-200">
      <h3 className="font-medium text-calm-800 line-clamp-1">{milestone.moment}</h3>
      <p className="text-sm text-calm-500 mt-1 line-clamp-1">{milestone.skillGained}</p>
      <div className="text-xs text-calm-400 mt-2">
        {new Date(milestone.date).toLocaleDateString()}
      </div>
    </div>
  );
}

function WinCard({ win }: { win: PrivateWin }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-calm-200">
      <p className="text-calm-800 line-clamp-2">{win.content}</p>
      <div className="text-xs text-calm-400 mt-2">
        {new Date(win.date).toLocaleDateString()}
      </div>
    </div>
  );
}
