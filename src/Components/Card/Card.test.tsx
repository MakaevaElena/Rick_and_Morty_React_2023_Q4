import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from './Card';
import { mockCharacter, mockData } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Layout from '../Layout/Layout';
import CharacterList from '../Character-list/Character-list';
import Info from '../Info/Info';

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <Provider store={store}>
        <Card key={mockCharacter.id} RickandmortyData={mockCharacter} />
      </Provider>
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
      <Provider store={store}>
        <Layout>
          <CharacterList
            characterList={{
              info: {
                count: 826,
                pages: 42,
                next: 'https://rickandmortyapi.com/api/character/?page=2',
                prev: null,
              },
              results: mockData,
            }}
          >
            <Info details={mockData[0]} />
          </CharacterList>
        </Layout>
      </Provider>
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
});
