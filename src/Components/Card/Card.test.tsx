import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './Card';
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
  mockCharacter,
} from '../../mocks';
import CharacterList from '../Character-list/Character-list';
import Info from '../Info/Info';
import PageNotFound from '../PageNotFound/PageNotFound';
// import { vi } from 'vitest';
// import axios from 'axios';
// import { Rickandmorty } from '../../types/rickandmorty-types';

// vi.mock('axios');

// async function fetchRickandmortyDetails(): Promise<Rickandmorty> {
//   const response = await axios.get(`https://rickandmortyapi.com/api/character/1`);
//   const res: Rickandmorty = response.data;
//   return res;
// }

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
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
          <Card key={mockCharacter.id} RickandmortyData={mockCharacter} />
        </BrowserRouter>
      </Context.Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByTestId('card')[0]).toBeInTheDocument();
      expect(screen.getAllByText(mockCharacter.name)[0]).toBeInTheDocument();

      const headers = screen.getAllByRole('heading', {
        level: 3,
      });
      headers.forEach((head) => expect(head).toBeInTheDocument());

      expect(screen.getAllByAltText('character-img')[0]).toBeInTheDocument();
      expect(screen.getAllByText(mockCharacter.species)[0]).toBeInTheDocument();
      expect(screen.getAllByText(mockCharacter.gender)[0]).toBeInTheDocument();
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
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
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path={`/search/`} element={<CharacterList />}>
              <Route path={`/search/details/`} element={<Info />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    );

    const info = screen.queryByTestId('info');
    expect(info).not.toBeInTheDocument();

    await waitFor(() => {
      const card = screen.getAllByTestId('card')[0];
      fireEvent.click(card);
    });

    await waitFor(() => {
      const info = screen.getByTestId('info');
      expect(info).toBeInTheDocument();
    });

    // const closeButton = screen.getByTestId('close-button');

    // fireEvent.click(closeButton);

    // await waitFor(() => {
    //   const info = screen.queryByTestId('info');
    //   expect(info).not.toBeInTheDocument();
    // });

    // await waitFor(() => {
    //   const card = screen.getByTestId('card');
    //   expect(card).toHaveLength(1);
    // });
  });

  // it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
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

  //   (axios.get as jest.Mock).mockResolvedValue(() =>
  //     Promise.resolve({
  //       data: { mockData },
  //     })
  //   );

  //   await waitFor(() => {
  //     const card = screen.getAllByTestId('card')[0];
  //     fireEvent.click(card);
  //   });

  //   await new Promise(setImmediate);

  //   const fetchData = vi.mocked(axios);
  //   // expect(dataFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');

  //   expect(fetchData).toHaveBeenCalled();
  //   // https://runthatline.com/how-to-mock-axios-with-vitest/
  // });
});
