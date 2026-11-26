import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Countdown from './Countdown.svelte';

describe('Countdown', () => {
  it('shows the current number in a live region', () => {
    render(Countdown, { count: 3 });

    const region = screen.getByRole('status', { name: 'Cuenta regresiva' });
    expect(region).toHaveAttribute('aria-live', 'assertive');
    expect(region).toHaveTextContent('3');
  });

  it('updates when the number changes', async () => {
    const { rerender } = render(Countdown, { count: 2 });

    await rerender({ count: 1 });

    expect(screen.getByRole('status', { name: 'Cuenta regresiva' })).toHaveTextContent('1');
  });
});
