import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import WinnerCard from './WinnerCard.svelte';

describe('WinnerCard', () => {
  it('announces the winner', () => {
    render(WinnerCard, { winner: 'Ana' });

    expect(screen.getByText('¡Tenemos un ganador!')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });
});
