import { act, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.svelte';

// Fake timers make the 3-second countdown instant; userEvent has to advance them too.
let user;

const addParticipants = async (...names) => {
  for (const name of names) {
    await user.type(screen.getByLabelText('Nombre del participante'), `${name}{Enter}`);
  }
};

const drawButton = () => screen.getByRole('button', { name: 'Sortear ganador' });
const chooseWinnerCount = (count) => user.click(screen.getByRole('radio', { name: `${count}` }));
const podiumPlaces = () =>
  screen.getAllByRole('listitem').flatMap((item) => item.getAttribute('aria-label') ?? []);
const countdown = () => screen.queryByRole('status', { name: 'Cuenta regresiva' });
const winnerShown = () => screen.queryByText('¡Tenemos un ganador!');
const podiumShown = () => screen.queryByText('¡Tenemos un podio!');
const advanceSeconds = (seconds) => act(() => vi.advanceTimersByTime(seconds * 1000));

const drawAndWait = async () => {
  await user.click(drawButton());
  await advanceSeconds(3);
};

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('participants and winner count', () => {
    it('starts with no participants, 1 winner selected and the draw enabled', () => {
      render(App);

      expect(screen.getByText('Aún no hay participantes. ¡Agrega el primero!')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '1' })).toBeChecked();
      expect(drawButton()).toBeEnabled();
    });

    it('ignores blank names', async () => {
      render(App);

      await addParticipants('   ');

      expect(screen.getByText('Aún no hay participantes. ¡Agrega el primero!')).toBeInTheDocument();
    });
  });

  describe('countdown', () => {
    it('counts down 3, 2, 1 one second apart', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis');

      await user.click(drawButton());
      expect(countdown()).toHaveTextContent('3');

      await advanceSeconds(1);
      expect(countdown()).toHaveTextContent('2');

      await advanceSeconds(1);
      expect(countdown()).toHaveTextContent('1');
    });

    it('shows no winner during the countdown and the result exactly after three seconds', async () => {
      render(App, { random: () => 0.5 });
      await addParticipants('Ana', 'Luis', 'Eva');

      await user.click(drawButton());
      await advanceSeconds(2.999);
      expect(winnerShown()).not.toBeInTheDocument();

      await advanceSeconds(0.001);
      expect(countdown()).not.toBeInTheDocument();
      expect(winnerShown()).toBeInTheDocument();
    });

    it('shows no podium during the countdown', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva');
      await chooseWinnerCount(2);

      await user.click(drawButton());
      await advanceSeconds(2);

      expect(podiumShown()).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem', { name: /lugar/ })).toHaveLength(0);
    });

    it('locks every control during the countdown and unlocks them after', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis');

      await user.click(drawButton());

      expect(drawButton()).toBeDisabled();
      expect(screen.getByLabelText('Nombre del participante')).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Agregar' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeDisabled();
      expect(screen.getByRole('radio', { name: '2' })).toBeDisabled();

      await advanceSeconds(3);

      expect(drawButton()).toBeEnabled();
      expect(screen.getByLabelText('Nombre del participante')).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Agregar' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeEnabled();
      expect(screen.getByRole('radio', { name: '2' })).toBeEnabled();
    });

    it('hides the previous result when a new countdown starts', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis');
      await drawAndWait();
      expect(winnerShown()).toBeInTheDocument();

      await user.click(drawButton());

      expect(winnerShown()).not.toBeInTheDocument();
      expect(countdown()).toHaveTextContent('3');
    });

    it('cancels the timer when the app is destroyed mid-countdown', async () => {
      const { unmount } = render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis');
      await user.click(drawButton());
      expect(vi.getTimerCount()).toBe(1);

      unmount();

      expect(vi.getTimerCount()).toBe(0);
    });

    it('uses the injected scheduler with one-second steps', async () => {
      const scheduler = { setInterval: vi.fn(() => 42), clearInterval: vi.fn() };
      render(App, { random: () => 0, scheduler });
      await addParticipants('Ana', 'Luis');

      await user.click(drawButton());
      expect(scheduler.setInterval).toHaveBeenCalledOnce();
      expect(scheduler.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

      const tick = scheduler.setInterval.mock.calls[0][0];
      await act(() => tick());
      await act(() => tick());
      expect(winnerShown()).not.toBeInTheDocument();

      await act(() => tick());
      expect(winnerShown()).toBeInTheDocument();
      expect(scheduler.clearInterval).toHaveBeenCalledWith(42);
    });
  });

  describe('invalid draws (no countdown)', () => {
    it('explains why it cannot draw without participants', async () => {
      render(App);

      await user.click(drawButton());

      expect(countdown()).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
      );
    });

    it('shows the error immediately with a single participant', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana');

      await user.click(drawButton());

      expect(countdown()).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
      );
      expect(winnerShown()).not.toBeInTheDocument();
      expect(drawButton()).toBeEnabled();
    });

    it('does not draw when there are not more participants than winners', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva');
      await chooseWinnerCount(3);

      await user.click(drawButton());

      expect(countdown()).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Se necesitan al menos 4 participantes para sortear 3 ganador(es).',
      );
      expect(podiumShown()).not.toBeInTheDocument();
    });
  });

  describe('results after the countdown', () => {
    it('draws and shows a single winner', async () => {
      render(App, { random: () => 0.5 });
      await addParticipants('Ana', 'Luis', 'Eva');

      await drawAndWait();

      expect(winnerShown()).toBeInTheDocument();
      expect(screen.getAllByText('Luis')).toHaveLength(2); // list item + winner card
      expect(screen.getAllByText('Ana')).toHaveLength(1);
    });

    it('shows a podium of three distinct winners', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva', 'Juan', 'Sara');
      await chooseWinnerCount(3);

      await drawAndWait();

      expect(podiumShown()).toBeInTheDocument();
      expect(podiumPlaces()).toEqual(['2.º lugar: Luis', '1.er lugar: Ana', '3.er lugar: Eva']);
    });

    it('shows a podium of two winners without a 3rd place', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva');
      await chooseWinnerCount(2);

      await drawAndWait();

      expect(podiumShown()).toBeInTheDocument();
      expect(podiumPlaces()).toEqual(['2.º lugar: Luis', '1.er lugar: Ana']);
    });

    it('lets two entries with the same name win once each', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Ana', 'Luis');
      await chooseWinnerCount(2);

      await drawAndWait();

      expect(podiumPlaces()).toEqual(['2.º lugar: Ana', '1.er lugar: Ana']);
    });
  });

  describe('stale results', () => {
    it('hides the winner when the list changes', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva');
      await drawAndWait();

      await user.click(screen.getByRole('button', { name: 'Quitar Luis' }));

      expect(winnerShown()).not.toBeInTheDocument();
    });

    it('hides the result when a participant is added', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis');
      await drawAndWait();

      await addParticipants('Eva');

      expect(winnerShown()).not.toBeInTheDocument();
    });

    it('hides the result when the winner count changes', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva');
      await drawAndWait();

      await chooseWinnerCount(2);

      expect(winnerShown()).not.toBeInTheDocument();
    });

    it('hides the error message when the list changes', async () => {
      render(App);
      await user.click(drawButton());

      await addParticipants('Ana');

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('keeps the chosen winner count when it stops being valid', async () => {
      render(App, { random: () => 0 });
      await addParticipants('Ana', 'Luis', 'Eva', 'Juan');
      await chooseWinnerCount(3);
      await drawAndWait();

      await user.click(screen.getByRole('button', { name: 'Quitar Juan' }));

      expect(screen.getByRole('radio', { name: '3' })).toBeChecked();
      expect(podiumShown()).not.toBeInTheDocument();
    });
  });
});
