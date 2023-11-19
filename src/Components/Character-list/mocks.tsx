import { BrowserRouter } from 'react-router-dom';
import CharacterList from './Character-list';
import { Provider } from 'react-redux';

import { store } from '../../store/store';
export const TestComponent = () => {
  return (
    // <Context.Provider
    //   value={{
    //     data: mockData,
    //     setData: mockSetData,
    //     // isLoading: mockIsLoading,
    //   }}
    // >
    <BrowserRouter>
      <Provider store={store}>
        <CharacterList />
      </Provider>
    </BrowserRouter>
    // </Context.Provider>
  );
};
