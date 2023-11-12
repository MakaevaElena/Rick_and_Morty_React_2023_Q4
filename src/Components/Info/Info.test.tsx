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

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
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
  });
});
