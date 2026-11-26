import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.svelte';

const addParticipants = async (...names) => {
  for (const name of names) {
    await userEvent.type(screen.getByLabelText('Nombre del participante'), `${name}{Enter}`);
  }
};

const drawButton = () => screen.getByRole('button', { name: 'Sortear ganador' });

describe('App', () => {
  it('starts with no participants and the draw disabled', () => {
    render(App);

    expect(screen.getByText('Aún no hay participantes. ¡Agrega el primero!')).toBeInTheDocument();
    expect(drawButton()).toBeDisabled();
  });

  it('ignores blank names', async () => {
    render(App);

    await addParticipants('   ');

    expect(drawButton()).toBeDisabled();
  });

  it('draws and shows a single winner', async () => {
    render(App, { random: () => 0.5 });
    await addParticipants('Ana', 'Luis', 'Eva');

    await userEvent.click(drawButton());

    expect(screen.getByText('¡Tenemos un ganador!')).toBeInTheDocument();
    expect(screen.getAllByText('Luis')).toHaveLength(2); // list item + winner card
    expect(screen.getAllByText('Ana')).toHaveLength(1);
  });

  it('shows exactly one winner from the list, even at the edge of the random range', async () => {
    render(App, { random: () => 1 - Number.EPSILON });
    await addParticipants('Ana', 'Luis', 'Eva');

    await userEvent.click(drawButton());

    const winnerCard = within(screen.getByText('¡Tenemos un ganador!').closest('section'));
    expect(winnerCard.getAllByText(/\S/)).toHaveLength(2); // heading + one name
    expect(winnerCard.getByText('Eva')).toBeInTheDocument();
  });

  it('disables the draw again when every participant is removed', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana');
    expect(drawButton()).toBeEnabled();

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Ana' }));

    expect(drawButton()).toBeDisabled();
    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('hides the winner when the list changes', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis');
    await userEvent.click(drawButton());

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Luis' }));

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });
});
