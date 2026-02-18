'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addPrivateWin } from '@/lib/storage';
import { PrivateWin } from '@/types';
import { useMode } from '@/contexts/ModeContext';

export default function NewWinPage() {
  const router = useRouter();
  const { mode } = useMode();
  const [formData, setFormData] = useState({
    content: '',
    significance: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const win: PrivateWin = {
      id: uuidv4(),
      content: formData.content,
      significance: formData.significance,
      date: formData.date,
      createdAt: new Date().toISOString(),
      context: mode,
    };

    addPrivateWin(win);
    router.push('/wins');
  };

  const placeholders = mode === 'career'
    ? {
        content: 'e.g., Finally spoke up in a meeting when I disagreed with the direction...',
        significance: 'What makes this significant? What did you overcome?',
      }
    : {
        content: 'e.g., Went for a walk instead of staying stressed at home...',
        significance: "Why does this matter to you? What does it represent?",
      };

  const examples = mode === 'career'
    ? [
        'Stayed calm during a stressful meeting',
        'Finished something I\'d been procrastinating on',
        'Asked for help when I normally wouldn\'t',
        'Let go of being right to get a better outcome',
        'Said no to something that wasn\'t a priority',
        'Helped someone without expecting recognition',
      ]
    : [
        'Took time for myself without guilt',
        'Had a meaningful conversation with a loved one',
        'Made a healthy choice when it was hard',
        'Noticed and appreciated a small moment',
        'Set a boundary and stuck to it',
        'Chose rest over productivity',
      ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink-900 mb-2">Capture a Private Win</h1>
      <p className="text-ink-600 mb-8">
        {mode === 'career'
          ? "Record an accomplishment that matters to you. It doesn't need to be big or impressive to others—just meaningful to you."
          : "Record a moment worth remembering. It doesn't need to be a major achievement—just something that matters to you."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-ink-800 mb-2">
            {mode === 'career' ? 'What did you accomplish?' : 'What happened?'}
          </label>
          <textarea
            id="content"
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
            placeholder={placeholders.content}
          />
        </div>

        <div>
          <label htmlFor="significance" className="block text-sm font-medium text-ink-800 mb-2">
            Why does this matter to you? (Optional)
          </label>
          <textarea
            id="significance"
            rows={3}
            value={formData.significance}
            onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
            placeholder={placeholders.significance}
          />
          <p className="text-xs text-ink-500 mt-1">
            Help your future self understand why this was a win
          </p>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-ink-800 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
          />
        </div>

        <div className="bg-gold-50 rounded-xl p-4 border border-gold-200">
          <h3 className="text-sm font-medium text-ink-800 mb-2">Examples of Private Wins</h3>
          <ul className="text-sm text-ink-600 space-y-1">
            {examples.map((example, i) => (
              <li key={i}>• {example}</li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-gold-600 text-white rounded-lg font-medium hover:bg-gold-700 transition-colors"
          >
            Capture Win
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
