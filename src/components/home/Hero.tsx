import React from 'react';
import { Play, Sparkles, Trophy, Flame } from 'lucide-react';
import { Button } from '../common/Button';

interface HeroProps {
  onStartPlaying: () => void;
  onExploreCategories: () => void;
  totalCompleted: number;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlaying,
  onExploreCategories,
  totalCompleted,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Decorative gradient glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Banner badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner animate-pulse-fast">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Spot the Differences & Beat the Clock!</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Sharpen Your Focus With{' '}
          <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            SpotRush
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Explore stunning worlds from African savannas to deep coral reefs and distant galaxies.
          Spot all hidden anomalies before time runs out and claim 3 stars!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={onStartPlaying}
            className="w-full sm:w-auto shadow-xl shadow-brand-500/20 text-lg px-8 py-4"
          >
            Quick Play
          </Button>

          <Button
            size="lg"
            variant="glass"
            icon={<Sparkles className="w-5 h-5 text-amber-300" />}
            onClick={onExploreCategories}
            className="w-full sm:w-auto text-lg px-8 py-4"
          >
            All Categories
          </Button>
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-2xl font-bold font-fun text-white">5</p>
            <p className="text-xs text-slate-400 font-medium">Unique Worlds</p>
          </div>
          <div className="text-center border-x border-slate-700/60">
            <p className="text-2xl font-bold font-fun text-brand-400">100%</p>
            <p className="text-xs text-slate-400 font-medium">HD Graphics</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-fun text-amber-400">{totalCompleted}</p>
            <p className="text-xs text-slate-400 font-medium">Levels Cleared</p>
          </div>
        </div>
      </div>
    </div>
  );
};

