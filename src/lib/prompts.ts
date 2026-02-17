import { ReflectionCategory } from '@/types';

export interface Prompt {
  text: string;
  category: ReflectionCategory;
}

export const PROMPTS: Prompt[] = [
  // Weekly Prompts
  { text: "What did you accomplish this week that no one else knows about?", category: 'weekly' },
  { text: "What felt impossible on Monday that feels possible now?", category: 'weekly' },
  { text: "What skill did you use that you didn't have a year ago?", category: 'weekly' },
  { text: "What would you tell yourself from 6 months ago?", category: 'weekly' },
  { text: "What challenge are you avoiding, and why?", category: 'weekly' },
  { text: "What did you do this week that scared you a little?", category: 'weekly' },
  { text: "What's something you finished that you almost gave up on?", category: 'weekly' },

  // Monthly Prompts
  { text: "What's the biggest way you've grown this month?", category: 'monthly' },
  { text: "What 'impossible' thing became possible?", category: 'monthly' },
  { text: "What do you know now that you didn't know 30 days ago?", category: 'monthly' },
  { text: "What are you most proud of that no one praised you for?", category: 'monthly' },

  // Quarterly Prompts
  { text: "How has your definition of success evolved?", category: 'quarterly' },
  { text: "What fear have you overcome?", category: 'quarterly' },
  { text: "What can you do now that seemed unreachable a year ago?", category: 'quarterly' },
  { text: "Who have you become?", category: 'quarterly' },

  // Protean Career Prompts
  { text: "Are your current career choices aligned with your core values?", category: 'protean-career' },
  { text: "What would you do differently if no one was watching or evaluating?", category: 'protean-career' },
  { text: "When did you last reinvent some aspect of how you work?", category: 'protean-career' },
  { text: "What skills are you developing for your future, not just your current role?", category: 'protean-career' },

  // Self-Determination Prompts
  { text: "When did you feel most autonomous this week?", category: 'self-determination' },
  { text: "What made you feel genuinely competent—not just productive?", category: 'self-determination' },
  { text: "How did your work connect to something larger than yourself?", category: 'self-determination' },
  { text: "Where did you exercise choice rather than just following instructions?", category: 'self-determination' },

  // Growth Mindset Prompts
  { text: "What challenge did you lean into rather than avoid?", category: 'growth-mindset' },
  { text: "What failure taught you something valuable?", category: 'growth-mindset' },
  { text: "Where did effort pay off in ways that surprised you?", category: 'growth-mindset' },
  { text: "What feedback did you receive that was hard to hear but useful?", category: 'growth-mindset' },

  // Systems Thinking Prompts
  { text: "What second-order effects did you anticipate correctly?", category: 'systems-thinking' },
  { text: "When did you connect dots that others missed?", category: 'systems-thinking' },
  { text: "How did understanding incentives help you navigate a situation?", category: 'systems-thinking' },
  { text: "What complexity did you successfully simplify for others?", category: 'systems-thinking' },

  // Leadership Prompts
  { text: "How did you influence an outcome without formal authority?", category: 'leadership' },
  { text: "When did you help the team move forward during uncertainty?", category: 'leadership' },
  { text: "What conflict did you help resolve?", category: 'leadership' },
  { text: "How did you create alignment where there was disagreement?", category: 'leadership' },

  // Strategic Judgment Prompts
  { text: "What did you choose NOT to pursue, and why was that right?", category: 'strategic-judgment' },
  { text: "When did you accept 'good enough' instead of perfect?", category: 'strategic-judgment' },
  { text: "What battle did you decide wasn't worth fighting?", category: 'strategic-judgment' },
  { text: "How did you balance short-term pressure with long-term thinking?", category: 'strategic-judgment' },

  // Resilience Prompts
  { text: "How did you bounce back from a setback this month?", category: 'resilience' },
  { text: "What stress did you manage better than you would have a year ago?", category: 'resilience' },
  { text: "When did you maintain composure in a difficult moment?", category: 'resilience' },
  { text: "What's a failure you've now fully processed and learned from?", category: 'resilience' },

  // Invisible Skills Prompts
  { text: "When did you choose progress over perfection this week? How did it feel?", category: 'strategic-judgment' },
  { text: "Describe a time you read the room and adjusted your approach.", category: 'leadership' },
  { text: "How did you help someone else succeed without getting credit?", category: 'leadership' },
  { text: "When did you stay calm in a moment that used to trigger you?", category: 'resilience' },
  { text: "What did you learn about organizational dynamics this month?", category: 'systems-thinking' },
  { text: "Describe a time you changed your mind. What convinced you?", category: 'growth-mindset' },
  { text: "When did you know it was time to let something go?", category: 'strategic-judgment' },
];

export function getRandomPrompt(): Prompt {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

export function getPromptsByCategory(category: ReflectionCategory): Prompt[] {
  return PROMPTS.filter(p => p.category === category);
}

export function getDailyPrompt(): Prompt {
  // Use date as seed for consistent daily prompt
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % PROMPTS.length;
  return PROMPTS[index];
}
