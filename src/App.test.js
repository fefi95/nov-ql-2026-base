import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.svelte';

const addParticipants = async (...names) => {
  for (const name of names) {
    await userEvent.type(screen.getByLabelText('Nombre del participante'), `${name}{Enter}`);
  }
};

const drawButton = () => screen.getByRole('button', { name: 'Sortear ganador' });
const chooseWinnerCount = (count) => userEvent.click(screen.getByRole('radio', { name: `${count}` }));
const podiumPlaces = () =>
  screen.getAllByRole('listitem').flatMap((item) => item.getAttribute('aria-label') ?? []);

describe('App', () => {
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

  it('explains why it cannot draw without participants', async () => {
    render(App);

    await userEvent.click(drawButton());

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    );
  });

  it('does not draw with a single participant', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana');

    await userEvent.click(drawButton());

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    );
    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('does not draw when there are not more participants than winners', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva');
    await chooseWinnerCount(3);

    await userEvent.click(drawButton());

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Se necesitan al menos 4 participantes para sortear 3 ganador(es).',
    );
    expect(screen.queryByText('¡Tenemos un podio!')).not.toBeInTheDocument();
  });

  it('draws and shows a single winner', async () => {
    render(App, { random: () => 0.5 });
    await addParticipants('Ana', 'Luis', 'Eva');

    await userEvent.click(drawButton());

    expect(screen.getByText('¡Tenemos un ganador!')).toBeInTheDocument();
    expect(screen.getAllByText('Luis')).toHaveLength(2); // list item + winner card
    expect(screen.getAllByText('Ana')).toHaveLength(1);
  });

  it('shows a podium of three distinct winners', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva', 'Juan', 'Sara');
    await chooseWinnerCount(3);

    await userEvent.click(drawButton());

    expect(screen.getByText('¡Tenemos un podio!')).toBeInTheDocument();
    expect(podiumPlaces()).toEqual(['2.º lugar: Luis', '1.er lugar: Ana', '3.er lugar: Eva']);
  });

  it('shows a podium of two winners without a 3rd place', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva');
    await chooseWinnerCount(2);

    await userEvent.click(drawButton());

    expect(screen.getByText('¡Tenemos un podio!')).toBeInTheDocument();
    expect(podiumPlaces()).toEqual(['2.º lugar: Luis', '1.er lugar: Ana']);
  });

  it('lets two entries with the same name win once each', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Ana', 'Luis');
    await chooseWinnerCount(2);

    await userEvent.click(drawButton());

    expect(podiumPlaces()).toEqual(['2.º lugar: Ana', '1.er lugar: Ana']);
  });

  it('hides the winner when the list changes', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva');
    await userEvent.click(drawButton());

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Luis' }));

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('hides the result when a participant is added', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis');
    await userEvent.click(drawButton());

    await addParticipants('Eva');

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('hides the result when the winner count changes', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva');
    await userEvent.click(drawButton());

    await chooseWinnerCount(2);

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('hides the error message when the list changes', async () => {
    render(App);
    await userEvent.click(drawButton());

    await addParticipants('Ana');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps the chosen winner count when it stops being valid', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis', 'Eva', 'Juan');
    await chooseWinnerCount(3);
    await userEvent.click(drawButton());

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Juan' }));

    expect(screen.getByRole('radio', { name: '3' })).toBeChecked();
    expect(screen.queryByText('¡Tenemos un podio!')).not.toBeInTheDocument();
  });
});
