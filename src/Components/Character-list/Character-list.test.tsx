import CharacterList from './Character-list';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Context from '../../context/context';
import { Rickandmorty } from '../../types/rickandmorty-types';

// import { describe, expect, it } from 'vitest';
// require('@testing-library/jest-dom');
// require('@testing-library/jest-dom/extend-expect');

//https://www.appsloveworld.com/reactjs/100/3/property-tobeinthedocument-does-not-exist-on-type-matchersany

const mockPage = 1;
const mockSetPage = () => {};
const mockSetCount = () => {};
const mockSearchValue = '';
const mockSetSearchValue = () => {};
const mockData = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Earth',
    type: '',
    gender: 'male',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: ['', ''],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 'Earth',
    type: '',
    gender: 'male',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: ['', ''],
    url: '',
    created: '',
  },
];
const mockSetData = () => {};
const mockIsLoading = false;

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the tytle', () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    // const element = screen.getByRole('heading', {
    //   level: 2,
    // });
    // expect(element).toHaveTextContent('Character List');
    const element = screen.getByText(/Character List/i);
    expect(element).toBeInTheDocument();
  });

  test('Verify that the component renders the specified number of cards', async () => {
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
          <CharacterList />
        </BrowserRouter>
      </Context.Provider>
    );
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
