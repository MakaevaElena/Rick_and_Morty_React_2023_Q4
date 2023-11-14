import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Info from './Info';
import Context from '../../context/context';
import { mockData, mockSetData } from '../../mocks/mocks';

import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock('services/apiService', () => ({
  fetchRickandmortyDetails: vi
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockData[0]), 100))
    ),
  fetchData: vi.fn().mockResolvedValue(mockData),
}));

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <Context.Provider
        value={{
          data: mockData,
          setData: mockSetData,
          // isLoading: mockIsLoading,
        }}
      >
        <BrowserRouter>
          <Provider store={store}>
            <Info />
          </Provider>
        </BrowserRouter>
      </Context.Provider>
    );
    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });
});
