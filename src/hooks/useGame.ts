import { useState, useEffect, useCallback, useRef } from 'react';
import { Level, GameStatus, Difference, ClickPoint, ScoreBreakdown } from '../game/types';
import {
  detectDifferenceHit,
  calculateLevelScore,
  getNextHintDifference,
  INITIAL_HINTS_COUNT,
  soundEngine,
} from '../game/gameEngine';

interface UseGameProps {
  level: Level;
  onLevelComplete?: (stars: number, time: number, score: number) => void;
}

export const useGame = ({ level, onLevelComplete }: UseGameProps) => {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [foundDifferences, setFoundDifferences] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [hintsRemaining, setHintsRemaining] = useState<number>(INITIAL_HINTS_COUNT);
  const [activeHint, setActiveHint] = useState<Difference | null>(null);
  const [recentClickError, setRecentClickError] = useState<ClickPoint | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalDifferences = level.differences.length;
  const timeLimit = level.timeLimitSeconds || 90;
  const timeRemaining = Math.max(0, timeLimit - elapsedTime);

  // Initialize or reset game on level change
  const startGame = useCallback(() => {
    setStatus('playing');
    setFoundDifferences([]);
    setElapsedTime(0);
    setErrorsCount(0);
    setHintsRemaining(INITIAL_HINTS_COUNT);
    setActiveHint(null);
    setRecentClickError(null);
    setScoreBreakdown(null);
  }, []);

  useEffect(() => {
    startGame();
  }, [level.id, startGame]);

  // Main game timer
  useEffect(() => {
    if (status === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const next = prev + 1;
          if (next >= timeLimit) {
            // Time ran out!
            setStatus('failed');
            soundEngine.playErrorSound();
            return timeLimit;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, timeLimit]);

  // Pause / Resume
  const togglePause = useCallback(() => {
    if (status === 'playing') {
      setStatus('paused');
    } else if (status === 'paused') {
      setStatus('playing');
    }
  }, [status]);

  // Handle click on either image panel
  const handleImageClick = useCallback(
    (point: ClickPoint) => {
      if (status !== 'playing') return;

      const hit = detectDifferenceHit(point, level.differences, foundDifferences);

      if (hit) {
        // Correct find!
        soundEngine.playCorrectSound();
        const updatedFound = [...foundDifferences, hit.id];
        setFoundDifferences(updatedFound);

        // If the found item was the active hint, clear the hint
        if (activeHint && activeHint.id === hit.id) {
          setActiveHint(null);
          if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
        }

        // Check if all differences have been discovered
        if (updatedFound.length === totalDifferences) {
          setStatus('completed');
          soundEngine.playCompleteSound();

          const breakdown = calculateLevelScore(
            updatedFound.length,
            totalDifferences,
            elapsedTime,
            timeLimit,
            errorsCount,
            INITIAL_HINTS_COUNT - hintsRemaining
          );
          setScoreBreakdown(breakdown);

          if (onLevelComplete) {
            onLevelComplete(breakdown.stars, elapsedTime, breakdown.totalScore);
          }
        }
      } else {
        // Miss / Error click
        soundEngine.playErrorSound();
        setErrorsCount((prev) => prev + 1);
        setRecentClickError(point);

        // Clear error marker after 800ms
        setTimeout(() => {
          setRecentClickError(null);
        }, 800);
      }
    },
    [
      status,
      level.differences,
      foundDifferences,
      activeHint,
      totalDifferences,
      elapsedTime,
      timeLimit,
      errorsCount,
      hintsRemaining,
      onLevelComplete,
    ]
  );

  // Request a hint
  const useHint = useCallback(() => {
    if (status !== 'playing' || hintsRemaining <= 0 || activeHint) return;

    const hint = getNextHintDifference(level.differences, foundDifferences);
    if (!hint) return;

    soundEngine.playHintSound();
    setHintsRemaining((prev) => Math.max(0, prev - 1));
    setActiveHint(hint);

    // Active hint pulses for 5 seconds before fading
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setActiveHint(null);
    }, 5000);
  }, [status, hintsRemaining, activeHint, level.differences, foundDifferences]);

  // Restart level
  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    status,
    foundDifferences,
    totalDifferences,
    remainingCount: totalDifferences - foundDifferences.length,
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
  };
};

