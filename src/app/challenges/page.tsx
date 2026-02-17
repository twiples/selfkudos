'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData } from '@/lib/storage';
import { Challenge } from '@/types';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'evolved'>('all');

  useEffect(() => {
    const data = getData();
    setChallenges(data.challenges);
  }, []);

  const filteredChallenges = filter === 'all'
    ? challenges
    : challenges.filter(c => c.status === filter);

  const statusCounts = {
    all: challenges.length,
    active: challenges.filter(c => c.status === 'active').length,
    completed: challenges.filter(c => c.status === 'completed').length,
    evolved: challenges.filter(c => c.status === 'evolved').length,
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-calm-900">Challenge Journal</h1>
          <p className="text-calm-600 mt-1">Document meaningful challenges you&apos;ve taken on</p>
        </div>
        <Link
          href="/challenges/new"
          className="px-4 py-2 bg-calm-800 text-white rounded-lg text-sm font-medium hover:bg-calm-900 transition-colors"
        >
          Add Challenge
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {(['all', 'active', 'completed', 'evolved'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-calm-800 text-white'
                : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {/* Challenge List */}
      {filteredChallenges.length > 0 ? (
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-calm-50 rounded-2xl">
          <h2 className="text-lg font-semibold text-calm-800 mb-2">
            {filter === 'all' ? 'No challenges yet' : `No ${filter} challenges`}
          </h2>
          <p className="text-calm-600 mb-4">
            {filter === 'all'
              ? 'Start by adding a challenge you\'re currently facing.'
              : 'Try a different filter or add a new challenge.'}
          </p>
          {filter === 'all' && (
            <Link
              href="/challenges/new"
              className="inline-flex px-4 py-2 bg-calm-800 text-white rounded-lg text-sm font-medium hover:bg-calm-900 transition-colors"
            >
              Add Your First Challenge
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const statusColors = {
    active: 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-800',
    evolved: 'bg-purple-100 text-purple-800',
  };

  return (
    <Link
      href={`/challenges/${challenge.id}`}
      className="block bg-white rounded-xl p-5 border border-calm-200 hover:border-calm-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-calm-800 text-lg">{challenge.title}</h3>
          <p className="text-calm-600 mt-2">{challenge.whyItMatters}</p>
          {challenge.initialFear && (
            <p className="text-calm-500 text-sm mt-2 italic">
              Initial fear: {challenge.initialFear}
            </p>
          )}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[challenge.status]}`}>
          {challenge.status}
        </span>
      </div>
      <div className="flex items-center space-x-4 mt-4 text-xs text-calm-400">
        <span>Started {new Date(challenge.dateStarted).toLocaleDateString()}</span>
        {challenge.dateCompleted && (
          <span>Completed {new Date(challenge.dateCompleted).toLocaleDateString()}</span>
        )}
      </div>
    </Link>
  );
}
