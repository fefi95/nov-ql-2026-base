import { describe, expect, it } from 'vitest';
import { COUNTDOWN_START, COUNTDOWN_STEP_MS, nextCountdown } from './countdown.js';

const sequenceFrom = (start) =>
  start === null ? [] : [start, ...sequenceFrom(nextCountdown(start))];

describe('countdown', () => {
  it('starts at 3 and steps once per second', () => {
    expect(COUNTDOWN_START).toBe(3);
    expect(COUNTDOWN_STEP_MS).toBe(1000);
  });

  it('counts 3, 2, 1', () => {
    expect(sequenceFrom(COUNTDOWN_START)).toEqual([3, 2, 1]);
  });

  it('ends after 1', () => {
    expect(nextCountdown(1)).toBeNull();
  });
});
