import React from 'react';
import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from '../ErrorButton/ErrorButton';

describe('Tests for Error Button', () => {
  test('Error button click should throw error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getAllByText('TestErrorButton')[0];
    fireEvent.click(errorButton);

    await waitFor(() => {
      expect(screen.getByText('Sorry.. there was an error')).toBeVisible();
    });
  });
});
