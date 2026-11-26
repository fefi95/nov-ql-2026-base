import { COUNTDOWN_START, nextCountdown } from './countdown.js';

// One value for the whole draw avoids impossible combinations:
//   { phase: 'idle' }
//   { phase: 'counting', count, result }  (result chosen but hidden)
//   { phase: 'done', result }             (result: { type: 'error' | 'winners', ... })
export const IDLE = Object.freeze({ phase: 'idle' });

// Dependencies are injected so this module stays pure and easy to test.
export const startDraw = ({ participants, winnerCount, random, validateDraw, drawWinners }) => {
  const validation = validateDraw(participants.length, winnerCount);
  return validation.valid
    ? {
        phase: 'counting',
        count: COUNTDOWN_START,
        result: { type: 'winners', winners: drawWinners(participants, winnerCount, random) },
      }
    : { phase: 'done', result: { type: 'error', message: validation.message } };
};

const advanceCount = (state) => {
  const next = nextCountdown(state.count);
  return next === null ? { phase: 'done', result: state.result } : { ...state, count: next };
};

export const tickDraw = (state) => (state.phase === 'counting' ? advanceCount(state) : state);

export const isCounting = (state) => state.phase === 'counting';

export const visibleResult = (state) => (state.phase === 'done' ? state.result : null);
