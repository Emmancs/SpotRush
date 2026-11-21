export interface Difference {
  id: string;
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
  radius: number; // Tolerance radius in percentage (typically 4 - 8)
  description?: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Level {
  id: string;
  categoryId: string;
  levelNumber: number;
  title: string;
  difficulty: DifficultyLevel;
  originalImage: string;
  modifiedImage: string;
  differences: Difference[];
  timeLimitSeconds?: number;
  thumbnailUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  themeColor: string;
  levelsCount: number;
  badge: string;
}

export interface ClickPoint {
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'completed' | 'failed';

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  stars: number; // 1 to 3 stars
  bestTime: number; // in seconds
  bestScore: number;
  completedAt?: string;
}

export interface UserStats {
  completedLevels: Record<string, LevelProgress>;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface ScoreBreakdown {
  basePoints: number;
  timeBonus: number;
  accuracyBonus: number;
  hintPenalty: number;
  totalScore: number;
  stars: number;
}

