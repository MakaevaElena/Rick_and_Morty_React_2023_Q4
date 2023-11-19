import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockData } from '../../mocks/mocks';
import Card from './Card';
import { mockCharacter } from '../../mocks/mocks';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => mockData,
});

describe('Tests for the Card component', () => {
  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card RickandmortyData={mockCharacter} />
        </Provider>
      </BrowserRouter>
    );

    const card = screen.getAllByTestId('card')[0];
    fireEvent.click(card);
    const spy = vi.spyOn(global, 'fetch');

    expect(spy).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('info-img')).toBeInTheDocument();
      expect(screen.getByTestId('species')).toBeInTheDocument();
      expect(screen.getByTestId('gender')).toBeInTheDocument();
      expect(screen.getByTestId('status')).toBeInTheDocument();
      expect(screen.getByTestId('location')).toBeInTheDocument();
      expect(screen.getByTestId('type')).toBeInTheDocument();
      expect(screen.getByTestId('created')).toBeInTheDocument();
    });
  });
});
