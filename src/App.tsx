import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import CharacterList from './Components/CharacterList/CharacterList';
import Searching from './Components/Searching/Searching';
import { Rickandmorty } from './types/rickandmorty-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import TestErrorButton from './Components/TestErrorButton/TestErrorButton';
import { BASE_URL } from './constants';
import { AppProps } from './types/common-types';

const App: React.FC<AppProps> = () => {
  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  // const [nextUrl, setnextUrl] = useState<string>('');
  // const [prevUrl, setprevUrl] = useState<string>('');

  useEffect(() => {
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
    });
  }, []);

  async function fetchData() {
    let url = '';
    const value = localStorage.getItem('searchValue');
    setisLoading(true);

    value && value.length > 0
      ? (url = `${BASE_URL}/character/?name=${value}`)
      : (url = `${BASE_URL}/character`);
    try {
      const response = await axios.get(url);
      // this.setState({ nextUrl: response.data.next });
      // this.setState({ prevUrl: response.data.previous });
      setisLoading(false);
      return response.data.results;
    } catch {
      setisLoading(false);
      return [];
    }
  }

  const searchData = (searchingData: Rickandmorty[]) => {
    setData(searchingData);
  };

  return (
    <>
      <div className="container">
        <ErrorBoundary>
          <TestErrorButton />
          <ErrorBoundary>
            <Searching data={data} searchData={searchData} />
          </ErrorBoundary>

          <Routes>
            <Route path="/" element={<CharacterList data={data} isLoading={isLoading} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          {/* <ErrorBoundary>
            <CharacterList data={data} isLoading={isLoading} />
          </ErrorBoundary> */}
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
