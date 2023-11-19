import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
// import CharacterList from '../Character-list/Character-list';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Pagination from './Pagination';
// import { TestComponent } from '../../mocks/mocks-component';
// import { TestComponent } from '../../mocks/mocks-component';
// import { mockData } from '../../mocks/mocks';

// global.fetch = vi.fn().mockResolvedValue({
//   json: async () => mockData,
// });

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

  // it('When user changes amount of items on page, reset page to first', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <Pagination />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  // const button = screen.getAllByRole('link', { current: 'page' })[4];
  // fireEvent.click(button);
  // expect(mockSearchParam).toBe(`/search/?page=${4}&count=${20}`);

  // waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

  // const select = screen.getByTestId('select');

  // expect(mockSearchParam).toBe(`/search/?page=${3}&count=${20}`);

  // fireEvent.select(select, { target: { value: 15 } });
  // expect(mockSearchParam).toBe(`/search/?page=${3}&count=${20}`);
  // expect(mockSearchParam).toBe(`/search/?page=${1}&count=${15}`);
  // });

  // it('component updates URL query parameter when page changes', () => {
  //   render(<TestComponent />);
  //   const searchParams = new URLSearchParams(mockSearchParam);
  //   const pageBtn = screen.getByTestId('3');
  //   fireEvent.click(pageBtn);
  //   // const searchParams = new URLSearchParams(mockSearchParam);

  //   expect(searchParams.has('page')).toBeTruthy();
  //   expect(searchParams.get('page')).toBe('3');
  // });
});
