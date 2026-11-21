import React from 'react';
import { Lightbulb } from 'lucide-react';

interface HintButtonProps {
  hintsRemaining: number;
  onUseHint: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

export const HintButton: React.FC<HintButtonProps> = ({
  hintsRemaining,
  onUseHint,
  disabled = false,
  isActive = false,
}) => {
  return (
    <button
      onClick={onUseHint}
      disabled={disabled || hintsRemaining <= 0}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
        isActive
          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30'
          : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300'
      }`}
      title={hintsRemaining > 0 ? `Use Hint (${hintsRemaining} left)` : 'No hints remaining'}
    >
      <Lightbulb
        className={`w-4 h-4 ${
          isActive ? 'text-slate-950 fill-slate-950 animate-bounce' : 'text-amber-400 fill-amber-400'
        }`}
      />
      <span>Hint</span>
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
          isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-200'
        }`}
      >
        {hintsRemaining}
      </span>
    </button>
  );
};

