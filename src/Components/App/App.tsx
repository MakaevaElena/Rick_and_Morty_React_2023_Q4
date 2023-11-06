import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import CharacterList from '../Character-list/Character-list';
import Searching from '../Searching/Searching';
import { Rickandmorty } from '../../types/rickandmorty-types';
import Button from '../Button/Button';
import { BASE_URL, DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Info from '../Info/Info';
import { createContext } from 'react';
import { AppProps, IContext } from './types';

export const Context = createContext<IContext>({
  page: DEFAULT_PAGE,
  setPage: () => {},
  setCount: () => {},
});

const App: React.FC<AppProps> = () => {
  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [count, setCount] = useState(DEFAULT_COUNT);

  const getSearchData = (searchingData: Rickandmorty[]) => {
    setData(searchingData.slice(0, +count));
  };

  useEffect(() => {
    fetchData().then((data: Rickandmorty[]) => {
      setData(data.slice(0, +count));
    });

    async function fetchData() {
      const value = localStorage.getItem('searchValue');
      setisLoading(true);

      const url =
        value && value.length > 0
          ? `${BASE_URL}/character/?name=${value}`
          : `${BASE_URL}/character/?page=${page}`;
      try {
        const response = await axios.get(url);

        setisLoading(false);
        return response.data.results;
      } catch {
        setisLoading(false);
        return [];
      }
    }
  }, [count, page]);

  return (
    <div className="container">
      <Button />
      <Context.Provider value={{ page, setPage, setCount }}>
        <Searching getSearchData={getSearchData} />
        <Routes>
          <Route path="/*" element={<CharacterList data={data} isLoading={isLoading} />} />
          <Route path={`/search/`} element={<CharacterList data={data} isLoading={isLoading} />}>
            <Route path={`/search/details/`} element={<Info />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
