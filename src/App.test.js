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

  it('hides the winner when the list changes', async () => {
    render(App, { random: () => 0 });
    await addParticipants('Ana', 'Luis');
    await userEvent.click(drawButton());

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Luis' }));

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });
});
