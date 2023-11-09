import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Searching from './Searching';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Search component', () => {
  it('Render Search Input component', () => {
    render(
      <BrowserRouter>
        <Searching />
      </BrowserRouter>
    );
    const inputField = screen.getByPlaceholderText('search...');
    expect(inputField).toBeInTheDocument;
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <Searching />
      </BrowserRouter>
    );
    const inputField = screen.getByPlaceholderText('search...');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(inputField, { target: { value: 'Morty' } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('searchValue')).toBe('Morty');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const mockSearchValue = 'Rick';
    // const mockSetSearchValue = vi.fn();

    render(
      <BrowserRouter>
        <Searching />
      </BrowserRouter>
    );
    const inputField = screen.getByPlaceholderText('search...') as HTMLInputElement;

    waitFor(() => {
      expect(inputField.value).toBe(mockSearchValue);
      // expect(mockSetSearchValue).toHaveBeenCalledWith(mockSearchValue);
    });
  });
});
