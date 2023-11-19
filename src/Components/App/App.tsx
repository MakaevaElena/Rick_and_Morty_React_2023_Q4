import './App.scss';
import CharacterList from '../Character-list/Character-list';
import Searching from '../Searching/Searching';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Info from '../Info/Info';
import { AppProps } from './types';
import { useAppSelector } from '../../store/slices/hooks';

const App: React.FC<AppProps> = () => {
  const searchValue = useAppSelector((state) => state.data.searchValue);
  const countPerPage = useAppSelector((state) => state.data.countPerPage);
  const viewMode = useAppSelector((state) => state.data.viewMode);

  return (
    <div className="container">
      <Searching />
      <div className="info-from-store">
        <h4>SearchValue from Store: {searchValue || 'Empty'}</h4>
        <h4>CountPerPage from Store: {countPerPage || 'Empty'}</h4>
        <h4>ViewMode from Store: {`${viewMode}` || 'Empty'}</h4>
      </div>
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
