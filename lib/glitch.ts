/* Deterministic helpers for the glitch logo animation.
   Everything is a pure function of time `t` (seconds) so the website intro
   (driven by requestAnimationFrame) and the Remotion videos (driven by frame
   number) render identical frames. Keep imports relative: Remotion bundles this. */

export const INTRO = {
  cursorEnd: 0.5, // blinking cursor on black
  glitchStart: 0.5, // DG mark glitches in
  lockAt: 1.6, // mark locks, glow pulse, scan sweep
  wordStart: 2.05, // wordmark decodes
  taglineStart: 2.45,
  contentEnd: 2.9, // logo fully resolved
  exitEnd: 3.5, // web overlay finished sliding away
} as const;
const GLITCH_DUR = INTRO.lockAt - INTRO.glitchStart;

/** Seeded pseudo-random in [0,1). Same inputs -> same output, every render. */
export function rand(n: number, seed = 1): number {
  const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** 0 before `start`, 1 after `end`, linear between. */
export const segment = (t: number, start: number, end: number) => clamp01((t - start) / (end - start));

export const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
export const easeInCubic = (p: number) => p * p * p;
export const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** How hard the mark is glitching at time t (0 = clean, 1 = maximum). */
export function glitchIntensity(t: number): number {
  if (t < INTRO.glitchStart || t >= INTRO.lockAt) return 0;
  const p = segment(t, INTRO.glitchStart, INTRO.lockAt);
  // strong at first, decays, with two late bursts so it feels "digital", not a fade
  const decay = 1 - easeOutCubic(p) * 0.85;
  const burst = (p > 0.54 && p < 0.64) || (p > 0.81 && p < 0.89) ? 0.5 : 0;
  return clamp01(decay * 0.9 + burst);
}

/** Is the mark visible this step? Stepped at 12/s so flicker stays gentle (WCAG 2.3.1). */
export function markVisible(t: number): boolean {
  if (t < INTRO.glitchStart) return false;
  if (t >= INTRO.glitchStart + GLITCH_DUR * 0.34) return true;
  const step = Math.floor(t * 12);
  return rand(step, 7) > 0.35;
}

export type Slice = { y: number; h: number; dx: number };

/** Horizontal slices of the mark that are displaced this step. */
export function sliceOffsets(t: number, intensity: number, count = 9, top = 0, height = 1, maxShift = 60): Slice[] {
  const step = Math.floor(t * 20);
  const h = height / count;
  return Array.from({ length: count }, (_, i) => {
    const active = intensity > 0 && rand(step * 31 + i, 3) < 0.25 + intensity * 0.45;
    const dx = active ? (rand(step * 17 + i * 3, 5) - 0.5) * 2 * maxShift * intensity : 0;
    return { y: top + i * h, h: h + 0.5, dx };
  });
}

/** Global RGB-style channel split offset (amber / white ghosts). */
export function channelSplit(t: number, intensity: number, max = 14): { ax: number; wx: number } {
  const step = Math.floor(t * 20);
  return {
    ax: (rand(step, 11) - 0.3) * max * intensity,
    wx: -(rand(step, 13) - 0.3) * max * intensity,
  };
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/\\=";

export type Glyph = { ch: string; state: "hidden" | "scrambling" | "locked" };

/** Text that "decodes" from random characters into `text` between start and end.
    Hidden glyphs keep their final character so centred text never shifts. */
export function scramble(text: string, t: number, start: number, end: number, seed = 1): Glyph[] {
  const p = t <= start ? -1 : segment(t, start, end);
  const step = Math.floor(t * 30);
  const n = text.length;
  return Array.from(text, (ch, i) => {
    const revealAt = (i / n) * 0.8; // letters lock left -> right
    if (ch === " ") return { ch, state: "locked" as const };
    if (p >= revealAt + 0.2) return { ch, state: "locked" as const };
    if (p >= revealAt - 0.05) return { ch: GLYPHS[Math.floor(rand(step * 7 + i, seed) * GLYPHS.length)], state: "scrambling" as const };
    return { ch, state: "hidden" as const };
  });
}

/** Typewriter reveal: how many characters are shown. */
export function typedCount(text: string, t: number, start: number, end: number): number {
  return Math.round(segment(t, start, end) * text.length);
}

/** Glow pulse on the amber G: bell around lockAt, then a soft steady glow. */
export function glowStrength(t: number): number {
  if (t < INTRO.lockAt) return 0;
  const p = segment(t, INTRO.lockAt, INTRO.lockAt + 0.55);
  return 0.35 + Math.sin(p * Math.PI) * 0.65 * (p < 1 ? 1 : 0);
}
