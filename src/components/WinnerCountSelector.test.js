import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import WinnerCountSelector from './WinnerCountSelector.svelte';

describe('WinnerCountSelector', () => {
  it('offers 1, 2 and 3 winners with 1 selected by default', () => {
    render(WinnerCountSelector, { onchange: vi.fn() });

    expect(screen.getByRole('group', { name: 'Cantidad de ganadores' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radio', { name: '1' })).toBeChecked();
  });

  it('shows the selected value', () => {
    render(WinnerCountSelector, { value: 3, onchange: vi.fn() });

    expect(screen.getByRole('radio', { name: '3' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '1' })).not.toBeChecked();
  });

  it('reports the amount the user chooses', async () => {
    const onchange = vi.fn();
    render(WinnerCountSelector, { value: 1, onchange });

    await userEvent.click(screen.getByRole('radio', { name: '2' }));

    expect(onchange).toHaveBeenCalledWith(2);
  });
});
