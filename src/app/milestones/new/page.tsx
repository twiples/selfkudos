'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addMilestone } from '@/lib/storage';
import { Milestone, SKILL_AREA_LABELS, InvisibleSkillArea } from '@/types';

export default function NewMilestonePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    moment: '',
    struggle: '',
    skillGained: '',
    privateReflection: '',
    skillArea: '' as InvisibleSkillArea | '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const milestone: Milestone = {
      id: uuidv4(),
      moment: formData.moment,
      struggle: formData.struggle,
      skillGained: formData.skillGained,
      privateReflection: formData.privateReflection,
      skillArea: formData.skillArea || undefined,
      date: formData.date,
      createdAt: new Date().toISOString(),
    };

    addMilestone(milestone);
    router.push('/milestones');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink-900 mb-2">Record a Milestone</h1>
      <p className="text-ink-600 mb-8">
        Capture a moment when you surprised yourself. What can you do now that you couldn&apos;t before?
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="moment" className="block text-sm font-medium text-ink-800 mb-2">
            The Moment
          </label>
          <textarea
            id="moment"
            required
            rows={3}
            value={formData.moment}
            onChange={(e) => setFormData({ ...formData, moment: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            placeholder="What happened that surprised you? What did you accomplish?"
          />
        </div>

        <div>
          <label htmlFor="struggle" className="block text-sm font-medium text-ink-800 mb-2">
            The Struggle
          </label>
          <textarea
            id="struggle"
            required
            rows={3}
            value={formData.struggle}
            onChange={(e) => setFormData({ ...formData, struggle: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            placeholder="What did you overcome to get there? What was hard about it?"
          />
        </div>

        <div>
          <label htmlFor="skillGained" className="block text-sm font-medium text-ink-800 mb-2">
            The Skill Gained
          </label>
          <textarea
            id="skillGained"
            required
            rows={2}
            value={formData.skillGained}
            onChange={(e) => setFormData({ ...formData, skillGained: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            placeholder="What can you now do that you couldn't before?"
          />
        </div>

        <div>
          <label htmlFor="privateReflection" className="block text-sm font-medium text-ink-800 mb-2">
            Private Reflection
          </label>
          <textarea
            id="privateReflection"
            rows={3}
            value={formData.privateReflection}
            onChange={(e) => setFormData({ ...formData, privateReflection: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            placeholder="How did this change your self-perception? What does this mean to you personally?"
          />
          <p className="text-xs text-ink-500 mt-1">
            This is for you alone. Be honest with yourself.
          </p>
        </div>

        <div>
          <label htmlFor="skillArea" className="block text-sm font-medium text-ink-800 mb-2">
            Skill Area (Optional)
          </label>
          <select
            id="skillArea"
            value={formData.skillArea}
            onChange={(e) => setFormData({ ...formData, skillArea: e.target.value as InvisibleSkillArea | '' })}
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
          >
            <option value="">Select a skill area...</option>
            {(Object.keys(SKILL_AREA_LABELS) as InvisibleSkillArea[]).map((area) => (
              <option key={area} value={area}>
                {SKILL_AREA_LABELS[area]}
              </option>
            ))}
          </select>
          <p className="text-xs text-ink-500 mt-1">
            Categorize this milestone by the type of &quot;invisible skill&quot; it demonstrates
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
            className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-coral-600 text-white rounded-lg font-medium hover:bg-coral-700 transition-colors"
          >
            Record Milestone
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
