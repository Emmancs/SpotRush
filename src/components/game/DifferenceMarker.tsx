import React from 'react';
import { Check, X } from 'lucide-react';
import { Difference, ClickPoint } from '../../game/types';

interface DifferenceMarkerProps {
  difference?: Difference;
  isHint?: boolean;
  isError?: boolean;
  errorPoint?: ClickPoint;
}

export const DifferenceMarker: React.FC<DifferenceMarkerProps> = ({
  difference,
  isHint = false,
  isError = false,
  errorPoint,
}) => {
  // If rendering an error marker
  if (isError && errorPoint) {
    return (
      <div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-300"
        style={{ left: `${errorPoint.x}%`, top: `${errorPoint.y}%` }}
      >
        <div className="w-9 h-9 rounded-full bg-rose-600/80 border-2 border-rose-300 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 animate-ping" />
        <div className="w-9 h-9 rounded-full bg-rose-600 border-2 border-white text-white flex items-center justify-center shadow-lg shadow-rose-600/50 absolute inset-0">
          <X className="w-5 h-5 stroke-[3]" />
        </div>
      </div>
    );
  }

  if (!difference) return null;

  // If rendering a hint marker
  if (isHint) {
    return (
      <div
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: `${difference.x}%`, top: `${difference.y}%` }}
      >
        {/* Pulsing beacon circles */}
        <div className="w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-400/20 difference-ring absolute -inset-5" />
        <div className="w-10 h-10 rounded-full border-2 border-amber-300 bg-amber-400/40 animate-pulse flex items-center justify-center shadow-lg shadow-amber-400/40">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
      </div>
    );
  }

  // Found difference marker: crisp glowing ring with checkmark
  return (
    <div
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 group"
      style={{ left: `${difference.x}%`, top: `${difference.y}%` }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer subtle glow */}
        <div className="w-10 h-10 rounded-full border-2 border-brand-400 bg-brand-500/20 shadow-lg shadow-brand-500/30 animate-pulse" />
        {/* Center checkmark badge */}
        <div className="w-6 h-6 rounded-full bg-brand-500 text-white border-2 border-white flex items-center justify-center shadow absolute">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};

