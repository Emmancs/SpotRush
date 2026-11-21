import React, { useState } from 'react';
import { Star, Play, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PUZZLES } from '../data/puzzles';
import { CategoryCard } from '../components/home/CategoryCard';
import { LevelProgress } from '../game/types';

interface CategoriesPageProps {
  initialCategoryId?: string;
  onSelectLevel: (levelId: string) => void;
  onBackToHome: () => void;
  getLevelProgress: (levelId: string) => LevelProgress | undefined;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  initialCategoryId,
  onSelectLevel,
  onBackToHome,
  getLevelProgress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategoryId || null
  );

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory);
  const levels = selectedCategory
    ? PUZZLES.filter((p) => p.categoryId === selectedCategory)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button or page title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          {selectedCategory ? (
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Categories</span>
            </button>
          ) : (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold font-fun text-white flex items-center gap-3">
            <span>{activeCategory ? activeCategory.name : 'Choose a World'}</span>
            {activeCategory && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {activeCategory.badge}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {activeCategory
              ? activeCategory.description
              : 'Pick any theme below to view its levels and start finding differences.'}
          </p>
        </div>
      </div>

      {/* If category selected, show its levels */}
      {selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {levels.map((lvl) => {
            const progress = getLevelProgress(lvl.id);
            const stars = progress?.stars || 0;

            return (
              <div
                key={lvl.id}
                onClick={() => onSelectLevel(lvl.id)}
                className="group bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/60 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-700/50">
                    <img
                      src={lvl.originalImage}
                      alt={lvl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-brand-300 border border-brand-500/30 backdrop-blur-sm">
                        {lvl.difficulty}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/40">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-bold text-brand-400 uppercase tracking-wider">
                      Level {lvl.levelNumber}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lvl.timeLimitSeconds || 90}s
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {lvl.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1.5 font-medium">
                      {progress?.completed ? `${progress.bestScore} pts` : 'Not cleared'}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-brand-400 group-hover:translate-x-1 transition-transform">
                    Start Level →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* If no category selected, show all categories */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const categoryPuzzles = PUZZLES.filter((p) => p.categoryId === category.id);
            const completedCount = categoryPuzzles.filter(
              (p) => getLevelProgress(p.id)?.completed
            ).length;

            return (
              <CategoryCard
                key={category.id}
                category={category}
                levelsCompleted={completedCount}
                onSelect={(id) => setSelectedCategory(id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

