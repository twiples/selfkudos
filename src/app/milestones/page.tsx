'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData, deleteMilestone } from '@/lib/storage';
import { Milestone, SKILL_AREA_LABELS, InvisibleSkillArea } from '@/types';

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [filter, setFilter] = useState<'all' | InvisibleSkillArea>('all');

  useEffect(() => {
    const data = getData();
    setMilestones(data.milestones);
  }, []);

  const filteredMilestones = filter === 'all'
    ? milestones
    : milestones.filter(m => m.skillArea === filter);

  const handleDelete = (id: string) => {
    deleteMilestone(id);
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Growth Milestones</h1>
          <p className="text-stone-600 mt-1">Track moments of genuine surprise at your own capability</p>
        </div>
        <Link
          href="/milestones/new"
          className="px-4 py-2 bg-terracotta-600 text-white rounded-lg text-sm font-medium hover:bg-terracotta-700 transition-colors"
        >
          Record Milestone
        </Link>
      </div>

      {/* Skill Area Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-stone-800 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          All ({milestones.length})
        </button>
        {(Object.keys(SKILL_AREA_LABELS) as InvisibleSkillArea[]).map((area) => {
          const count = milestones.filter(m => m.skillArea === area).length;
          return (
            <button
              key={area}
              onClick={() => setFilter(area)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === area
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {SKILL_AREA_LABELS[area]} ({count})
            </button>
          );
        })}
      </div>

      {/* Milestones List */}
      {filteredMilestones.length > 0 ? (
        <div className="space-y-4">
          {filteredMilestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onDelete={() => handleDelete(milestone.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-terracotta-50 rounded-2xl border border-terracotta-100">
          <h2 className="text-lg font-semibold text-stone-800 mb-2">
            {filter === 'all' ? 'No milestones yet' : `No milestones in ${SKILL_AREA_LABELS[filter]}`}
          </h2>
          <p className="text-stone-600 mb-4">
            Record a moment when you surprised yourself with what you could do.
          </p>
          {filter === 'all' && (
            <Link
              href="/milestones/new"
              className="inline-flex px-4 py-2 bg-terracotta-600 text-white rounded-lg text-sm font-medium hover:bg-terracotta-700 transition-colors"
            >
              Record Your First Milestone
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function MilestoneCard({ milestone, onDelete }: { milestone: Milestone; onDelete: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 border border-stone-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-lg">{milestone.moment}</h3>

          <div className="mt-3 space-y-3">
            <div>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">The Struggle</span>
              <p className="text-stone-700 mt-1">{milestone.struggle}</p>
            </div>

            <div>
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Skill Gained</span>
              <p className="text-stone-700 mt-1">{milestone.skillGained}</p>
            </div>

            {milestone.privateReflection && (
              <div>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Private Reflection</span>
                <p className="text-stone-700 mt-1 italic">{milestone.privateReflection}</p>
              </div>
            )}
          </div>
        </div>

        {milestone.skillArea && (
          <span className="px-2.5 py-1 bg-terracotta-100 text-terracotta-800 rounded-full text-xs font-medium ml-4">
            {SKILL_AREA_LABELS[milestone.skillArea]}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
        <span className="text-xs text-stone-400">
          {new Date(milestone.date).toLocaleDateString()}
        </span>

        {showConfirm ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-stone-500">Delete?</span>
            <button
              onClick={onDelete}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-xs text-stone-500 hover:text-stone-700"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-xs text-stone-400 hover:text-stone-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
