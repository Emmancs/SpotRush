import { Level, GameStatus, Difference } from './types';
import { detectDifferenceHit } from './detection';
import { calculateLevelScore } from './scoring';
import { getNextHintDifference, INITIAL_HINTS_COUNT } from './hintSystem';

/**
 * Sound Manager with Web Audio API synthesized fallbacks
 */
class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy initialized on user interaction
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public playCorrectSound() {
    if (!this.soundEnabled) return;

    // Try HTML5 Audio element first
    try {
      const audio = new Audio('/sounds/correct.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {
        this.synthesizeChime(true);
      });
    } catch {
      this.synthesizeChime(true);
    }
  }

  public playCompleteSound() {
    if (!this.soundEnabled) return;

    try {
      const audio = new Audio('/sounds/complete.mp3');
      audio.volume = 0.8;
      audio.play().catch(() => {
        this.synthesizeVictoryFanfare();
      });
    } catch {
      this.synthesizeVictoryFanfare();
    }
  }

  public playErrorSound() {
    if (!this.soundEnabled) return;
    this.synthesizeBuzz();
  }

  public playHintSound() {
    if (!this.soundEnabled) return;
    this.synthesizeHintChime();
  }

  private synthesizeChime(highPitch = false) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(highPitch ? 880 : 587.33, ctx.currentTime); // A5 or D5
    osc.frequency.exponentialRampToValueAtTime(highPitch ? 1318.51 : 880, ctx.currentTime + 0.15); // E6

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  }

  private synthesizeHintChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.linearRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
    osc.frequency.linearRampToValueAtTime(1046.50, ctx.currentTime + 0.4); // C6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  private synthesizeBuzz() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.setValueAtTime(110, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  private synthesizeVictoryFanfare() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.4);
    });
  }
}

export const soundEngine = new SoundEngine();
export { detectDifferenceHit, calculateLevelScore, getNextHintDifference, INITIAL_HINTS_COUNT };

