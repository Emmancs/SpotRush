import { Difference } from './types';

export const INITIAL_HINTS_COUNT = 3;

export const getNextHintDifference = (
  differences: Difference[],
  foundIds: string[]
): Difference | null => {
  const unfound = differences.filter((d) => !foundIds.includes(d.id));
  if (unfound.length === 0) return null;

  // Select the first unfound or random unfound difference
  const randomIndex = Math.floor(Math.random() * unfound.length);
  return unfound[randomIndex];
};

