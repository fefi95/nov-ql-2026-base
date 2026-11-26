import { describe, expect, it } from 'vitest';
import { drawWinner } from './draw.js';

const participants = ['Ana', 'Luis', 'Eva'];

describe('drawWinner', () => {
  it('returns null when there are no participants', () => {
    expect(drawWinner([], () => 0.5)).toBeNull();
  });

  it('picks the participant selected by the random generator', () => {
    expect(drawWinner(participants, () => 0)).toBe('Ana');
    expect(drawWinner(participants, () => 0.5)).toBe('Luis');
    expect(drawWinner(participants, () => 0.999)).toBe('Eva');
  });
});
