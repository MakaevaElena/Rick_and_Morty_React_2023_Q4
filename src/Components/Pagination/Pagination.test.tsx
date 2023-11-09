import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import CharacterList from '../Character-list/Character-list';
import {
  mockPage,
  mockSetPage,
  mockSetCount,
  mockSearchValue,
  mockSetSearchValue,
  mockData,
  mockSetData,
  mockIsLoading,
} from '../../mocks';
import Context from '../../context/context';

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

    const pageButton = screen.findByTestId('5');
    expect(pageButton).resolves.toBeInTheDocument();
    fireEvent.click(await pageButton);

    expect(mockSearchParam).toContain(`page=${page}`);
  });
});

//https://dev.to/kiranmantha/how-to-unit-test-usesearchparams-1pg8
//https://stackoverflow.com/questions/76070733/testing-a-react-component-that-uses-search-parameters-in-the-url
//https://ru.stackoverflow.com/questions/1433284/%D0%9A%D0%B0%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D1%85%D1%83%D0%BA%D0%B8-%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B8-jest-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2
