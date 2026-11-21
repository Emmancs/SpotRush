import React from 'react';
import { RotateCcw, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { HintButton } from './HintButton';
import { GameStatus } from '../../game/types';

interface GameToolbarProps {
  status: GameStatus;
  foundCount: number;
  totalCount: number;
  hintsRemaining: number;
  hasActiveHint: boolean;
  onUseHint: () => void;
  onRestart: () => void;
  onTogglePause: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const GameToolbar: React.FC<GameToolbarProps> = ({
  status,
  foundCount,
  totalCount,
  hintsRemaining,
  hasActiveHint,
  onUseHint,
  onRestart,
  onTogglePause,
  soundEnabled,
  onToggleSound,
}) => {
  const isPlaying = status === 'playing';
  const isPaused = status === 'paused';

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
      {/* Differences counter badge with progress indicators */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Differences
          </span>
          <div className="flex items-center gap-2">
            <span className="font-fun text-xl sm:text-2xl font-bold text-white">
              {foundCount}{' '}
              <span className="text-slate-500 font-normal text-base">/ {totalCount}</span>
            </span>

            {/* Individual difference progress pips */}
            <div className="flex items-center gap-1.5 ml-2">
              {Array.from({ length: totalCount }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < foundCount
                      ? 'bg-brand-500 shadow-md shadow-brand-500/50 scale-110'
                      : 'bg-slate-700/80 border border-slate-600/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action controls: Hint, Pause, Restart, Sound */}
      <div className="flex items-center gap-2 sm:gap-3">
        <HintButton
          hintsRemaining={hintsRemaining}
          onUseHint={onUseHint}
          disabled={!isPlaying}
          isActive={hasActiveHint}
        />

        <button
          onClick={onTogglePause}
          disabled={status !== 'playing' && status !== 'paused'}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow-sm disabled:opacity-40"
          title={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
        </button>

        <button
          onClick={onRestart}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow-sm"
          title="Restart Level"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleSound}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow-sm hidden sm:block"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-brand-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
};

