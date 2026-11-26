import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DrawButton from './DrawButton.svelte';

describe('DrawButton', () => {
  it('is disabled when told so', () => {
    render(DrawButton, { disabled: true, ondraw: vi.fn() });

    expect(screen.getByRole('button', { name: 'Sortear ganador' })).toBeDisabled();
  });

  it('is enabled by default', () => {
    render(DrawButton, { ondraw: vi.fn() });

    expect(screen.getByRole('button', { name: 'Sortear ganador' })).toBeEnabled();
  });

  it('calls ondraw when clicked', async () => {
    const ondraw = vi.fn();
    render(DrawButton, { disabled: false, ondraw });

    await userEvent.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    expect(ondraw).toHaveBeenCalledOnce();
  });
});
