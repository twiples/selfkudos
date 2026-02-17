'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getData, updateChallenge, deleteChallenge } from '@/lib/storage';
import { Challenge } from '@/types';

export default function ChallengeDetailPage() {
  const router = useRouter();
  const params = useParams();
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
        <p className="text-calm-600">Challenge not found</p>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-800',
    evolved: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <button
        onClick={() => router.push('/challenges')}
        className="text-calm-500 hover:text-calm-700 text-sm mb-6 flex items-center"
      >
        &larr; Back to Challenges
      </button>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-calm-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-calm-700 mb-2">Why It Matters</label>
            <textarea
              rows={4}
              value={formData.whyItMatters || ''}
              onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-calm-700 mb-2">Initial Fear</label>
            <textarea
              rows={3}
              value={formData.initialFear || ''}
              onChange={(e) => setFormData({ ...formData, initialFear: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-calm-700 mb-2">Reflection</label>
            <textarea
              rows={4}
              value={formData.reflection || ''}
              onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="What have you learned? How have you grown?"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-calm-800 text-white rounded-lg font-medium hover:bg-calm-900"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setFormData(challenge);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-calm-600 hover:text-calm-800"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-semibold text-calm-900">{challenge.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[challenge.status]}`}>
              {challenge.status}
            </span>
          </div>

          <div className="bg-white rounded-xl p-6 border border-calm-200 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-calm-500 mb-2">Why It Matters</h2>
              <p className="text-calm-800">{challenge.whyItMatters}</p>
            </div>

            {challenge.initialFear && (
              <div>
                <h2 className="text-sm font-medium text-calm-500 mb-2">Initial Fear / Doubt</h2>
                <p className="text-calm-800 italic">{challenge.initialFear}</p>
              </div>
            )}

            {challenge.reflection && (
              <div>
                <h2 className="text-sm font-medium text-calm-500 mb-2">Reflection</h2>
                <p className="text-calm-800">{challenge.reflection}</p>
              </div>
            )}

            <div className="flex space-x-6 text-sm text-calm-500 pt-4 border-t border-calm-100">
              <span>Started: {new Date(challenge.dateStarted).toLocaleDateString()}</span>
              {challenge.dateCompleted && (
                <span>Completed: {new Date(challenge.dateCompleted).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Status Actions */}
          <div className="bg-calm-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-calm-700 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {(['active', 'completed', 'evolved'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={challenge.status === status}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    challenge.status === status
                      ? 'bg-calm-300 text-calm-500 cursor-not-allowed'
                      : 'bg-white border border-calm-300 text-calm-700 hover:bg-calm-100'
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
              className="px-4 py-2 bg-calm-800 text-white rounded-lg font-medium hover:bg-calm-900"
            >
              Edit Challenge
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800 mb-3">Are you sure you want to delete this challenge?</p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDelete}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-calm-600 hover:text-calm-800 text-sm"
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
