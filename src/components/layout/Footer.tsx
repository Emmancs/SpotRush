import React from 'react';
import { Heart, Sparkles, Shield, Trophy } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/80 py-8 mt-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs">
            SR
          </div>
          <span className="font-semibold text-slate-200">SpotRush</span>
          <span className="text-slate-500">· Premium Spot the Difference Game</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Puzzles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Multi-Category</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Offline Saved Progress</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>for puzzle enthusiasts</span>
        </div>
      </div>
    </footer>
  );
};

