import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, Compass, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  totalStars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  totalStars,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-900/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-emerald-400 to-teal-300 p-0.5 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="SpotRush" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-fun text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                SpotRush
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block -mt-1 font-medium">Spot The Difference</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('/')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentPath === '/'
                ? 'bg-slate-800 text-brand-400'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span className="hidden sm:inline">Play</span>
          </button>

          <button
            onClick={() => onNavigate('/categories')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentPath === '/categories'
                ? 'bg-slate-800 text-brand-400'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Categories</span>
          </button>
        </nav>

        {/* Right side controls: Stars badge & Sound */}
        <div className="flex items-center gap-3">
          {/* Star counter badge */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300 font-bold text-sm shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{totalStars}</span>
            <span className="text-xs font-normal text-amber-400/80 hidden md:inline">Stars</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors border border-slate-700/60"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

