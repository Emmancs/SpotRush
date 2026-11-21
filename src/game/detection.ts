import { Difference, ClickPoint } from './types';

/**
 * Calculates Euclidean distance between two percentage coordinates
 */
export const calculateDistance = (
  p1: ClickPoint,
  p2: { x: number; y: number }
): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Checks if a click point lands within the tolerance radius of any unfound difference
 */
export const detectDifferenceHit = (
  click: ClickPoint,
  differences: Difference[],
  foundIds: string[]
): Difference | null => {
  const unfound = differences.filter((d) => !foundIds.includes(d.id));

  for (const diff of unfound) {
    const distance = calculateDistance(click, { x: diff.x, y: diff.y });
    // Use the difference's custom radius or fallback to 6%
    const tolerance = diff.radius || 6.0;

    if (distance <= tolerance) {
      return diff;
    }
  }

  return null;
};

