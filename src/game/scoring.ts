import { ScoreBreakdown } from './types';

export const BASE_POINTS_PER_DIFFERENCE = 200;
export const ERROR_PENALTY_POINTS = 30;
export const HINT_PENALTY_POINTS = 100;

export const calculateLevelScore = (
  differencesFound: number,
  totalDifferences: number,
  elapsedSeconds: number,
  timeLimitSeconds: number = 90,
  errorCount: number = 0,
  hintsUsed: number = 0
): ScoreBreakdown => {
  const basePoints = differencesFound * BASE_POINTS_PER_DIFFERENCE;

  // Time bonus: remaining seconds multiplied by 10 points per sec
  const remainingSeconds = Math.max(0, timeLimitSeconds - elapsedSeconds);
  const timeBonus = Math.round(remainingSeconds * 12);

  // Accuracy bonus: max 300, minus errors
  const accuracyBonus = Math.max(0, 300 - errorCount * ERROR_PENALTY_POINTS);

  // Hint penalty
  const hintPenalty = hintsUsed * HINT_PENALTY_POINTS;

  const totalScore = Math.max(
    50,
    basePoints + timeBonus + accuracyBonus - hintPenalty
  );

  // Determine star rating:
  // 3 stars: finished with at least 40% time remaining, <= 2 errors, <= 1 hint
  // 2 stars: finished within time limit with <= 5 errors
  // 1 star: finished
  let stars = 1;
  const timeRatio = remainingSeconds / timeLimitSeconds;

  if (differencesFound === totalDifferences) {
    if (timeRatio >= 0.35 && errorCount <= 2 && hintsUsed <= 1) {
      stars = 3;
    } else if (timeRatio >= 0.1 && errorCount <= 5) {
      stars = 2;
    } else {
      stars = 1;
    }
  }

  return {
    basePoints,
    timeBonus,
    accuracyBonus,
    hintPenalty,
    totalScore,
    stars,
  };
};

