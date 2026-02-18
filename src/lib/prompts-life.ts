import { LifeReflectionCategory } from '@/types';

export interface LifePrompt {
  text: string;
  category: LifeReflectionCategory;
}

export const LIFE_PROMPTS: LifePrompt[] = [
  // Weekly Prompts
  { text: "What moment this week made you feel most alive?", category: 'weekly' },
  { text: "Who did you connect with deeply this week?", category: 'weekly' },
  { text: "What did you do just for yourself this week?", category: 'weekly' },
  { text: "What made you laugh this week?", category: 'weekly' },
  { text: "When did you feel most at peace?", category: 'weekly' },
  { text: "What boundary did you honor this week?", category: 'weekly' },
  { text: "What small joy did you notice today?", category: 'weekly' },

  // Monthly Prompts
  { text: "How has your relationship with yourself evolved this month?", category: 'monthly' },
  { text: "What new understanding did you gain about someone you care about?", category: 'monthly' },
  { text: "What habit served you well this month?", category: 'monthly' },
  { text: "What would you like more of next month?", category: 'monthly' },
  { text: "What did you let go of this month?", category: 'monthly' },

  // Quarterly Prompts
  { text: "How have your priorities shifted over the past few months?", category: 'quarterly' },
  { text: "What relationships have deepened?", category: 'quarterly' },
  { text: "What new practice has become part of who you are?", category: 'quarterly' },
  { text: "What version of yourself are you becoming?", category: 'quarterly' },

  // Relationships Prompts
  { text: "What did you learn about someone you love recently?", category: 'relationships' },
  { text: "When did you feel truly seen by someone this week?", category: 'relationships' },
  { text: "What conversation are you avoiding, and why?", category: 'relationships' },
  { text: "How did you show up for someone important to you?", category: 'relationships' },
  { text: "What do you appreciate about your closest relationships right now?", category: 'relationships' },
  { text: "When did you choose connection over being right?", category: 'relationships' },
  { text: "What would make your relationships feel more nourishing?", category: 'relationships' },

  // Health & Wellness Prompts
  { text: "How did you take care of your body this week?", category: 'health-wellness' },
  { text: "What does your body need that you've been ignoring?", category: 'health-wellness' },
  { text: "When did you feel most energized recently?", category: 'health-wellness' },
  { text: "What's one thing that would improve your sleep?", category: 'health-wellness' },
  { text: "How did you honor your need for rest?", category: 'health-wellness' },
  { text: "What movement brought you joy recently?", category: 'health-wellness' },
  { text: "What's one health intention you're proud of keeping?", category: 'health-wellness' },

  // Personal Growth Prompts
  { text: "What limiting belief are you ready to release?", category: 'personal-growth' },
  { text: "What would your future self thank you for doing today?", category: 'personal-growth' },
  { text: "When did you step outside your comfort zone recently?", category: 'personal-growth' },
  { text: "What are you learning about yourself right now?", category: 'personal-growth' },
  { text: "What pattern would you like to change?", category: 'personal-growth' },
  { text: "What does the best version of your day look like?", category: 'personal-growth' },
  { text: "What would you do differently if you weren't afraid?", category: 'personal-growth' },

  // Creativity Prompts
  { text: "When did you feel most creative recently?", category: 'creativity' },
  { text: "What did you make, build, or create this week?", category: 'creativity' },
  { text: "What inspires you right now?", category: 'creativity' },
  { text: "What creative project are you dreaming about?", category: 'creativity' },
  { text: "When did you play or experiment without worrying about the outcome?", category: 'creativity' },
  { text: "What would you create if no one would ever see it?", category: 'creativity' },

  // Mindfulness Prompts
  { text: "What are you present to right now?", category: 'mindfulness' },
  { text: "When did you feel fully in the moment this week?", category: 'mindfulness' },
  { text: "What thought pattern keeps pulling you away from now?", category: 'mindfulness' },
  { text: "What helped you slow down today?", category: 'mindfulness' },
  { text: "Where in your body do you hold tension?", category: 'mindfulness' },
  { text: "What would change if you were fully present right now?", category: 'mindfulness' },
  { text: "What are you noticing that you usually overlook?", category: 'mindfulness' },

  // Gratitude Prompts
  { text: "What are three things you're grateful for right now?", category: 'gratitude' },
  { text: "Who made a difference in your life recently?", category: 'gratitude' },
  { text: "What challenge are you secretly grateful for?", category: 'gratitude' },
  { text: "What simple pleasure did you enjoy today?", category: 'gratitude' },
  { text: "What about your home are you thankful for?", category: 'gratitude' },
  { text: "What aspect of your health are you grateful for?", category: 'gratitude' },
  { text: "What memory brings you joy when you think about it?", category: 'gratitude' },

  // Life Balance Prompts
  { text: "What's getting too much of your energy right now?", category: 'life-balance' },
  { text: "What area of life needs more attention?", category: 'life-balance' },
  { text: "What would make this week feel more balanced?", category: 'life-balance' },
  { text: "What are you saying yes to that should be a no?", category: 'life-balance' },
  { text: "How are you honoring your need for rest and play?", category: 'life-balance' },
  { text: "What would you subtract from your life to create more space?", category: 'life-balance' },
  { text: "If your week were perfectly balanced, what would change?", category: 'life-balance' },
];

export function getRandomLifePrompt(): LifePrompt {
  return LIFE_PROMPTS[Math.floor(Math.random() * LIFE_PROMPTS.length)];
}

export function getLifePromptsByCategory(category: LifeReflectionCategory): LifePrompt[] {
  return LIFE_PROMPTS.filter(p => p.category === category);
}

export function getDailyLifePrompt(): LifePrompt {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % LIFE_PROMPTS.length;
  return LIFE_PROMPTS[index];
}
