// `random` is injected so tests can replace it with a deterministic generator.
export const drawWinner = (participants, random) =>
  participants.length === 0 ? null : participants[Math.floor(random() * participants.length)];
