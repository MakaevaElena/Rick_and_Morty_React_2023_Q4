import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from './Card';
import { mockCharacter } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Layout from '../Layout/Layout';
import CharacterList from '../Character-list/Character-list';
import Info from '../Info/Info';
// import { vi } from 'vitest';
// import router from 'next/router';

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
          <CharacterList>
            <Info />
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

  // it('Ensure that clicking the close button hides the component', async () => {
  //   vi.mock('next/router', () => ({
  //     useRouter() {
  //       return {
  //         route: `/search/?page=${1}&count=${20}`,
  //       };
  //     },
  //   }));

  //   render(
  //     <Provider store={store}>
  //       <Layout>
  //         <CharacterList>
  //           <Info />
  //         </CharacterList>
  //       </Layout>
  //     </Provider>
  //   );

  //   // todo
  //   await waitFor(() => {
  //     const card = screen.getAllByTestId('card')[0];
  //     fireEvent.click(card);
  //   });

  //   const info = screen.getByTestId('info');
  //   expect(info).toBeInTheDocument();

  //   // await waitFor(() => {
  //   const closeButton = screen.getByTestId('close-button');
  //   expect(closeButton).toBeInTheDocument();
  //   fireEvent.click(closeButton);
  //   // });
  //   // await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

  //   await waitFor(() => {
  //     const card = screen.queryByTestId('info');
  //     expect(card).not.toBeInTheDocument();
  //   });
  // });
  // it('opens a detailed card component by clicking on a card and change search', () => {
  //   render(
  //     <Provider store={store}>
  //       <Card key={mockCharacter.id} RickandmortyData={mockCharacter} />
  //     </Provider>
  //   );
  //   const card = screen.getByTestId('card');
  //   fireEvent.click(card);

  //   // const searchParams = new URLSearchParams(JSON.stringify(router.query));

  //   // expect(searchParams.has(`id`)).toBeTruthy();
  //   // expect(searchParams.get('id')).toBe(String(mockCharacter.id));
  // });
});
