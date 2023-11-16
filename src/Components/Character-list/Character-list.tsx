import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useContext, useEffect } from 'react';
import Context from '../../context/context';
import { useAppSelector } from '../../store/slices/hooks';
import { useDispatch } from 'react-redux';
import { setViewMode } from '../../store/slices/dataSlice';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const [pageQuery] = useSearchParams();
  const { data } = useContext(Context);
  const page = pageQuery.get('page');
  const navigate = useNavigate();
  const count = pageQuery.get('count');

  const isLoading = useAppSelector((state) => state.data.isLoading);
  const isDetailsOpen = window.location.pathname.includes('details');
  console.log(isDetailsOpen);

  const handlerCloseInfo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('character-list'))
      navigate(`/search/?page=${page}&count=${count}`);
  };

  useEffect(() => {
    dispatch(setViewMode(isDetailsOpen));
  }, [dispatch, isDetailsOpen]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Character List {data.length}</h2>
      <div className="main-container">
        <section
          className="character-list"
          data-testid="character-list"
          onClick={(event) => handlerCloseInfo(event)}
        >
          {data.length > 0 ? (
            data.map((character) => <Card key={character.id} RickandmortyData={character} />)
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
