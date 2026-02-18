'use client';

import { AppData, AppMode, Challenge, Milestone, PrivateWin, ReflectionEntry } from '@/types';

const STORAGE_KEY = 'selfkudos_data';

const defaultData: AppData = {
  challenges: [],
  milestones: [],
  privateWins: [],
  reflections: [],
};

export function getData(): AppData {
  if (typeof window === 'undefined') return defaultData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    return JSON.parse(stored);
  } catch {
    return defaultData;
  }
}

export function getDataByMode(mode: AppMode): AppData {
  const data = getData();
  return {
    challenges: data.challenges.filter(c => (c.context || 'career') === mode),
    milestones: data.milestones.filter(m => (m.context || 'career') === mode),
    privateWins: data.privateWins.filter(w => (w.context || 'career') === mode),
    reflections: data.reflections.filter(r => (r.context || 'career') === mode),
  };
}

export function saveData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Challenge operations
export function addChallenge(challenge: Challenge): void {
  const data = getData();
  data.challenges.unshift(challenge);
  saveData(data);
}

export function updateChallenge(challenge: Challenge): void {
  const data = getData();
  const index = data.challenges.findIndex(c => c.id === challenge.id);
  if (index !== -1) {
    data.challenges[index] = challenge;
    saveData(data);
  }
}

export function deleteChallenge(id: string): void {
  const data = getData();
  data.challenges = data.challenges.filter(c => c.id !== id);
  saveData(data);
}

// Milestone operations
export function addMilestone(milestone: Milestone): void {
  const data = getData();
  data.milestones.unshift(milestone);
  saveData(data);
}

export function deleteMilestone(id: string): void {
  const data = getData();
  data.milestones = data.milestones.filter(m => m.id !== id);
  saveData(data);
}

// Private Win operations
export function addPrivateWin(win: PrivateWin): void {
  const data = getData();
  data.privateWins.unshift(win);
  saveData(data);
}

export function deletePrivateWin(id: string): void {
  const data = getData();
  data.privateWins = data.privateWins.filter(w => w.id !== id);
  saveData(data);
}

// Reflection operations
export function addReflection(reflection: ReflectionEntry): void {
  const data = getData();
  data.reflections.unshift(reflection);
  saveData(data);
}

export function deleteReflection(id: string): void {
  const data = getData();
  data.reflections = data.reflections.filter(r => r.id !== id);
  saveData(data);
}

// Export data
export function exportData(): string {
  const data = getData();
  return JSON.stringify(data, null, 2);
}

// Import data
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as AppData;
    if (data.challenges && data.milestones && data.privateWins && data.reflections) {
      saveData(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
