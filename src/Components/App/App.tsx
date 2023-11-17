import './App.scss';
import CharacterList from '../Character-list/Character-list';
import Searching from '../Searching/Searching';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Info from '../Info/Info';
import { AppProps } from './types';
import ErrorButton from '../ErrorButton/ErrorButton';
import { useAppSelector } from '../../store/slices/hooks';

const App: React.FC<AppProps> = () => {
  const searchValue = useAppSelector((state) => state.data.searchValue);

  return (
    <div className="container">
      <ErrorButton />
      <Searching />
      <h3>SearchValue from Context: {searchValue || 'Empty'}</h3>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path={`/search/`} element={<CharacterList />}>
          <Route path={`/search/details/`} element={<Info />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
