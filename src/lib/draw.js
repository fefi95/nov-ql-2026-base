import { removeParticipant } from './participants.js';

// Each step picks among the remaining entries, so no entry wins twice even if names repeat.
// `random` is injected so tests can replace it with a deterministic generator.
export const drawWinners = (participants, count, random) => {
  if (count <= 0 || participants.length === 0) return [];
  const index = Math.floor(random() * participants.length);
  return [
    participants[index],
    ...drawWinners(removeParticipant(participants, index), count - 1, random),
  ];
};

export const insufficientParticipantsMessage = (winnerCount) =>
  `Se necesitan al menos ${winnerCount + 1} participantes para sortear ${winnerCount} ganador(es).`;

export const validateDraw = (participantCount, winnerCount) =>
  winnerCount < participantCount
    ? { valid: true }
    : { valid: false, message: insufficientParticipantsMessage(winnerCount) };

// Result shape: { type: 'error', message } | { type: 'winners', winners }.
export const drawResult = (participants, winnerCount, random) => {
  const validation = validateDraw(participants.length, winnerCount);
  return validation.valid
    ? { type: 'winners', winners: drawWinners(participants, winnerCount, random) }
    : { type: 'error', message: validation.message };
};
