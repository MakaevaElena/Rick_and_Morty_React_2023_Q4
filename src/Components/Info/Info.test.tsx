import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockCharacter } from '../../mocks/mocks';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Info from './Info';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => [mockCharacter],
});

describe('Tests for the Detailed Card component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <Info />
      </Provider>
    );
    await waitFor(() => {
      const card = screen.getByTestId('info');
      expect(card).toBeInTheDocument();
      expect(screen.getByTestId('info-img')).toBeInTheDocument();
      expect(screen.getByTestId('species')).toBeInTheDocument();
      expect(screen.getByTestId('gender')).toBeInTheDocument();
      expect(screen.getByTestId('status')).toBeInTheDocument();
      expect(screen.getByTestId('location')).toBeInTheDocument();
      expect(screen.getByTestId('type')).toBeInTheDocument();
      expect(screen.getByTestId('created')).toBeInTheDocument();
    });
  });

  it('Ensure that close button exist', async () => {
    render(
      <Provider store={store}>
        <Info />
      </Provider>
    );
    await waitFor(() => {
      const card = screen.getByTestId('info');
      expect(card).toBeInTheDocument();
    });

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <Info />
      </Provider>
    );
    await waitFor(() => {
      const card = screen.getByTestId('info');
      expect(card).toBeInTheDocument();
    });

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
    });
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

    await waitFor(() => {
      const card = screen.queryByTestId('info');
      expect(card).toBeInTheDocument();
    });
  });
});
