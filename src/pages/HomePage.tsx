import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryCard } from '../components/home/CategoryCard';
import { FeaturedLevels } from '../components/home/FeaturedLevels';
import { CATEGORIES } from '../data/categories';
import { PUZZLES } from '../data/puzzles';
import { LevelProgress } from '../game/types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onPlayLevel: (levelId: string) => void;
  totalCompleted: number;
  getLevelProgress: (levelId: string) => LevelProgress | undefined;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onPlayLevel,
  totalCompleted,
  getLevelProgress,
}) => {
  const featuredLevels = PUZZLES.slice(0, 3);

  const handleQuickPlay = () => {
    // Pick the first uncompleted level or the first level
    const firstUncompleted = PUZZLES.find((lvl) => !getLevelProgress(lvl.id)?.completed);
    onPlayLevel(firstUncompleted ? firstUncompleted.id : PUZZLES[0].id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-12">
      {/* Hero section */}
      <Hero
        onStartPlaying={handleQuickPlay}
        onExploreCategories={() => onNavigate('/categories')}
        totalCompleted={totalCompleted}
      />

      {/* Categories section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-fun text-white">
              Explore Categories
            </h2>
            <p className="text-sm text-slate-400">Select a theme to discover exciting puzzles</p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.slice(0, 3).map((category) => {
            const categoryPuzzles = PUZZLES.filter((p) => p.categoryId === category.id);
            const completedCount = categoryPuzzles.filter(
              (p) => getLevelProgress(p.id)?.completed
            ).length;

            return (
              <CategoryCard
                key={category.id}
                category={category}
                levelsCompleted={completedCount}
                onSelect={(catId) => onNavigate(`/categories?category=${catId}`)}
              />
            );
          })}
        </div>
      </section>

      {/* Featured Challenges */}
      <FeaturedLevels
        levels={featuredLevels}
        onPlayLevel={onPlayLevel}
        getProgress={getLevelProgress}
      />
    </div>
  );
};

