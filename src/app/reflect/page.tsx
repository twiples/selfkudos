'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getData, addReflection, deleteReflection } from '@/lib/storage';
import { PROMPTS, getRandomPrompt, getPromptsByCategory } from '@/lib/prompts';
import { ReflectionEntry, ReflectionCategory, REFLECTION_CATEGORY_LABELS } from '@/types';

export default function ReflectPage() {
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<ReflectionCategory>('weekly');
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ReflectionCategory | 'all'>('all');

  useEffect(() => {
    const data = getData();
    setReflections(data.reflections);
    setCurrentPrompt(getRandomPrompt().text);
  }, []);

  const handleNewPrompt = () => {
    const prompts = getPromptsByCategory(currentCategory);
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
      category: currentCategory,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    addReflection(reflection);
    setReflections([reflection, ...reflections]);
    setResponse('');
    handleNewPrompt();
  };

  const handleDelete = (id: string) => {
    deleteReflection(id);
    setReflections(reflections.filter(r => r.id !== id));
  };

  const filteredReflections = filterCategory === 'all'
    ? reflections
    : reflections.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-calm-900">Reflect</h1>
        <p className="text-calm-600 mt-1">
          Take time to understand your growth. Reflection beats reaction.
        </p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl p-4 border border-calm-200">
        <label className="block text-sm font-medium text-calm-700 mb-3">
          Choose a reflection category
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(REFLECTION_CATEGORY_LABELS) as ReflectionCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
                const prompts = getPromptsByCategory(category);
                setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)].text);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
              }`}
            >
              {REFLECTION_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Current Prompt */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
            {REFLECTION_CATEGORY_LABELS[currentCategory]} Prompt
          </span>
          <button
            onClick={handleNewPrompt}
            className="text-xs text-primary-600 hover:text-primary-800 font-medium"
          >
            Different prompt
          </button>
        </div>
        <p className="text-xl text-primary-900 font-medium">{currentPrompt}</p>
      </div>

      {/* Response Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="response" className="block text-sm font-medium text-calm-700 mb-2">
            Your Reflection
          </label>
          <textarea
            id="response"
            rows={6}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-calm-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Take your time. This is for you..."
          />
        </div>
        <button
          type="submit"
          disabled={!response.trim()}
          className="px-6 py-3 bg-calm-800 text-white rounded-lg font-medium hover:bg-calm-900 disabled:bg-calm-300 disabled:cursor-not-allowed transition-colors"
        >
          Save Reflection
        </button>
      </form>

      {/* History Toggle */}
      <div className="border-t border-calm-200 pt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center text-calm-600 hover:text-calm-800 font-medium"
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
                  ? 'bg-calm-800 text-white'
                  : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
              }`}
            >
              All
            </button>
            {(Object.keys(REFLECTION_CATEGORY_LABELS) as ReflectionCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterCategory === category
                    ? 'bg-calm-800 text-white'
                    : 'bg-calm-100 text-calm-600 hover:bg-calm-200'
                }`}
              >
                {REFLECTION_CATEGORY_LABELS[category]}
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
                />
              ))}
            </div>
          ) : (
            <p className="text-calm-500 text-center py-8">
              {filterCategory === 'all'
                ? 'No reflections yet. Start by answering the prompt above.'
                : `No reflections in ${REFLECTION_CATEGORY_LABELS[filterCategory]} category.`}
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
}: {
  reflection: ReflectionEntry;
  onDelete: () => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-xl p-5 border border-calm-200">
      <div className="flex items-start justify-between mb-3">
        <span className="px-2 py-0.5 bg-calm-100 text-calm-600 rounded text-xs font-medium">
          {REFLECTION_CATEGORY_LABELS[reflection.category]}
        </span>
        <span className="text-xs text-calm-400">
          {new Date(reflection.date).toLocaleDateString()}
        </span>
      </div>

      <p className="text-calm-600 text-sm italic mb-3">&ldquo;{reflection.prompt}&rdquo;</p>
      <p className="text-calm-800 whitespace-pre-wrap">{reflection.response}</p>

      <div className="mt-4 pt-3 border-t border-calm-100 flex justify-end">
        {showConfirm ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-calm-500">Delete?</span>
            <button
              onClick={onDelete}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="text-xs text-calm-500 hover:text-calm-700"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-xs text-calm-400 hover:text-calm-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
