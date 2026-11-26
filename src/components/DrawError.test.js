import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import DrawError from './DrawError.svelte';

describe('DrawError', () => {
  it('shows the message as an alert', () => {
    render(DrawError, {
      message: 'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Se necesitan al menos 2 participantes para sortear 1 ganador(es).',
    );
  });
});
