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
import { useParams } from 'react-router-dom';

const App: React.FC<AppProps> = () => {
  const { page } = useParams<{ page: string }>();

  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (page)
      fetchData(+page).then((data: Rickandmorty[]) => {
        setData(data);
      });
  }, [page]);

  async function fetchData(page?: number) {
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

  const searchData = (searchingData: Rickandmorty[]) => {
    setData(searchingData);
  };

  return (
    <>
      <div className="container">
        <ErrorBoundary>
          <TestErrorButton />

          <Searching data={data} searchData={searchData} />

          <CharacterList data={data} isLoading={isLoading} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
