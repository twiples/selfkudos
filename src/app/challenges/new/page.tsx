'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addChallenge } from '@/lib/storage';
import { Challenge } from '@/types';

export default function NewChallengePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    whyItMatters: '',
    initialFear: '',
    dateStarted: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const challenge: Challenge = {
      id: uuidv4(),
      title: formData.title,
      whyItMatters: formData.whyItMatters,
      initialFear: formData.initialFear,
      dateStarted: formData.dateStarted,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addChallenge(challenge);
    router.push('/challenges');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-calm-900 mb-2">Add New Challenge</h1>
      <p className="text-calm-600 mb-8">
        Document a meaningful challenge you&apos;re taking on. Focus on why it matters to you personally.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-calm-700 mb-2">
            Challenge Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="e.g., Lead my first cross-functional project"
          />
        </div>

        <div>
          <label htmlFor="whyItMatters" className="block text-sm font-medium text-calm-700 mb-2">
            Why It Matters to You
          </label>
          <textarea
            id="whyItMatters"
            required
            rows={4}
            value={formData.whyItMatters}
            onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="What's the personal significance? Why does this challenge matter to you specifically?"
          />
          <p className="text-xs text-calm-500 mt-1">
            Focus on personal significance, not organizational metrics
          </p>
        </div>

        <div>
          <label htmlFor="initialFear" className="block text-sm font-medium text-calm-700 mb-2">
            Initial Fear or Doubt
          </label>
          <textarea
            id="initialFear"
            rows={3}
            value={formData.initialFear}
            onChange={(e) => setFormData({ ...formData, initialFear: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="What makes this feel impossible or scary? What doubts do you have?"
          />
          <p className="text-xs text-calm-500 mt-1">
            Documenting your fears now helps you see growth later
          </p>
        </div>

        <div>
          <label htmlFor="dateStarted" className="block text-sm font-medium text-calm-700 mb-2">
            Date Started
          </label>
          <input
            type="date"
            id="dateStarted"
            required
            value={formData.dateStarted}
            onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-calm-800 text-white rounded-lg font-medium hover:bg-calm-900 transition-colors"
          >
            Add Challenge
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-3 text-calm-600 hover:text-calm-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
