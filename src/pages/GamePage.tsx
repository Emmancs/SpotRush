import React, { useMemo } from 'react';
import { getPuzzleById, PUZZLES } from '../data/puzzles';
import { useGame } from '../hooks/useGame';
import { GameHeader } from '../components/game/GameHeader';
import { GameToolbar } from '../components/game/GameToolbar';
import { ImagePanel } from '../components/game/ImagePanel';
import { CompletionModal } from '../components/game/CompletionModal';
import { Loading } from '../components/common/Loading';

interface GamePageProps {
  levelId: string;
  onBack: () => void;
  onGoToCategories: () => void;
  onNavigateToLevel: (nextLevelId: string) => void;
  onLevelComplete: (levelId: string, stars: number, time: number, score: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  levelId,
  onBack,
  onGoToCategories,
  onNavigateToLevel,
  onLevelComplete,
  soundEnabled,
  onToggleSound,
}) => {
  const level = useMemo(() => getPuzzleById(levelId), [levelId]);

  if (!level) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold font-fun text-white mb-4">Level Not Found</h2>
        <p className="text-slate-400 mb-6">
          The requested level "{levelId}" could not be located.
        </p>
        <button
          onClick={onGoToCategories}
          className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-colors"
        >
          Browse All Levels
        </button>
      </div>
    );
  }

  // Find next level in the current category or next category
  const nextLevel = useMemo(() => {
    const currentIndex = PUZZLES.findIndex((p) => p.id === level.id);
    if (currentIndex >= 0 && currentIndex < PUZZLES.length - 1) {
      return PUZZLES[currentIndex + 1];
    }
    return null;
  }, [level.id]);

  const {
    status,
    foundDifferences,
    totalDifferences,
    remainingCount,
    elapsedTime,
    timeRemaining,
    timeLimit,
    errorsCount,
    hintsRemaining,
    activeHint,
    recentClickError,
    scoreBreakdown,
    handleImageClick,
    useHint,
    restartGame,
    togglePause,
  } = useGame({
    level,
    onLevelComplete: (stars, time, score) => {
      onLevelComplete(level.id, stars, time, score);
    },
  });

  // Filter full Difference objects that have been found
  const foundDiffObjects = useMemo(() => {
    return level.differences.filter((d) => foundDifferences.includes(d.id));
  }, [level.differences, foundDifferences]);

  const isPaused = status === 'paused';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Game Header */}
      <GameHeader
        level={level}
        timeRemaining={timeRemaining}
        timeLimit={timeLimit}
        errorsCount={errorsCount}
        onBack={onBack}
      />

      {/* Game Toolbar */}
      <GameToolbar
        status={status}
        foundCount={foundDifferences.length}
        totalCount={totalDifferences}
        hintsRemaining={hintsRemaining}
        hasActiveHint={!!activeHint}
        onUseHint={useHint}
        onRestart={restartGame}
        onTogglePause={togglePause}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
      />

      {/* Dual Image Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-2">
        <ImagePanel
          label="Original"
          imageUrl={level.originalImage}
          foundDifferences={foundDiffObjects}
          activeHint={activeHint}
          errorPoint={recentClickError}
          onImageClick={handleImageClick}
          isPaused={isPaused}
        />

        <ImagePanel
          label="Modified"
          imageUrl={level.modifiedImage}
          foundDifferences={foundDiffObjects}
          activeHint={activeHint}
          errorPoint={recentClickError}
          onImageClick={handleImageClick}
          isPaused={isPaused}
        />
      </div>

      {/* Completion or Game Over Modal */}
      <CompletionModal
        status={status}
        scoreBreakdown={scoreBreakdown}
        elapsedTime={elapsedTime}
        onNextLevel={() => nextLevel && onNavigateToLevel(nextLevel.id)}
        hasNextLevel={!!nextLevel}
        onRestart={restartGame}
        onGoToCategories={onGoToCategories}
      />
    </div>
  );
};

