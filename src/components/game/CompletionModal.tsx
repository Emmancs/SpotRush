import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, RotateCcw, ArrowRight, Grid, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { ScoreBreakdown, GameStatus } from '../../game/types';

interface CompletionModalProps {
  status: GameStatus;
  scoreBreakdown: ScoreBreakdown | null;
  elapsedTime: number;
  onNextLevel?: () => void;
  hasNextLevel?: boolean;
  onRestart: () => void;
  onGoToCategories: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  status,
  scoreBreakdown,
  elapsedTime,
  onNextLevel,
  hasNextLevel = false,
  onRestart,
  onGoToCategories,
}) => {
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';

  useEffect(() => {
    if (isCompleted) {
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#f59e0b', '#6366f1', '#ec4899', '#38bdf8'],
        });
      } catch (e) {
        // Fallback gracefully if canvas confetti cannot initialize
      }
    }
  }, [isCompleted]);

  if (!isCompleted && !isFailed) return null;

  const stars = scoreBreakdown?.stars || 1;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Decorative background glow */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isCompleted ? 'bg-brand-500/30' : 'bg-rose-500/20'
          }`}
        />

        <div className="text-center relative z-10">
          {/* Header Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
            {isCompleted ? (
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-amber-500 to-brand-500 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-full h-full rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-rose-400" />
              </div>
            )}
          </div>

          <h3 className="text-3xl font-extrabold font-fun text-white mb-2">
            {isCompleted ? 'Level Complete!' : "Time's Up!"}
          </h3>

          <p className="text-sm text-slate-300 mb-6">
            {isCompleted
              ? 'Awesome observation skills! You spotted all the differences!'
              : 'You ran out of time! Give it another shot and beat the clock!'}
          </p>

          {/* Stars display */}
          {isCompleted && (
            <div className="flex items-center justify-center gap-3 mb-6">
              {[1, 2, 3].map((starIdx) => (
                <div
                  key={starIdx}
                  className={`transition-all duration-500 transform ${
                    starIdx <= stars ? 'scale-110' : 'opacity-30 scale-90'
                  }`}
                >
                  <Star
                    className={`w-10 h-10 ${
                      starIdx <= stars
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                        : 'text-slate-600'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Score breakdown card */}
          {isCompleted && scoreBreakdown && (
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-6 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-white pb-2 border-b border-slate-700">
                <span>Final Score</span>
                <span className="text-brand-400 font-mono text-lg font-black">
                  {scoreBreakdown.totalScore} pts
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Taken</span>
                <span className="font-semibold">{elapsedTime} seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Speed Bonus</span>
                <span className="text-emerald-400 font-semibold">+{scoreBreakdown.timeBonus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accuracy Bonus</span>
                <span className="text-emerald-400 font-semibold">+{scoreBreakdown.accuracyBonus}</span>
              </div>
              {scoreBreakdown.hintPenalty > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Hint Penalty</span>
                  <span className="text-rose-400 font-semibold">-{scoreBreakdown.hintPenalty}</span>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {isCompleted && hasNextLevel && onNextLevel && (
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={onNextLevel}
                className="w-full text-base py-3.5"
              >
                Next Level
              </Button>
            )}

            <Button
              variant={isFailed ? 'primary' : 'secondary'}
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={onRestart}
              className="w-full"
            >
              {isFailed ? 'Try Again' : 'Replay Level'}
            </Button>

            <Button
              variant="ghost"
              size="md"
              icon={<Grid className="w-4 h-4" />}
              onClick={onGoToCategories}
              className="w-full text-slate-400 hover:text-white"
            >
              Choose Another Level
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

