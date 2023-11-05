import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Main from './Components/Main/Main';
import Searching from './Components/Searching/Searching';
import { Rickandmorty } from './types/rickandmorty-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from './Components/TestErrorButton/TestErrorButton';
import { BASE_URL, DEFAULT_COUNT, DEFAULT_PAGE } from './constants';
import { AppProps, IContext } from './types/common-types';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Info from './Components/Info/Info';
import { createContext } from 'react';

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
      let url = '';
      const value = localStorage.getItem('searchValue');
      setisLoading(true);

      value && value.length > 0
        ? (url = `${BASE_URL}/character/?name=${value}`)
        : (url = `${BASE_URL}/character/?page=${page}`);
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
    <>
      <div className="container">
        <ErrorBoundary>
          <TestErrorButton />
          <Context.Provider value={{ page, setPage, setCount }}>
            <Searching getSearchData={getSearchData} />
            <Routes>
              <Route path="/*" element={<Main data={data} isLoading={isLoading} />} />
              <Route path={`/search/`} element={<Main data={data} isLoading={isLoading} />}>
                <Route path={`/search/details/`} element={<Info />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Context.Provider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
