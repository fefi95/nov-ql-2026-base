import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Podium from './Podium.svelte';

const placesFromLeftToRight = () =>
  screen.getAllByRole('listitem').map((item) => item.getAttribute('aria-label'));

describe('Podium', () => {
  it('shows three winners with 2nd on the left, 1st in the center and 3rd on the right', () => {
    render(Podium, { winners: ['Ana', 'Luis', 'Eva'] });

    expect(screen.getByText('¡Tenemos un podio!')).toBeInTheDocument();
    expect(placesFromLeftToRight()).toEqual([
      '2.º lugar: Luis',
      '1.er lugar: Ana',
      '3.er lugar: Eva',
    ]);
    expect(screen.getByText('🥇')).toBeInTheDocument();
    expect(screen.getByText('🥈')).toBeInTheDocument();
    expect(screen.getByText('🥉')).toBeInTheDocument();
  });

  it('leaves the 3rd place empty with two winners', () => {
    render(Podium, { winners: ['Ana', 'Luis'] });

    expect(screen.getByText('¡Tenemos un podio!')).toBeInTheDocument();
    expect(placesFromLeftToRight()).toEqual(['2.º lugar: Luis', '1.er lugar: Ana']);
    expect(screen.queryByText('🥉')).not.toBeInTheDocument();
  });
});
