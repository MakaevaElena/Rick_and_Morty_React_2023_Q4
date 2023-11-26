import React from 'react';
import CharacterList from '../Components/Character-list/Character-list';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import { mockData } from './mocks';
export const TestComponent = () => {
  return (
    <Provider store={store}>
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
      />
    </Provider>
  );
};
