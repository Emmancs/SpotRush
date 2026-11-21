import { UserStats, LevelProgress } from '../game/types';

const STORAGE_KEY = 'spotrush_player_data_v1';

const defaultStats: UserStats = {
  completedLevels: {},
  soundEnabled: true,
  musicEnabled: true,
};

export const getStoredStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
    };
  } catch (e) {
    console.warn('Failed to load player stats from storage:', e);
    return defaultStats;
  }
};

export const saveStoredStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Failed to persist player stats:', e);
  }
};

export const saveLevelProgress = (
  levelId: string,
  stars: number,
  time: number,
  score: number
): UserStats => {
  const current = getStoredStats();
  const existing = current.completedLevels[levelId];

  const updatedProgress: LevelProgress = {
    levelId,
    completed: true,
    stars: Math.max(existing?.stars || 0, stars),
    bestTime: existing?.bestTime ? Math.min(existing.bestTime, time) : time,
    bestScore: Math.max(existing?.bestScore || 0, score),
    completedAt: new Date().toISOString(),
  };

  const updatedStats: UserStats = {
    ...current,
    completedLevels: {
      ...current.completedLevels,
      [levelId]: updatedProgress,
    },
  };

  saveStoredStats(updatedStats);
  return updatedStats;
};

export const toggleSetting = (key: 'soundEnabled' | 'musicEnabled'): boolean => {
  const current = getStoredStats();
  const nextVal = !current[key];
  saveStoredStats({
    ...current,
    [key]: nextVal,
  });
  return nextVal;
};

