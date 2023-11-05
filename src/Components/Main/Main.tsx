import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { MainProps } from '../../types/common-types';
import Pagination from '../Pagination/Pagination';

const Main: React.FC<MainProps> = (props) => {
  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page');
  const navigate = useNavigate();
  const count = pageQuery.get('count');

  const handlerCloseInfo = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('character-list'))
      navigate(`/search/?page=${page}&count=${count}`);
  };

  return props.isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Character List {props.data.length}</h2>
      <div className="main-container">
        <section className="character-list" onClick={(event) => handlerCloseInfo(event)}>
          {props.data.length > 0 ? (
            props.data.map((character) => <Card key={character.id} RickandmortyData={character} />)
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

export default Main;
