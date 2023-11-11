import { describe, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import App from '../App/App';

// const mockHandleClick = vi.fn();

describe('Tests for Button component', () => {
  test('async component should throw', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByText('Sorry.. there was an error')).toBeVisible();
    });
  });
});
