import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { TestComponent } from '../../mocks/mocks-component';

describe('Tests for the Card List component', () => {
  test('Check that an appropriate message is displayed if no cards are present', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [],
    });
    render(<TestComponent />);
    await waitFor(() => {
      const message = screen.getAllByText(/Character not found/i)[0];
      expect(message).toBeInTheDocument();
    });
  });
});
