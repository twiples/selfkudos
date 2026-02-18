export type AppMode = 'career' | 'life';

export interface Challenge {
  id: string;
  title: string;
  whyItMatters: string;
  initialFear: string;
  dateStarted: string;
  status: 'active' | 'completed' | 'evolved';
  reflection?: string;
  dateCompleted?: string;
  createdAt: string;
  updatedAt: string;
  context?: AppMode;
}

export interface Milestone {
  id: string;
  moment: string;
  struggle: string;
  skillGained: string;
  privateReflection: string;
  skillArea?: InvisibleSkillArea | LifeSkillArea;
  date: string;
  createdAt: string;
  context?: AppMode;
}

export interface PrivateWin {
  id: string;
  content: string;
  significance: string;
  date: string;
  createdAt: string;
  context?: AppMode;
}

export interface ReflectionEntry {
  id: string;
  prompt: string;
  response: string;
  category: ReflectionCategory | LifeReflectionCategory;
  date: string;
  createdAt: string;
  context?: AppMode;
}

export type InvisibleSkillArea =
  | 'navigation-intelligence'
  | 'strategic-judgment'
  | 'influence-without-authority'
  | 'self-mastery'
  | 'systems-thinking';

export type LifeSkillArea =
  | 'emotional-intelligence'
  | 'relationship-building'
  | 'self-care'
  | 'creativity'
  | 'mindfulness';

export type ReflectionCategory =
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'protean-career'
  | 'self-determination'
  | 'growth-mindset'
  | 'systems-thinking'
  | 'leadership'
  | 'strategic-judgment'
  | 'resilience';

export type LifeReflectionCategory =
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'relationships'
  | 'health-wellness'
  | 'personal-growth'
  | 'creativity'
  | 'mindfulness'
  | 'gratitude'
  | 'life-balance';

export interface AppData {
  challenges: Challenge[];
  milestones: Milestone[];
  privateWins: PrivateWin[];
  reflections: ReflectionEntry[];
}

export const SKILL_AREA_LABELS: Record<InvisibleSkillArea, string> = {
  'navigation-intelligence': 'Navigation Intelligence',
  'strategic-judgment': 'Strategic Judgment',
  'influence-without-authority': 'Influence Without Authority',
  'self-mastery': 'Self-Mastery',
  'systems-thinking': 'Systems Thinking',
};

export const REFLECTION_CATEGORY_LABELS: Record<ReflectionCategory, string> = {
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

export const LIFE_SKILL_AREA_LABELS: Record<LifeSkillArea, string> = {
  'emotional-intelligence': 'Emotional Intelligence',
  'relationship-building': 'Relationship Building',
  'self-care': 'Self-Care',
  'creativity': 'Creativity',
  'mindfulness': 'Mindfulness',
};

export const LIFE_REFLECTION_CATEGORY_LABELS: Record<LifeReflectionCategory, string> = {
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
