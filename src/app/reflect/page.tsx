'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDataByMode, addReflection, deleteReflection } from '@/lib/storage';
import {
  getRandomPromptByMode,
  getPromptsByCategoryAndMode,
  getCategoriesForMode,
  getCategoryLabel,
  UnifiedCategory,
} from '@/lib/prompts-unified';
import { ReflectionEntry, ReflectionCategory, LifeReflectionCategory } from '@/types';
import { useMode } from '@/contexts/ModeContext';

export default function ReflectPage() {
  const { mode } = useMode();
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<UnifiedCategory>('weekly');
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [filterCategory, setFilterCategory] = useState<UnifiedCategory | 'all'>('all');

  useEffect(() => {
    const data = getDataByMode(mode);
    setReflections(data.reflections);
    setCurrentPrompt(getRandomPromptByMode(mode).text);
    setCurrentCategory('weekly');
    setFilterCategory('all');
  }, [mode]);

  const handleNewPrompt = () => {
    const prompts = getPromptsByCategoryAndMode(currentCategory, mode);
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    const reflection: ReflectionEntry = {
      id: uuidv4(),
      prompt: currentPrompt,
      response: response.trim(),
      category: currentCategory as ReflectionCategory | LifeReflectionCategory,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      context: mode,
    };

    addReflection(reflection);
    setReflections([reflection, ...reflections]);
    setResponse('');
    handleNewPrompt();
  };

  const categories = getCategoriesForMode(mode);
  const focusClass = mode === 'career'
    ? 'focus:ring-2 focus:ring-sage-500 focus:border-sage-500'
    : 'focus:ring-2 focus:ring-coral-500 focus:border-coral-500';
  const primaryButtonClass = mode === 'career'
    ? 'bg-sage-600 hover:bg-sage-700'
    : 'bg-coral-600 hover:bg-coral-700';
  const promptBgClass = mode === 'career'
    ? 'bg-sage-700'
    : 'bg-coral-700';
  const promptAccentClass = mode === 'career'
    ? 'text-sage-200'
    : 'text-coral-200';
  const categoryActiveClass = mode === 'career'
    ? 'bg-sage-600 text-white'
    : 'bg-coral-600 text-white';

  const handleDelete = (id: string) => {
    deleteReflection(id);
    setReflections(reflections.filter(r => r.id !== id));
  };

  const filteredReflections = filterCategory === 'all'
    ? reflections
    : reflections.filter(r => r.category === filterCategory);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Reflect</h1>
        <p className="text-ink-600 mt-1">
          {mode === 'career'
            ? 'Take time to understand your professional growth. Reflection beats reaction.'
            : 'Take time to understand your journey. Reflection brings clarity.'}
        </p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl p-4 border border-ink-200">
        <label className="block text-sm font-medium text-ink-800 mb-3">
          Choose a reflection category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
                const prompts = getPromptsByCategoryAndMode(category, mode);
                setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)].text);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentCategory === category
                  ? categoryActiveClass
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {getCategoryLabel(category, mode)}
            </button>
          ))}
        </div>
      </div>

      {/* Current Prompt */}
      <div className={`${promptBgClass} text-white rounded-2xl p-6`}>
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-medium ${promptAccentClass} uppercase tracking-wide`}>
            {getCategoryLabel(currentCategory, mode)} Prompt
          </span>
          <button
            onClick={handleNewPrompt}
            className={`text-xs ${promptAccentClass} hover:text-white font-medium`}
          >
            Different prompt
          </button>
        </div>
        <p className="text-xl font-medium">{currentPrompt}</p>
      </div>

      {/* Response Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="response" className="block text-sm font-medium text-ink-800 mb-2">
            Your Reflection
          </label>
          <textarea
            id="response"
            rows={6}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-ink-300 transition-colors ${focusClass}`}
            placeholder={mode === 'career' ? 'Take your time. This is for you...' : 'Let your thoughts flow. This is your space...'}
          />
        </div>
        <button
          type="submit"
          disabled={!response.trim()}
          className={`px-6 py-3 text-white rounded-lg font-medium disabled:bg-ink-300 disabled:cursor-not-allowed transition-colors ${primaryButtonClass}`}
        >
          Save Reflection
        </button>
      </form>

      {/* History Toggle */}
      <div className="border-t border-ink-200 pt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center text-ink-600 hover:text-ink-800 font-medium"
        >
          <span>{showHistory ? 'Hide' : 'Show'} Past Reflections ({reflections.length})</span>
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform ${showHistory ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Reflection History */}
      {showHistory && (
        <div className="space-y-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterCategory === 'all'
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterCategory === category
                    ? 'bg-ink-900 text-white'
                    : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
                }`}
              >
                {getCategoryLabel(category, mode)}
              </button>
            ))}
          </div>

          {/* Reflections List */}
          {filteredReflections.length > 0 ? (
            <div className="space-y-4">
              {filteredReflections.map((reflection) => (
                <ReflectionCard
                  key={reflection.id}
                  reflection={reflection}
                  onDelete={() => handleDelete(reflection.id)}
                  mode={mode}
                />
              ))}
            </div>
          ) : (
            <p className="text-ink-500 text-center py-8">
              {filterCategory === 'all'
                ? 'No reflections yet. Start by answering the prompt above.'
                : `No reflections in ${getCategoryLabel(filterCategory, mode)} category.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ReflectionCard({
  reflection,
  onDelete,
  mode,
}: {
  reflection: ReflectionEntry;
  onDelete: () => void;
  mode: 'career' | 'life';
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const badgeClass = mode === 'career'
    ? 'bg-sage-100 text-sage-800'
    : 'bg-coral-100 text-coral-800';

  return (
    <div className="bg-white rounded-xl p-5 border border-ink-200">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${badgeClass}`}>
          {getCategoryLabel(reflection.category as UnifiedCategory, mode)}
        </span>
        <span className="text-xs text-ink-500">
          {new Date(reflection.date).toLocaleDateString()}
        </span>
      </div>

      <p className="text-ink-600 text-sm italic mb-3">&ldquo;{reflection.prompt}&rdquo;</p>
      <p className="text-ink-800 whitespace-pre-wrap">{reflection.response}</p>

      <div className="mt-4 pt-3 border-t border-ink-100 flex justify-end">
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
