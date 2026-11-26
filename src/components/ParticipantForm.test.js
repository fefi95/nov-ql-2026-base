import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ParticipantForm from './ParticipantForm.svelte';

describe('ParticipantForm', () => {
  it('sends the typed name when clicking Agregar and clears the field', async () => {
    const onadd = vi.fn();
    render(ParticipantForm, { onadd });
    const input = screen.getByLabelText('Nombre del participante');

    await userEvent.type(input, 'Ana');
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

    expect(onadd).toHaveBeenCalledWith('Ana');
    expect(input).toHaveValue('');
  });

  it('submits with the Enter key', async () => {
    const onadd = vi.fn();
    render(ParticipantForm, { onadd });

    await userEvent.type(screen.getByLabelText('Nombre del participante'), 'Luis{Enter}');

    expect(onadd).toHaveBeenCalledWith('Luis');
  });

  it('disables the field and the button while locked', () => {
    render(ParticipantForm, { onadd: vi.fn(), locked: true });

    expect(screen.getByLabelText('Nombre del participante')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeDisabled();
  });

  it('is enabled by default', () => {
    render(ParticipantForm, { onadd: vi.fn() });

    expect(screen.getByLabelText('Nombre del participante')).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeEnabled();
  });
});
