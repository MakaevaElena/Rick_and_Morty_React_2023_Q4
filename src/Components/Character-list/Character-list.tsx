import { Outlet } from 'react-router-dom';
import styles from './CharacterList.module.scss';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/slices/hooks';
import { useDispatch } from 'react-redux';
import { setInit, setMainIsLoading, setViewMode } from '../../store/slices/dataSlice';
import { useFetchDataByValueQuery } from '../../api/rtkq-api';
import { useSearchParams } from 'next/navigation';
import { CharacterListProps } from './types';

const CharacterList: React.FC<CharacterListProps> = ({ children }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // if (typeof window !== 'undefined')
  let isDetailsOpen = false;
  if (typeof window !== 'undefined') {
    isDetailsOpen = window.location.pathname.includes('details');
  }
  const searchParams = useSearchParams();
  // const [pageQuery] = useSearchParams();
  const count = searchParams.get('count');

  const page = useAppSelector((state) => state.data.page);
  const countPerPage = useAppSelector((state) => state.data.countPerPage);
  const query = useAppSelector((state) => state.data.query);
  const init = useAppSelector((state) => state.data.init);
  const { data, isLoading, error } = useFetchDataByValueQuery(query);
  const results = data ? data.results : [];
  results.slice(0, +countPerPage);

  const handlerCloseInfo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('character-list'))
      // navigate(`/search/?page=${page}&count=${count}`);
      console.log('');
  };

  useEffect(() => {
    dispatch(setViewMode(isDetailsOpen));
    dispatch(setMainIsLoading(isLoading));
    if (init) {
      // navigate(`/search/?page=${page}&count=${countPerPage}`);
      dispatch(setInit(false));
    }
  }, [dispatch, isDetailsOpen, isLoading, data, countPerPage, query, init, page]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className={styles['main-container']}>
        <section
          className={styles['character-list']}
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
        {/* <Outlet /> */}
        {children}
      </div>

      <Pagination />
    </>
  );
};

export default CharacterList;
