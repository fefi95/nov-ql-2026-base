export const COUNTDOWN_START = 3;
export const COUNTDOWN_STEP_MS = 1000;

// Time is not handled here: the caller decides when to ask for the next number.
export const nextCountdown = (current) => (current > 1 ? current - 1 : null);
