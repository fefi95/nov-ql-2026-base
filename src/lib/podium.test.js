import { describe, expect, it } from 'vitest';
import { podiumPlaces } from './podium.js';

describe('podiumPlaces', () => {
  it('orders three winners as 2nd, 1st, 3rd from left to right', () => {
    expect(podiumPlaces(['Ana', 'Luis', 'Eva'])).toEqual([
      { place: 2, medal: '🥈', label: '2.º lugar', name: 'Luis' },
      { place: 1, medal: '🥇', label: '1.er lugar', name: 'Ana' },
      { place: 3, medal: '🥉', label: '3.er lugar', name: 'Eva' },
    ]);
  });

  it('leaves out the 3rd place with two winners', () => {
    expect(podiumPlaces(['Ana', 'Luis'])).toEqual([
      { place: 2, medal: '🥈', label: '2.º lugar', name: 'Luis' },
      { place: 1, medal: '🥇', label: '1.er lugar', name: 'Ana' },
    ]);
  });
});
