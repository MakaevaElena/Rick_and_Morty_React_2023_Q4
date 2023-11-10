import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Info from './Info';
import Context from '../../context/context';
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

import { vi } from 'vitest';

vi.mock('services/apiService', () => ({
  fetchRickandmortyDetails: vi
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockData[0]), 100))
    ),
  fetchData: vi.fn().mockResolvedValue(mockData),
}));

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
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
          <Info />
        </BrowserRouter>
      </Context.Provider>
    );
    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  // it('Ensure that the Detailed Card component renders the relevant card data', async () => {
  //   render(
  //     <Context.Provider
  //       value={{
  //         page: mockPage,
  //         setPage: mockSetPage,
  //         setCount: mockSetCount,
  //         searchValue: mockSearchValue,
  //         setSearchValue: mockSetSearchValue,
  //         data: mockData,
  //         setData: mockSetData,
  //         isLoading: mockIsLoading,
  //       }}
  //     >
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path="/" element={<CharacterList />} />
  //           <Route path={`/search/`} element={<CharacterList />}>
  //             <Route path={`/search/details/`} element={<Info />} />
  //           </Route>
  //           <Route path="*" element={<PageNotFound />} />
  //         </Routes>
  //       </BrowserRouter>
  //     </Context.Provider>
  //   );

  //   const info = screen.queryByTestId('info');
  //   expect(info).not.toBeInTheDocument();

  //   await waitFor(() => {
  //     const cards = screen.getAllByTestId('card');
  //     expect(cards).toHaveLength(2);
  //   });

  //   await waitFor(() => {
  //     const card = screen.getAllByTestId('card')[0];
  //     fireEvent.click(card);
  //   });

  //   await waitFor(() => {
  //     const info = screen.getByTestId('info');
  //     expect(info).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByTestId('info-img')).toBeInTheDocument();
  //     expect(screen.getByTestId('species')).toBeInTheDocument();
  //     expect(screen.getByTestId('gender')).toBeInTheDocument();
  //     expect(screen.getByTestId('status')).toBeInTheDocument();
  //     expect(screen.getByTestId('location')).toBeInTheDocument();
  //     expect(screen.getByTestId('type')).toBeInTheDocument();
  //     expect(screen.getByTestId('created')).toBeInTheDocument();
  //   });
  // });
});
