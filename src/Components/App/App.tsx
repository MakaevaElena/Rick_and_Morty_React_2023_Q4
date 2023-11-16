import { useState, useEffect } from 'react';
import './App.scss';
import CharacterList from '../Character-list/Character-list';
import Searching from '../Searching/Searching';
import { Rickandmorty } from '../../types/rickandmorty-types';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Info from '../Info/Info';
import { AppProps } from './types';
import Context from '../../context/context';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useAppSelector } from '../../store/slices/hooks';
import { useDispatch } from 'react-redux';
// import { setIsLoading } from '../../store/slices/dataSlice';
import { fetchDataByPage, fetchDataByValue } from '../../api/api';
import { setMainIsLoading } from '../../store/slices/dataSlice';
// import { DataState } from '../../store/slices/types';

const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Rickandmorty[]>([]);
  // const [isLoading, setisLoading] = useState<boolean>(false);
  // const isLoading = useAppSelector((state) => state.data.isLoading);

  const searchValue = useAppSelector((state) => state.data.searchValue);
  const page = useAppSelector((state) => state.data.page);
  const countPerPage = useAppSelector((state) => state.data.countPerPage);
  // const viewMode = useAppSelector((state) => state.data.viewMode);

  const value = localStorage.getItem('searchValue');

  useEffect(() => {
    dispatch(setMainIsLoading(true));
    if (value && value.length > 0) {
      fetchDataByValue(value).then((data: Rickandmorty[]) => {
        setData(data.slice(0, +countPerPage));
        dispatch(setMainIsLoading(false));
      });
    } else {
      fetchDataByPage(page).then((data: Rickandmorty[]) => {
        setData(data.slice(0, +countPerPage));
        dispatch(setMainIsLoading(false));
      });
    }
  }, [countPerPage, dispatch, page, value]);

  return (
    <div className="container">
      <ErrorButton />
      <Context.Provider value={{ data, setData }}>
        <Searching />
        <h3>SearchValue from Context: {searchValue || 'Empty'}</h3>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path={`/search/`} element={<CharacterList />}>
            <Route path={`/search/details/`} element={<Info />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
