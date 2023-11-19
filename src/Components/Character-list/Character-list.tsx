import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/slices/hooks';
import { useDispatch } from 'react-redux';
import { setMainIsLoading, setViewMode } from '../../store/slices/dataSlice';
import { useFetchDataByValueQuery } from '../../api/rtkq-api';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDetailsOpen = window.location.pathname.includes('details');
  const [pageQuery] = useSearchParams();
  const count = pageQuery.get('count');
  const page = useAppSelector((state) => state.data.page);
  const countPerPage = useAppSelector((state) => state.data.countPerPage);
  const query = useAppSelector((state) => state.data.query);
  const { data, isLoading, error } = useFetchDataByValueQuery(query);
  const results = data ? data.results : [];
  results.slice(0, +countPerPage);

  const handlerCloseInfo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('character-list'))
      navigate(`/search/?page=${page}&count=${count}`);
  };

  useEffect(() => {
    dispatch(setViewMode(isDetailsOpen));
    dispatch(setMainIsLoading(isLoading));
  }, [dispatch, isDetailsOpen, isLoading, data, countPerPage, query]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="main-container">
        <section
          className="character-list"
          data-testid="character-list"
          onClick={(event) => handlerCloseInfo(event)}
        >
          {!error && results.length > 0 ? (
            results
              .slice(0, +countPerPage)
              .map((character) => <Card key={character.id} RickandmortyData={character} />)
          ) : (
            <h2>Character not found</h2>
          )}
        </section>
        <Outlet />
      </div>

      <Pagination />
    </>
  );
};

export default CharacterList;
