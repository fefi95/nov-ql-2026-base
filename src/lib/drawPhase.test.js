import { describe, expect, it, vi } from 'vitest';
import { IDLE, isCounting, startDraw, tickDraw, visibleResult } from './drawPhase.js';

const valid = () => ({ valid: true });
const invalid = () => ({ valid: false, message: 'Faltan participantes.' });
const firstN = (participants, count) => participants.slice(0, count);

const start = (overrides = {}) =>
  startDraw({
    participants: ['Ana', 'Luis', 'Eva'],
    winnerCount: 2,
    random: () => 0,
    validateDraw: valid,
    drawWinners: firstN,
    ...overrides,
  });

describe('startDraw', () => {
  it('starts counting from 3 with the winners already chosen', () => {
    expect(start()).toEqual({
      phase: 'counting',
      count: 3,
      result: { type: 'winners', winners: ['Ana', 'Luis'] },
    });
  });

  it('draws once, passing the participants, count and random generator', () => {
    const random = () => 0.5;
    const drawWinners = vi.fn(firstN);

    start({ random, drawWinners });

    expect(drawWinners).toHaveBeenCalledOnce();
    expect(drawWinners).toHaveBeenCalledWith(['Ana', 'Luis', 'Eva'], 2, random);
  });

  it('goes straight to the error without counting or drawing when invalid', () => {
    const drawWinners = vi.fn(firstN);

    expect(start({ validateDraw: invalid, drawWinners })).toEqual({
      phase: 'done',
      result: { type: 'error', message: 'Faltan participantes.' },
    });
    expect(drawWinners).not.toHaveBeenCalled();
  });

  it('validates with the participant count and winner count', () => {
    const validateDraw = vi.fn(valid);

    start({ validateDraw });

    expect(validateDraw).toHaveBeenCalledWith(3, 2);
  });
});

describe('tickDraw', () => {
  it('counts down 3, 2, 1 and then reveals the same result', () => {
    const states = [start()];
    [1, 2, 3].forEach(() => states.push(tickDraw(states.at(-1))));

    expect(states.map((state) => state.count)).toEqual([3, 2, 1, undefined]);
    expect(states.at(-1)).toEqual({
      phase: 'done',
      result: { type: 'winners', winners: ['Ana', 'Luis'] },
    });
  });

  it('leaves non-counting states unchanged', () => {
    const done = { phase: 'done', result: { type: 'error', message: 'x' } };
    expect(tickDraw(IDLE)).toBe(IDLE);
    expect(tickDraw(done)).toBe(done);
  });

  it('does not mutate the previous state', () => {
    const counting = start();
    tickDraw(counting);
    expect(counting.count).toBe(3);
  });
});

describe('isCounting', () => {
  it('is true only while counting', () => {
    expect(isCounting(IDLE)).toBe(false);
    expect(isCounting(start())).toBe(true);
    expect(isCounting(start({ validateDraw: invalid }))).toBe(false);
  });
});

describe('visibleResult', () => {
  it('hides the result until the countdown ends', () => {
    expect(visibleResult(IDLE)).toBeNull();
    expect(visibleResult(start())).toBeNull();
    expect(visibleResult(tickDraw(tickDraw(tickDraw(start()))))).toEqual({
      type: 'winners',
      winners: ['Ana', 'Luis'],
    });
  });

  it('shows an error immediately', () => {
    expect(visibleResult(start({ validateDraw: invalid }))).toEqual({
      type: 'error',
      message: 'Faltan participantes.',
    });
  });
});
