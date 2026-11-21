import { useState, useEffect, useCallback } from 'react';
import { UserStats, LevelProgress } from '../game/types';
import { getStoredStats, saveLevelProgress, toggleSetting } from '../utils/storage';
import { soundEngine } from '../game/gameEngine';

export const useProgress = () => {
  const [stats, setStats] = useState<UserStats>(getStoredStats());

  useEffect(() => {
    const loaded = getStoredStats();
    setStats(loaded);
    soundEngine.setSoundEnabled(loaded.soundEnabled);
  }, []);

  const recordCompletion = useCallback(
    (levelId: string, stars: number, time: number, score: number) => {
      const updated = saveLevelProgress(levelId, stars, time, score);
      setStats(updated);
    },
    []
  );

  const toggleSound = useCallback(() => {
    const val = toggleSetting('soundEnabled');
    soundEngine.setSoundEnabled(val);
    setStats((prev) => ({ ...prev, soundEnabled: val }));
  }, []);

  const totalStars = Object.values(stats.completedLevels).reduce(
    (acc, lvl) => acc + (lvl.stars || 0),
    0
  );

  const totalCompleted = Object.values(stats.completedLevels).filter(
    (lvl) => lvl.completed
  ).length;

  const getLevelProgress = useCallback(
    (levelId: string): LevelProgress | undefined => {
      return stats.completedLevels[levelId];
    },
    [stats]
  );

  return {
    stats,
    totalStars,
    totalCompleted,
    soundEnabled: stats.soundEnabled,
    toggleSound,
    recordCompletion,
    getLevelProgress,
  };
};

