import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Searching from './Searching';
import CharacterList from '../Character-list/Character-list';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockData } from '@/mocks/mocks';

const TestComponent = () => {
  return (
    <Provider store={store}>
      <Searching />
    </Provider>
  );
};

describe('Tests for the Search component', () => {
  it('Render Search Input component', () => {
    render(<TestComponent />);
    const inputField = screen.getByPlaceholderText('search...');
    expect(inputField).toBeInTheDocument;
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(<TestComponent />);
    const inputField = screen.getByPlaceholderText('search...');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(inputField, { target: { value: 'Morty' } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('searchValue')).toBe('Morty');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const mockSearchValue = 'Rick';
    render(<TestComponent />);
    const inputField = screen.getByPlaceholderText('search...') as HTMLInputElement;

    waitFor(() => {
      expect(inputField.value).toBe(mockSearchValue);
    });
  });
  it('Check that the Loader render', () => {
    render(
      <Provider store={store}>
        <Searching />
        <CharacterList
          characterList={{
            info: {
              count: 826,
              pages: 42,
              next: 'https://rickandmortyapi.com/api/character/?page=2',
              prev: null,
            },
            results: mockData,
          }}
        />
      </Provider>
    );
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    const loader = screen.getAllByTestId('loader')[0];
    expect(loader).toBeInTheDocument;
  });
});
