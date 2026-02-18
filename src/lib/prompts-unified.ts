import { AppMode, ReflectionCategory, LifeReflectionCategory } from '@/types';
import { PROMPTS, Prompt, getRandomPrompt, getPromptsByCategory, getDailyPrompt } from './prompts';
import { LIFE_PROMPTS, LifePrompt, getRandomLifePrompt, getLifePromptsByCategory, getDailyLifePrompt } from './prompts-life';

export type UnifiedPrompt = Prompt | LifePrompt;
export type UnifiedCategory = ReflectionCategory | LifeReflectionCategory;

export function getPromptsByMode(mode: AppMode): UnifiedPrompt[] {
  return mode === 'career' ? PROMPTS : LIFE_PROMPTS;
}

export function getRandomPromptByMode(mode: AppMode): UnifiedPrompt {
  return mode === 'career' ? getRandomPrompt() : getRandomLifePrompt();
}

export function getPromptsByCategoryAndMode(
  category: UnifiedCategory,
  mode: AppMode
): UnifiedPrompt[] {
  if (mode === 'career') {
    return getPromptsByCategory(category as ReflectionCategory);
  }
  return getLifePromptsByCategory(category as LifeReflectionCategory);
}

export function getDailyPromptByMode(mode: AppMode): UnifiedPrompt {
  return mode === 'career' ? getDailyPrompt() : getDailyLifePrompt();
}

export function getCategoriesForMode(mode: AppMode): UnifiedCategory[] {
  if (mode === 'career') {
    return [
      'weekly',
      'monthly',
      'quarterly',
      'protean-career',
      'self-determination',
      'growth-mindset',
      'systems-thinking',
      'leadership',
      'strategic-judgment',
      'resilience',
    ];
  }
  return [
    'weekly',
    'monthly',
    'quarterly',
    'relationships',
    'health-wellness',
    'personal-growth',
    'creativity',
    'mindfulness',
    'gratitude',
    'life-balance',
  ];
}

export function getCategoryLabel(category: UnifiedCategory, mode: AppMode): string {
  if (mode === 'career') {
    const labels: Record<ReflectionCategory, string> = {
      'weekly': 'Weekly',
      'monthly': 'Monthly',
      'quarterly': 'Quarterly',
      'protean-career': 'Protean Career',
      'self-determination': 'Self-Determination',
      'growth-mindset': 'Growth Mindset',
      'systems-thinking': 'Systems Thinking',
      'leadership': 'Leadership',
      'strategic-judgment': 'Strategic Judgment',
      'resilience': 'Resilience',
    };
    return labels[category as ReflectionCategory] || category;
  }

  const labels: Record<LifeReflectionCategory, string> = {
    'weekly': 'Weekly',
    'monthly': 'Monthly',
    'quarterly': 'Quarterly',
    'relationships': 'Relationships',
    'health-wellness': 'Health & Wellness',
    'personal-growth': 'Personal Growth',
    'creativity': 'Creativity',
    'mindfulness': 'Mindfulness',
    'gratitude': 'Gratitude',
    'life-balance': 'Life Balance',
  };
  return labels[category as LifeReflectionCategory] || category;
}
