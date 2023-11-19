import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Context from '../../context/context';
// import {
//   mockData,
//   mockSetData,
//   // mockIsLoading,
// } from '../../mocks/mocks';
import CharacterList from '../Character-list/Character-list';
import Info from '../Info/Info';
import PageNotFound from '../PageNotFound/PageNotFound';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import axios from 'axios';
// import axios from 'axios';

vi.mock('axios');

describe('Tests for the Card component', () => {
  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      // <Context.Provider
      //   value={{
      //     data: mockData,
      //     setData: mockSetData,
      //     // isLoading: mockIsLoading,
      //   }}
      // >
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path={`/search/`} element={<CharacterList />}>
              <Route path={`/search/details/`} element={<Info />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Provider>
      </BrowserRouter>
      // </Context.Provider>
    );

    // (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({ data: { mockData } }));

    await waitFor(() => {
      const card = screen.getAllByTestId('card')[0];
      fireEvent.click(card);
    });

    const spy = vi.spyOn(axios, 'get');

    // expect(axios.get).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveLength(2);

    await waitFor(() => {
      expect(screen.getByTestId('info-img')).toBeInTheDocument();
      expect(screen.getByTestId('species')).toBeInTheDocument();
      expect(screen.getByTestId('gender')).toBeInTheDocument();
      expect(screen.getByTestId('status')).toBeInTheDocument();
      expect(screen.getByTestId('location')).toBeInTheDocument();
      expect(screen.getByTestId('type')).toBeInTheDocument();
      expect(screen.getByTestId('created')).toBeInTheDocument();
    });
  });
});
