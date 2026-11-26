export const addParticipant = (participants, name) => {
  const trimmed = name.trim();
  return trimmed ? [...participants, trimmed] : participants;
};

export const removeParticipant = (participants, index) =>
  participants.filter((_, i) => i !== index);
