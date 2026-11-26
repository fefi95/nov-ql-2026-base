import { describe, expect, it } from 'vitest';
import { drawWinner } from './draw.js';

const participants = ['Ana', 'Luis', 'Eva'];

// Covers both ends of Math.random's [0, 1) range plus values in between.
const randomValues = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 0.999999, 1 - Number.EPSILON];

const listOfSize = (size) => Array.from({ length: size }, (_, i) => `Participante ${i + 1}`);

const listSizes = [1, 2, 3, 7, 10, 100];

describe('drawWinner', () => {
  it('returns null when there are no participants', () => {
    expect(drawWinner([], () => 0.5)).toBeNull();
  });

  it('never draws a winner from an empty list, whatever the random value', () => {
    randomValues.forEach((value) => {
      expect(drawWinner([], () => value)).toBeNull();
    });
  });

  it('picks the participant selected by the random generator', () => {
    expect(drawWinner(participants, () => 0)).toBe('Ana');
    expect(drawWinner(participants, () => 0.5)).toBe('Luis');
    expect(drawWinner(participants, () => 0.999)).toBe('Eva');
  });

  it('always returns a single participant from the list', () => {
    listSizes.forEach((size) => {
      const list = listOfSize(size);
      randomValues.forEach((value) => {
        const winner = drawWinner(list, () => value);

        expect(typeof winner).toBe('string');
        expect(list).toContain(winner);
      });
    });
  });

  it('gives every participant a chance to win', () => {
    const list = listOfSize(4);
    const winners = [0, 0.25, 0.5, 0.75].map((value) => drawWinner(list, () => value));

    expect(winners).toEqual(list);
  });

  it('does not mutate the list', () => {
    const list = [...participants];

    drawWinner(list, () => 0.5);

    expect(list).toEqual(participants);
  });
});
