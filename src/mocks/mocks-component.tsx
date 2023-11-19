import { BrowserRouter } from 'react-router-dom';
import CharacterList from '../Components/Character-list/Character-list';
import { Provider } from 'react-redux';

import { store } from '../store/store';
export const TestComponent = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CharacterList />
      </Provider>
    </BrowserRouter>
  );
};
