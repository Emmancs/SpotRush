import React from 'react';
import { Star, Play, Clock, Zap } from 'lucide-react';
import { Level, LevelProgress } from '../../game/types';

interface FeaturedLevelsProps {
  levels: Level[];
  onPlayLevel: (levelId: string) => void;
  getProgress: (levelId: string) => LevelProgress | undefined;
}

export const FeaturedLevels: React.FC<FeaturedLevelsProps> = ({
  levels,
  onPlayLevel,
  getProgress,
}) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold font-fun text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Featured Challenges</span>
          </h2>
          <p className="text-sm text-slate-400">Hand-picked puzzles to test your observation speed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {levels.map((lvl) => {
          const progress = getProgress(lvl.id);
          const starsEarned = progress?.stars || 0;

          return (
            <div
              key={lvl.id}
              onClick={() => onPlayLevel(lvl.id)}
              className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/50 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Level preview thumbnail header */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-700/50">
                  <img
                    src={lvl.originalImage}
                    alt={lvl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Difficulty Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                        lvl.difficulty
                      )}`}
                    >
                      {lvl.difficulty}
                    </span>
                  </div>

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/40">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Level Title */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
                    {lvl.categoryId} · Level {lvl.levelNumber}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lvl.timeLimitSeconds || 90}s</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors truncate">
                  {lvl.title}
                </h4>
              </div>

              {/* Bottom footer: Star ratings */}
              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx <= starsEarned
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">
                    {progress?.completed ? `${progress.bestScore} pts` : `${lvl.differences.length} diffs`}
                  </span>
                </div>

                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  Play Now →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

