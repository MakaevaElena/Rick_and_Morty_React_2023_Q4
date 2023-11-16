import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Searching from './Searching';
import { BrowserRouter } from 'react-router-dom';
import {
  mockData,
  mockSetData,
  // mockIsLoading,
} from '../../mocks/mocks';
import CharacterList from '../Character-list/Character-list';
import Context from '../../context/context';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const TestComponent = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Searching />
      </Provider>
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
          data: mockData,
          setData: mockSetData,
          // isLoading: mockIsLoading,
        }}
      >
        <BrowserRouter>
          <Provider store={store}>
            <Searching />
            <CharacterList />
          </Provider>
        </BrowserRouter>
      </Context.Provider>
    );
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    const loader = screen.getAllByTestId('loader')[0];
    expect(loader).toBeInTheDocument;
  });
});
