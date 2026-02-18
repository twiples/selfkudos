'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getData, updateChallenge, deleteChallenge } from '@/lib/storage';
import { Challenge } from '@/types';
import { useMode } from '@/contexts/ModeContext';

export default function ChallengeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { mode } = useMode();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Challenge>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const data = getData();
    const found = data.challenges.find(c => c.id === params.id);
    if (found) {
      setChallenge(found);
      setFormData(found);
    }
  }, [params.id]);

  const handleSave = () => {
    if (!challenge) return;

    const updated: Challenge = {
      ...challenge,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    updateChallenge(updated);
    setChallenge(updated);
    setIsEditing(false);
  };

  const handleStatusChange = (status: Challenge['status']) => {
    if (!challenge) return;

    const updated: Challenge = {
      ...challenge,
      status,
      dateCompleted: status === 'completed' ? new Date().toISOString().split('T')[0] : challenge.dateCompleted,
      updatedAt: new Date().toISOString(),
    };

    updateChallenge(updated);
    setChallenge(updated);
    setFormData(updated);
  };

  const handleDelete = () => {
    if (!challenge) return;
    deleteChallenge(challenge.id);
    router.push('/challenges');
  };

  if (!challenge) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <p className="text-ink-600">Challenge not found</p>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-gold-100 text-gold-800',
    completed: mode === 'career' ? 'bg-sage-100 text-sage-800' : 'bg-coral-100 text-coral-800',
    evolved: 'bg-coral-100 text-coral-800',
  };

  const focusClass = mode === 'career'
    ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
    : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500';

  const primaryButtonClass = mode === 'career'
    ? 'bg-sage-600 hover:bg-sage-700'
    : 'bg-coral-600 hover:bg-coral-700';

  const statusBoxClass = mode === 'career'
    ? 'bg-sage-50 border-sage-200'
    : 'bg-coral-50 border-coral-200';

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <button
        onClick={() => router.push('/challenges')}
        className="text-ink-500 hover:text-ink-700 text-sm mb-6 flex items-center"
      >
        &larr; Back to Challenges
      </button>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink-800 mb-2">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border border-ink-300 ${focusClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-2">Why It Matters</label>
            <textarea
              rows={4}
              value={formData.whyItMatters || ''}
              onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border border-ink-300 ${focusClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-2">Initial Fear</label>
            <textarea
              rows={3}
              value={formData.initialFear || ''}
              onChange={(e) => setFormData({ ...formData, initialFear: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border border-ink-300 ${focusClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-800 mb-2">Reflection</label>
            <textarea
              rows={4}
              value={formData.reflection || ''}
              onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border border-ink-300 ${focusClass}`}
              placeholder="What have you learned? How have you grown?"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className={`px-4 py-2 text-white rounded-lg font-medium ${primaryButtonClass}`}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setFormData(challenge);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-ink-600 hover:text-ink-800"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-semibold text-ink-900">{challenge.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[challenge.status]}`}>
              {challenge.status}
            </span>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ink-200 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-ink-500 mb-2">Why It Matters</h2>
              <p className="text-ink-800">{challenge.whyItMatters}</p>
            </div>

            {challenge.initialFear && (
              <div>
                <h2 className="text-sm font-medium text-ink-500 mb-2">Initial Fear / Doubt</h2>
                <p className="text-ink-800 italic">{challenge.initialFear}</p>
              </div>
            )}

            {challenge.reflection && (
              <div>
                <h2 className="text-sm font-medium text-ink-500 mb-2">Reflection</h2>
                <p className="text-ink-800">{challenge.reflection}</p>
              </div>
            )}

            <div className="flex space-x-6 text-sm text-ink-500 pt-4 border-t border-ink-100">
              <span>Started: {new Date(challenge.dateStarted).toLocaleDateString()}</span>
              {challenge.dateCompleted && (
                <span>Completed: {new Date(challenge.dateCompleted).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Status Actions */}
          <div className={`rounded-xl p-4 border ${statusBoxClass}`}>
            <h3 className="text-sm font-medium text-ink-800 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {(['active', 'completed', 'evolved'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={challenge.status === status}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    challenge.status === status
                      ? 'bg-ink-200 text-ink-400 cursor-not-allowed'
                      : 'bg-white border border-ink-300 text-ink-700 hover:bg-ink-50'
                  }`}
                >
                  Mark as {status}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className={`px-4 py-2 text-white rounded-lg font-medium ${primaryButtonClass}`}
            >
              Edit Challenge
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-coral-600 hover:text-coral-800"
            >
              Delete
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="bg-coral-50 border border-coral-200 rounded-xl p-4">
              <p className="text-coral-800 mb-3">Are you sure you want to delete this challenge?</p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 bg-coral-600 text-white rounded-lg text-sm hover:bg-coral-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-ink-600 hover:text-ink-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
