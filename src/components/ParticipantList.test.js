import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ParticipantList from './ParticipantList.svelte';

describe('ParticipantList', () => {
  it('shows the empty message when there are no participants', () => {
    render(ParticipantList, { participants: [], onremove: vi.fn() });

    expect(screen.getByText('Aún no hay participantes. ¡Agrega el primero!')).toBeInTheDocument();
  });

  it('lists every participant', () => {
    render(ParticipantList, { participants: ['Ana', 'Luis'], onremove: vi.fn() });

    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Luis')).toBeInTheDocument();
  });

  it('reports which participant the user removes', async () => {
    const onremove = vi.fn();
    render(ParticipantList, { participants: ['Ana', 'Luis'], onremove });

    await userEvent.click(screen.getByRole('button', { name: 'Quitar Luis' }));

    expect(onremove).toHaveBeenCalledWith(1);
  });
});
