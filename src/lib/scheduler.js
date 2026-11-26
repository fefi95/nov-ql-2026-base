// Default timer for the countdown. Injected (like the random generator) so tests can replace it.
// The globals are looked up at call time so Vitest fake timers also apply.
export const intervalScheduler = {
  setInterval: (callback, ms) => setInterval(callback, ms),
  clearInterval: (id) => clearInterval(id),
};
