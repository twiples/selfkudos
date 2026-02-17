'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addPrivateWin } from '@/lib/storage';
import { PrivateWin } from '@/types';

export default function NewWinPage() {
  const router = useRouter();
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
    };

    addPrivateWin(win);
    router.push('/wins');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink-900 mb-2">Capture a Private Win</h1>
      <p className="text-ink-600 mb-8">
        Record an accomplishment that matters to you. It doesn&apos;t need to be big or impressive
        to others—just meaningful to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-ink-700 mb-2">
            What did you accomplish?
          </label>
          <textarea
            id="content"
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-ink-500 focus:border-ink-500 transition-colors"
            placeholder="e.g., Finally spoke up in a meeting when I disagreed with the direction..."
          />
        </div>

        <div>
          <label htmlFor="significance" className="block text-sm font-medium text-ink-700 mb-2">
            Why does this matter to you? (Optional)
          </label>
          <textarea
            id="significance"
            rows={3}
            value={formData.significance}
            onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-ink-500 focus:border-ink-500 transition-colors"
            placeholder="What makes this significant? What did you overcome?"
          />
          <p className="text-xs text-ink-500 mt-1">
            Help your future self understand why this was a win
          </p>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-ink-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-ink-500 focus:border-ink-500 transition-colors"
          />
        </div>

        <div className="bg-ink-50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-ink-700 mb-2">Examples of Private Wins</h3>
          <ul className="text-sm text-ink-600 space-y-1">
            <li>• Stayed calm during a stressful meeting</li>
            <li>• Finished something I&apos;d been procrastinating on</li>
            <li>• Asked for help when I normally wouldn&apos;t</li>
            <li>• Let go of being right to get a better outcome</li>
            <li>• Said no to something that wasn&apos;t a priority</li>
            <li>• Helped someone without expecting recognition</li>
          </ul>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-ink-800 text-white rounded-lg font-medium hover:bg-ink-900 transition-colors"
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
