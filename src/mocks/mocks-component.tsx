import React from 'react';
import CharacterList from '../Components/Character-list/Character-list';
import { Provider } from 'react-redux';

import { store } from '../store/store';
export const TestComponent = () => {
  return (
    <Provider store={store}>
      <CharacterList />
    </Provider>
  );
};
