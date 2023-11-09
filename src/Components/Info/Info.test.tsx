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
  // mockCharacter,
} from '../../mocks';
// import CharacterList from '../Character-list/Character-list';
// import PageNotFound from '../PageNotFound/PageNotFound';

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
  //   await waitFor(() => {
  //     const card = screen.getAllByTestId('card')[0];
  //     fireEvent.click(card);
  //   });

  //   // await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

  //   await waitFor(() => {
  //     expect(screen.findByTestId('info')).toBeInTheDocument();
  //     expect(screen.findByText(mockCharacter.name)).toBeInTheDocument();
  //   });

  //   // const headers = screen.getAllByRole('heading', {
  //   //   level: 3,
  //   // });
  //   // headers.forEach((head) => expect(head).toBeInTheDocument());

  //   // expect(screen.getByAltText('info-img')).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.type)).toBeInTheDocument();
  //   // expect(screen.getByText(mockCharacter.created)).toBeInTheDocument();
  // });
});
