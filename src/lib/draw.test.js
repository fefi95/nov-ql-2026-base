import { describe, expect, it } from 'vitest';
import { drawResult, drawWinners, validateDraw } from './draw.js';

const participants = ['Ana', 'Luis', 'Eva', 'Juan', 'Sara'];

// Returns the given values in order, then repeats the last one.
const sequence =
  (...values) =>
  () =>
    values.length > 1 ? values.shift() : values[0];

describe('drawWinners', () => {
  it('returns exactly the requested number of winners', () => {
    expect(drawWinners(participants, 1, () => 0.5)).toHaveLength(1);
    expect(drawWinners(participants, 2, () => 0.5)).toHaveLength(2);
    expect(drawWinners(participants, 3, () => 0.5)).toHaveLength(3);
  });

  it('picks the entries selected by the random generator, in order of place', () => {
    expect(drawWinners(participants, 1, () => 0)).toEqual(['Ana']);
    expect(drawWinners(participants, 3, sequence(0.5, 0, 0.999))).toEqual(['Eva', 'Ana', 'Sara']);
  });

  it('never repeats an entry, whatever the generator returns', () => {
    [0, 0.25, 0.5, 0.75, 0.999].forEach((value) => {
      const winners = drawWinners(participants, 3, () => value);
      expect(new Set(winners).size).toBe(3);
      winners.forEach((winner) => expect(participants).toContain(winner));
    });
  });

  it('treats repeated names as different entries', () => {
    const winners = drawWinners(['Ana', 'Ana', 'Luis'], 2, () => 0);

    expect(winners).toEqual(['Ana', 'Ana']);
  });

  it('lets each entry win at most once when names repeat', () => {
    const winners = drawWinners(['Ana', 'Ana'], 3, () => 0);

    expect(winners).toEqual(['Ana', 'Ana']);
  });

  it('does not mutate the original list', () => {
    const list = ['Ana', 'Luis', 'Eva'];
    drawWinners(list, 2, () => 0);
    expect(list).toEqual(['Ana', 'Luis', 'Eva']);
  });
});

describe('validateDraw', () => {
  it('rejects a draw without participants', () => {
    expect(validateDraw(0, 1)).toEqual({
      valid: false,
      message: 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    });
  });

  it('rejects a draw with a single participant', () => {
    expect(validateDraw(1, 1)).toEqual({
      valid: false,
      message: 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    });
  });

  it('rejects as many winners as participants', () => {
    expect(validateDraw(3, 3)).toEqual({
      valid: false,
      message: 'Se necesitan al menos 4 participantes para sortear 3 ganador(es).',
    });
  });

  it('accepts fewer winners than participants', () => {
    expect(validateDraw(2, 1)).toEqual({ valid: true });
    expect(validateDraw(4, 3)).toEqual({ valid: true });
  });
});

describe('drawResult', () => {
  it('returns the winners when the draw is valid', () => {
    expect(drawResult(participants, 2, () => 0)).toEqual({
      type: 'winners',
      winners: ['Ana', 'Luis'],
    });
  });

  it('returns the error message when the draw is not valid', () => {
    expect(drawResult(['Ana'], 1, () => 0)).toEqual({
      type: 'error',
      message: 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    });
  });
});
