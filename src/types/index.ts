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
}

export interface Milestone {
  id: string;
  moment: string;
  struggle: string;
  skillGained: string;
  privateReflection: string;
  skillArea?: InvisibleSkillArea;
  date: string;
  createdAt: string;
}

export interface PrivateWin {
  id: string;
  content: string;
  significance: string;
  date: string;
  createdAt: string;
}

export interface ReflectionEntry {
  id: string;
  prompt: string;
  response: string;
  category: ReflectionCategory;
  date: string;
  createdAt: string;
}

export type InvisibleSkillArea =
  | 'navigation-intelligence'
  | 'strategic-judgment'
  | 'influence-without-authority'
  | 'self-mastery'
  | 'systems-thinking';

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
