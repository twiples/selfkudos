'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData, deletePrivateWin } from '@/lib/storage';
import { PrivateWin } from '@/types';

export default function WinsPage() {
  const [wins, setWins] = useState<PrivateWin[]>([]);

  useEffect(() => {
    const data = getData();
    setWins(data.privateWins);
  }, []);

  const handleDelete = (id: string) => {
    deletePrivateWin(id);
    setWins(wins.filter(w => w.id !== id));
  };

  // Group wins by month
  const groupedWins = wins.reduce((acc, win) => {
    const date = new Date(win.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!acc[key]) {
      acc[key] = { label, wins: [] };
    }
    acc[key].wins.push(win);
    return acc;
  }, {} as Record<string, { label: string; wins: PrivateWin[] }>);

  const sortedGroups = Object.entries(groupedWins).sort(([a], [b]) => b.localeCompare(a));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Private Wins</h1>
          <p className="text-ink-600 mt-1">
            Small victories that only you know the significance of
          </p>
        </div>
        <Link
          href="/wins/new"
          className="px-4 py-2 bg-ink-800 text-white rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors"
        >
          Capture Win
        </Link>
      </div>

      {/* Info Box */}
      <div className="bg-ink-50 border border-ink-200 rounded-xl p-4">
        <p className="text-ink-800 text-sm">
          <strong>Silent wins count.</strong> These are accomplishments that don&apos;t need external
          validation—things only you know the true significance of. No sharing feature, no audience.
          This is for you alone.
        </p>
      </div>

      {/* Wins List */}
      {sortedGroups.length > 0 ? (
        <div className="space-y-8">
          {sortedGroups.map(([key, group]) => (
            <div key={key}>
              <h2 className="text-sm font-medium text-ink-500 mb-3">{group.label}</h2>
              <div className="space-y-3">
                {group.wins.map((win) => (
                  <WinCard
                    key={win.id}
                    win={win}
                    onDelete={() => handleDelete(win.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-ink-50 rounded-2xl">
          <h2 className="text-lg font-semibold text-ink-800 mb-2">No wins recorded yet</h2>
          <p className="text-ink-600 mb-4 max-w-md mx-auto">
            Capture those small victories that matter to you. The ones that don&apos;t need
            recognition from others but still deserve to be remembered.
          </p>
          <Link
            href="/wins/new"
            className="inline-flex px-4 py-2 bg-ink-800 text-white rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors"
          >
            Capture Your First Win
          </Link>
        </div>
      )}
    </div>
  );
}

function WinCard({ win, onDelete }: { win: PrivateWin; onDelete: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 border border-ink-200">
      <p className="text-ink-800">{win.content}</p>

      {win.significance && (
        <p className="text-ink-600 text-sm mt-3 italic">
          Why it matters: {win.significance}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-100">
        <span className="text-xs text-ink-400">
          {new Date(win.date).toLocaleDateString()}
        </span>

        {showConfirm ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-ink-500">Delete?</span>
            <button
              onClick={onDelete}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-xs text-ink-500 hover:text-ink-700"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-xs text-ink-400 hover:text-ink-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
