'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addChallenge } from '@/lib/storage';
import { Challenge } from '@/types';
import { useMode } from '@/contexts/ModeContext';

export default function NewChallengePage() {
  const router = useRouter();
  const { mode } = useMode();
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
      context: mode,
    };

    addChallenge(challenge);
    router.push('/challenges');
  };

  const placeholders = mode === 'career'
    ? {
        title: 'e.g., Lead my first cross-functional project',
        whyItMatters: "What's the personal significance? Why does this challenge matter to you specifically?",
        initialFear: 'What makes this feel impossible or scary? What doubts do you have?',
      }
    : {
        title: 'e.g., Establish a morning meditation practice',
        whyItMatters: "What's the personal significance? How will this improve your life?",
        initialFear: 'What makes this feel difficult? What obstacles do you anticipate?',
      };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink-900 mb-2">Add New Challenge</h1>
      <p className="text-ink-600 mb-8">
        {mode === 'career'
          ? "Document a meaningful professional challenge you're taking on."
          : "Document a meaningful personal challenge you're working on."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-ink-800 mb-2">
            Challenge Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border border-ink-300 transition-colors ${
              mode === 'career'
                ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
                : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500'
            }`}
            placeholder={placeholders.title}
          />
        </div>

        <div>
          <label htmlFor="whyItMatters" className="block text-sm font-medium text-ink-800 mb-2">
            Why It Matters to You
          </label>
          <textarea
            id="whyItMatters"
            required
            rows={4}
            value={formData.whyItMatters}
            onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border border-ink-300 transition-colors ${
              mode === 'career'
                ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
                : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500'
            }`}
            placeholder={placeholders.whyItMatters}
          />
          <p className="text-xs text-ink-500 mt-1">
            {mode === 'career'
              ? 'Focus on personal significance, not organizational metrics'
              : 'Focus on what this means for your wellbeing and growth'}
          </p>
        </div>

        <div>
          <label htmlFor="initialFear" className="block text-sm font-medium text-ink-800 mb-2">
            Initial Fear or Doubt
          </label>
          <textarea
            id="initialFear"
            rows={3}
            value={formData.initialFear}
            onChange={(e) => setFormData({ ...formData, initialFear: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border border-ink-300 transition-colors ${
              mode === 'career'
                ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
                : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500'
            }`}
            placeholder={placeholders.initialFear}
          />
          <p className="text-xs text-ink-500 mt-1">
            Documenting your fears now helps you see growth later
          </p>
        </div>

        <div>
          <label htmlFor="dateStarted" className="block text-sm font-medium text-ink-800 mb-2">
            Date Started
          </label>
          <input
            type="date"
            id="dateStarted"
            required
            value={formData.dateStarted}
            onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border border-ink-300 transition-colors ${
              mode === 'career'
                ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
                : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500'
            }`}
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors ${
              mode === 'career'
                ? 'bg-sage-600 hover:bg-sage-700'
                : 'bg-coral-600 hover:bg-coral-700'
            }`}
          >
            Add Challenge
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-3 text-ink-600 hover:text-ink-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
