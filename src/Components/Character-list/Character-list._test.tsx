import { render, screen, waitFor } from '@testing-library/react';

import { expect, test } from 'vitest';
// import Context from '../../context/context';
// import { Rickandmorty } from '../../types/rickandmorty-types';
import // mockPage,
// mockSetPage,
// mockSetCount,
// mockSearchValue,
// mockSetSearchValue,
// mockData,
// mockSetData,
// mockIsLoading,
'../../mocks/mocks';
import { TestComponent } from './mocks';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import CharacterList from './Character-list';

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the tytle', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CharacterList />
        </Provider>
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
    // const mockData: Rickandmorty[] = [];
    render(
      <BrowserRouter>
        {/* <Context.Provider
          value={{
            data: mockData,
            setData: mockSetData,
            // isLoading: mockIsLoading,
          }}
        > */}
        <Provider store={store}>
          <CharacterList />
        </Provider>
        {/* </Context.Provider> */}
      </BrowserRouter>
    );
    const cards = screen.getByText(/Character not found/i);
    expect(cards).toBeInTheDocument();
  });
});
