import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Info from './Info';
import Context from '../../context/context';
import {
  mockPage,
  mockSetPage,
  mockSetCount,
  mockSearchValue,
  mockSetSearchValue,
  mockData,
  mockSetData,
  mockIsLoading,
} from '../../mocks/mocks';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('Tests for the Detailed Card component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Context.Provider
        value={{
          page: mockPage,
          setPage: mockSetPage,
          setCount: mockSetCount,
          searchValue: mockSearchValue,
          setSearchValue: mockSetSearchValue,
          data: mockData,
          setData: mockSetData,
          isLoading: mockIsLoading,
        }}
      >
        <BrowserRouter>
          <Info />
        </BrowserRouter>
      </Context.Provider>
    );
    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });

    (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({ data: { mockData } }));

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
