import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import CharacterList from './Components/CharacterList/CharacterList';
import Searching from './Components/Searching/Searching';
import { Rickandmorty } from './types/rickandmorty-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from './Components/TestErrorButton/TestErrorButton';
import { BASE_URL } from './constants';
import { AppProps } from './types/common-types';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Info from './Components/Info/Info';
import { createContext } from 'react';
// import BodyContent from './Components/BodyContent';

interface IContext {
  page: string;
  setPage: (c: string) => void;
}

export const Context = createContext<IContext>({
  page: '',
  setPage: () => {},
});

const App: React.FC<AppProps> = () => {
  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [page, setPage] = useState('');

  const getSearchData = (searchingData: Rickandmorty[]) => {
    setData(searchingData);
  };

  useEffect(() => {
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
    });

    async function fetchData() {
      let url = '';
      const value = localStorage.getItem('searchValue');
      setisLoading(true);

      value && value.length > 0
        ? (url = `${BASE_URL}/character/?name=${value}`)
        : (url = `${BASE_URL}/character/?page=${page}`);
      // url = `${BASE_URL}/character`;
      try {
        const response = await axios.get(url);

        setisLoading(false);
        return response.data.results;
      } catch {
        setisLoading(false);
        return [];
      }
    }
  }, [page]);

  return (
    <>
      <div className="container">
        <ErrorBoundary>
          <TestErrorButton />
          <Context.Provider value={{ page, setPage }}>
            <Searching getSearchData={getSearchData} />

            {/* <BrowserRouter> */}
            <Routes>
              <Route path="/" element={<CharacterList data={data} isLoading={isLoading} />} />

              <Route
                path="/search/:page"
                element={<CharacterList data={data} isLoading={isLoading} />}
              >
                <Route path="/search/:page/:id" element={<Info />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* </BrowserRouter> */}
          </Context.Provider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
