import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import CharacterList from '../Character-list/Character-list';
import { mockData, mockSetData, mockIsLoading } from '../../mocks/mocks';
import Context from '../../context/context';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

let mockSearchParam = `/search/?page=${1}&count=${20}`;
describe('Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const { result } = renderHook(() => useState(''));
    const [page, setPage] = result.current;
    vi.mock('react-router-dom', async () => {
      const actual: object = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useSearchParams: () => {
          const [params, setParams] = useState(new URLSearchParams(mockSearchParam));

          return [
            params,
            (fn: (searchParams: URLSearchParams) => URLSearchParams) => {
              const newParams = fn(params);
              setParams(newParams);
              mockSearchParam = newParams.toString();
              act(() => setPage(mockSearchParam));
            },
          ];
        },
      };
    });

    render(
      <Context.Provider
        value={{
          data: mockData,
          setData: mockSetData,
          isLoading: mockIsLoading,
        }}
      >
        <BrowserRouter>
          <Provider store={store}>
            <CharacterList />
          </Provider>
        </BrowserRouter>
      </Context.Provider>
    );

    const pageButton = screen.findByTestId('5');
    expect(pageButton).resolves.toBeInTheDocument();
    fireEvent.click(await pageButton);

    expect(mockSearchParam).toContain(`page=${page}`);
  });
});
