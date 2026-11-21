import React from 'react';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { Level } from '../../game/types';

interface GameHeaderProps {
  level: Level;
  timeRemaining: number;
  timeLimit: number;
  errorsCount: number;
  onBack: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  level,
  timeRemaining,
  timeLimit,
  errorsCount,
  onBack,
}) => {
  const isTimeCritical = timeRemaining <= 15;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const timeRatio = Math.max(0, Math.min(100, (timeRemaining / timeLimit) * 100));

  return (
    <div className="w-full flex items-center justify-between gap-4 py-3 mb-2">
      {/* Back button & Level Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm"
          title="Back to Categories"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
              {level.categoryId} · Level {level.levelNumber}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {level.difficulty}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-fun text-white truncate max-w-[200px] sm:max-w-md">
            {level.title}
          </h2>
        </div>
      </div>

      {/* Timer and Misses */}
      <div className="flex items-center gap-3">
        {/* Errors / Misses counter */}
        {errorsCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>{errorsCount} Misclicks</span>
          </div>
        )}

        {/* Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold border transition-colors shadow-inner ${
            isTimeCritical
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-slate-800/90 border-slate-700 text-slate-100'
          }`}
        >
          <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-brand-400'}`} />
          <span className="font-mono text-base sm:text-lg tracking-wider font-extrabold">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

