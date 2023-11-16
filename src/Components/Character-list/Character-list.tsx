import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/slices/hooks';
import { useDispatch } from 'react-redux';
import { setViewMode } from '../../store/slices/dataSlice';
import { useFetchDataByValueQuery } from '../../api/rtkq-api';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const [pageQuery] = useSearchParams();

  // const page = pageQuery.get('page');
  const page = useAppSelector((state) => state.data.page);
  const navigate = useNavigate();
  const count = pageQuery.get('count');

  // const searchValue = useAppSelector((state) => state.data.searchValue);
  const searchValue = localStorage.getItem('searchValue') || '';
  // const { data } = useFetchAllDataQuery(undefined, { skip: Boolean(searchValue) === true });
  // const { data } = useFetchDataByValueQuery(searchValue, { skip: Boolean(searchValue) === false });

  const query = { type: 'searchValue', value: searchValue };
  // query = { type: 'changePage', value: page.toString() };
  const { data } = useFetchDataByValueQuery(query);

  const mainIsLoading = useAppSelector((state) => state.data.mainIsLoading);
  const isDetailsOpen = window.location.pathname.includes('details');

  const handlerCloseInfo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('character-list'))
      navigate(`/search/?page=${page}&count=${count}`);
  };

  useEffect(() => {
    dispatch(setViewMode(isDetailsOpen));
  }, [dispatch, isDetailsOpen]);

  return mainIsLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Character List {data?.results.length}</h2>
      <div className="main-container">
        <section
          className="character-list"
          data-testid="character-list"
          onClick={(event) => handlerCloseInfo(event)}
        >
          {data && data?.results.length > 0 ? (
            data?.results.map((character) => (
              <Card key={character.id} RickandmortyData={character} />
            ))
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
