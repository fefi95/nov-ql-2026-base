import { describe, expect, it } from 'vitest';
import { addParticipant, removeParticipant } from './participants.js';

describe('addParticipant', () => {
  it('appends the trimmed name', () => {
    expect(addParticipant(['Ana'], '  Luis ')).toEqual(['Ana', 'Luis']);
  });

  it('ignores empty and whitespace-only names', () => {
    const participants = ['Ana'];
    expect(addParticipant(participants, '')).toEqual(['Ana']);
    expect(addParticipant(participants, '   ')).toEqual(['Ana']);
  });

  it('does not mutate the original list', () => {
    const participants = ['Ana'];
    addParticipant(participants, 'Luis');
    expect(participants).toEqual(['Ana']);
  });
});

describe('removeParticipant', () => {
  it('removes the participant at the given index', () => {
    expect(removeParticipant(['Ana', 'Luis', 'Eva'], 1)).toEqual(['Ana', 'Eva']);
  });

  it('does not mutate the original list', () => {
    const participants = ['Ana', 'Luis'];
    removeParticipant(participants, 0);
    expect(participants).toEqual(['Ana', 'Luis']);
  });
});
