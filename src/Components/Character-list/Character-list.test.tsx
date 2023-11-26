import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { TestComponent } from '../../mocks/mocks-component';

describe('Tests for the Card List component', () => {
  test('Verify that the component not renders the tytle', () => {
    render(<TestComponent />);
    const element = screen.queryByText(/Character List/i);
    expect(element).not.toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
  });
});
