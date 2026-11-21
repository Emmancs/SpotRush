import React, { useRef } from 'react';
import { Difference, ClickPoint } from '../../game/types';
import { DifferenceMarker } from './DifferenceMarker';

interface ImagePanelProps {
  label: 'Original' | 'Modified';
  imageUrl: string;
  foundDifferences: Difference[];
  activeHint: Difference | null;
  errorPoint: ClickPoint | null;
  onImageClick: (point: ClickPoint) => void;
  isPaused: boolean;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  label,
  imageUrl,
  foundDifferences,
  activeHint,
  errorPoint,
  onImageClick,
  isPaused,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPaused || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Constrain to 0-100%
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    onImageClick({ x: boundedX, y: boundedY });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Panel Tag */}
      <div className="flex items-center justify-between pb-2 px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              label === 'Original' ? 'bg-blue-400' : 'bg-brand-400'
            }`}
          />
          {label}
        </span>
        <span className="text-[11px] text-slate-500 font-medium">Click to spot</span>
      </div>

      {/* Image Container with aspect ratio */}
      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700/80 hover:border-slate-500/80 shadow-2xl cursor-crosshair select-none group transition-all"
      >
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-200"
          draggable={false}
        />

        {/* Render found differences */}
        {foundDifferences.map((diff) => (
          <DifferenceMarker key={diff.id} difference={diff} />
        ))}

        {/* Render active hint */}
        {activeHint && <DifferenceMarker difference={activeHint} isHint={true} />}

        {/* Render error click marker */}
        {errorPoint && <DifferenceMarker isError={true} errorPoint={errorPoint} />}

        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-40">
            <span className="text-2xl font-bold font-fun text-white mb-2">Paused</span>
            <span className="text-sm text-slate-400">Click Resume to continue playing</span>
          </div>
        )}
      </div>
    </div>
  );
};

