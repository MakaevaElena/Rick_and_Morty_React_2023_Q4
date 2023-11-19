import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import CharacterList from '../Character-list/Character-list';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockData } from '../../mocks/mocks';
import Card from './Card';
import { mockCharacter } from '../../mocks/mocks';

// vi.mock('axios');

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

    // (global.fetch as jest.Mock).mockImplementationOnce(() =>
    //   Promise.resolve({ data: { mockData } })
    // );

    // await waitFor(() => {
    const card = screen.getAllByTestId('card')[0];
    fireEvent.click(card);
    // });

    // const spy = vi.spyOn(axios, 'get');
    const spy = vi.spyOn(global, 'fetch');

    // expect(axios.get).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveLength(2);
    // const BASE_URL = 'https://rickandmortyapi.com/api/';
    // expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}character/${mockCharacter.id}`);
    // expect(global.fetch).toHaveBeenCalled();

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
