import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './Card';
import { mockCharacter } from '../../mocks/mocks';
import CharacterList from '../Character-list/Character-list';
import Info from '../Info/Info';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card key={mockCharacter.id} RickandmortyData={mockCharacter} />
        </Provider>
      </BrowserRouter>
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
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
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
    );

    await waitFor(() => {
      const card = screen.getAllByTestId('card')[0];
      fireEvent.click(card);
    });

    await waitFor(() => {
      const info = screen.getByTestId('info');
      expect(info).toBeInTheDocument();
    });

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
    });
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

    await waitFor(() => {
      const card = screen.queryByTestId('info');
      expect(card).not.toBeInTheDocument();
    });
  });
});
