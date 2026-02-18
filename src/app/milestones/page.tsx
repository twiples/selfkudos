'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDataByMode, deleteMilestone } from '@/lib/storage';
import { Milestone, SKILL_AREA_LABELS, LIFE_SKILL_AREA_LABELS, InvisibleSkillArea, LifeSkillArea } from '@/types';
import { useMode } from '@/contexts/ModeContext';

type SkillFilter = 'all' | InvisibleSkillArea | LifeSkillArea;

export default function MilestonesPage() {
  const { mode } = useMode();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [filter, setFilter] = useState<SkillFilter>('all');

  useEffect(() => {
    const data = getDataByMode(mode);
    setMilestones(data.milestones);
    setFilter('all'); // Reset filter when mode changes
  }, [mode]);

  const filteredMilestones = filter === 'all'
    ? milestones
    : milestones.filter(m => m.skillArea === filter);

  const handleDelete = (id: string) => {
    deleteMilestone(id);
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const skillAreaLabels = mode === 'career' ? SKILL_AREA_LABELS : LIFE_SKILL_AREA_LABELS;
  const skillAreas = mode === 'career'
    ? (Object.keys(SKILL_AREA_LABELS) as InvisibleSkillArea[])
    : (Object.keys(LIFE_SKILL_AREA_LABELS) as LifeSkillArea[]);

  const primaryColor = mode === 'career' ? 'coral' : 'coral';
  const buttonClass = mode === 'career'
    ? 'bg-coral-600 hover:bg-coral-700'
    : 'bg-coral-600 hover:bg-coral-700';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Growth Milestones</h1>
          <p className="text-ink-600 mt-1">
            {mode === 'career'
              ? 'Track moments of genuine surprise at your own professional capability'
              : 'Track moments of personal growth and self-discovery'}
          </p>
        </div>
        <Link
          href="/milestones/new"
          className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${buttonClass}`}
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
              ? 'bg-ink-900 text-white'
              : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
          }`}
        >
          All ({milestones.length})
        </button>
        {skillAreas.map((area) => {
          const count = milestones.filter(m => m.skillArea === area).length;
          return (
            <button
              key={area}
              onClick={() => setFilter(area as SkillFilter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === area
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {skillAreaLabels[area as keyof typeof skillAreaLabels]} ({count})
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
              mode={mode}
              skillAreaLabels={skillAreaLabels}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-coral-50 rounded-2xl border border-coral-200">
          <h2 className="text-lg font-semibold text-ink-800 mb-2">
            {filter === 'all'
              ? 'No milestones yet'
              : `No milestones in ${skillAreaLabels[filter as keyof typeof skillAreaLabels]}`}
          </h2>
          <p className="text-ink-600 mb-4">
            {mode === 'career'
              ? 'Record a moment when you surprised yourself with what you could do at work.'
              : 'Record a moment of personal growth or self-discovery.'}
          </p>
          {filter === 'all' && (
            <Link
              href="/milestones/new"
              className={`inline-flex px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${buttonClass}`}
            >
              Record Your First Milestone
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function MilestoneCard({
  milestone,
  onDelete,
  mode,
  skillAreaLabels,
}: {
  milestone: Milestone;
  onDelete: () => void;
  mode: 'career' | 'life';
  skillAreaLabels: Record<string, string>;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 border border-ink-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-ink-900 text-lg">{milestone.moment}</h3>

          <div className="mt-3 space-y-3">
            <div>
              <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">The Struggle</span>
              <p className="text-ink-700 mt-1">{milestone.struggle}</p>
            </div>

            <div>
              <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">Skill Gained</span>
              <p className="text-ink-700 mt-1">{milestone.skillGained}</p>
            </div>

            {milestone.privateReflection && (
              <div>
                <span className="text-xs font-medium text-ink-500 uppercase tracking-wide">Private Reflection</span>
                <p className="text-ink-700 mt-1 italic">{milestone.privateReflection}</p>
              </div>
            )}
          </div>
        </div>

        {milestone.skillArea && (
          <span className="px-2.5 py-1 bg-coral-100 text-coral-800 rounded-full text-xs font-medium ml-4">
            {skillAreaLabels[milestone.skillArea] || milestone.skillArea}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
        <span className="text-xs text-ink-500">
          {new Date(milestone.date).toLocaleDateString()}
        </span>

        {showConfirm ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-ink-500">Delete?</span>
            <button
              onClick={onDelete}
              className="text-xs text-coral-600 hover:text-coral-800"
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
