import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Pagination from './Pagination';

let mockSearchParam = `/search/?page=${3}&count=${20}`;

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
      <BrowserRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const pageButton = screen.findByTestId('5');
    expect(pageButton).resolves.toBeInTheDocument();
    fireEvent.click(await pageButton);

    expect(mockSearchParam).toContain(`page=${page}`);
  });

  it('Check that pagination battons exist', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('link', { current: 'page' });
    expect(buttons).toHaveLength(20);
  });
});
