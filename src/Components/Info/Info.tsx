import styles from './Info.module.scss';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useFetchRickandmortyDetailsQuery } from '../../api/rtkq-api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDetailesIsLoading } from '../../store/slices/dataSlice';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Info: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  // const [pageQuery] = useSearchParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 0;
  const currentPage = searchParams.get('page');
  const count = searchParams.get('count');

  const { data, isLoading } = useFetchRickandmortyDetailsQuery(+id, {
    skip: Boolean(id) === false,
  });

  const handlerCloseButton = () => {
    // navigate(`/search/?page=${currentPage}&count=${count}`);
    router.push(`/search/?page=${currentPage}&count=${count}`);
  };

  useEffect(() => {
    dispatch(setDetailesIsLoading(isLoading));
  }, [dispatch, isLoading]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles['info']} data-testid="info">
      <div className={styles['card']}>
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
          className={styles['character-img']}
          src={data?.image ? data.image : ''}
          alt="info-img"
        />
        <div className={styles['stats']}>
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
