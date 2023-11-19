import './style.scss';
import Loader from '../Loader/Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../Button/Button';
import { useFetchRickandmortyDetailsQuery } from '../../api/rtkq-api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDetailesIsLoading } from '../../store/slices/dataSlice';

const Info: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageQuery] = useSearchParams();
  const id = pageQuery.get('id') || 0;
  const currentPage = pageQuery.get('page');
  const count = pageQuery.get('count');

  const { data, isLoading } = useFetchRickandmortyDetailsQuery(+id, {
    skip: Boolean(id) === false,
  });

  const handlerCloseButton = () => {
    navigate(`/search/?page=${currentPage}&count=${count}`);
  };

  useEffect(() => {
    dispatch(setDetailesIsLoading(isLoading));
  }, [dispatch, isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="info" data-testid="info">
      <div className="card">
        <Button
          style="close-button"
          dataTestid="close-button"
          children="X"
          onClick={handlerCloseButton}
        />
        <h2>Info about: </h2>
        <h3>{data?.name}</h3>
        <img
          data-testid="info-img"
          className="character-img"
          src={data?.image ? data.image : ''}
          alt="info-img"
        />
        <div className="stats">
          <li data-testid="species"> species: {data?.species}</li>
          <li data-testid="gender"> gender: {data?.gender}</li>
          <li data-testid="status"> status: {data?.status}</li>
          <li data-testid="location"> location: {data?.location.name}</li>
          <li data-testid="type"> type: {data?.type}</li>
          <li data-testid="created"> created: {data?.created}</li>
        </div>
      </div>
    </div>
  );
};

export default Info;
