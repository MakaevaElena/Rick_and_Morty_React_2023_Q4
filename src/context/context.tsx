import { createContext } from 'react';
import { DEFAULT_PAGE } from '../constants';
import { IContext } from '../Components/App/types';

const Context = createContext<IContext>({
  page: DEFAULT_PAGE,
  setPage: () => {},
  setCount: () => {},
  searchValue: '',
  setSearchValue: () => {},
  data: [],
  setData: () => {},
  isLoading: false,
});

export default Context;
