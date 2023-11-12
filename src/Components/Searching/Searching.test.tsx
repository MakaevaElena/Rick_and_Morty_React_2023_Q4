import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Searching from './Searching';
import { BrowserRouter } from 'react-router-dom';
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
import CharacterList from '../Character-list/Character-list';
import Context from '../../context/context';

const TestComponent = () => {
  return (
    <BrowserRouter>
      <Searching />
    </BrowserRouter>
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
          <Searching />
          <CharacterList />
        </BrowserRouter>
      </Context.Provider>
    );
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    const loader = screen.getAllByTestId('loader')[0];
    expect(loader).toBeInTheDocument;
  });
});
