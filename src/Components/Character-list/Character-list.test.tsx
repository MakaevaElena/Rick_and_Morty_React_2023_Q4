import CharacterList from './Character-list';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Context from '../../context/context';
import { Rickandmorty } from '../../types/rickandmorty-types';
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

const TestComponent = () => {
  return (
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
        <CharacterList />
      </BrowserRouter>
    </Context.Provider>
  );
};

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the tytle', () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    const element = screen.getByText(/Character List/i);
    expect(element).toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    const mockData: Rickandmorty[] = [];
    render(
      <BrowserRouter>
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
          <CharacterList />
        </Context.Provider>
      </BrowserRouter>
    );
    const cards = screen.getByText(/Character not found/i);
    expect(cards).toBeInTheDocument();
  });
});
