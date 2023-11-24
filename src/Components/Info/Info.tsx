import React from 'react';
import styles from './Info.module.scss';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { useFetchRickandmortyDetailsQuery } from '../../api/rtkq-api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDetailesIsLoading } from '../../store/slices/dataSlice';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/slices/hooks';
import { InfoProps } from '@/types/common-types';

const Info: React.FC<InfoProps> = ({ details }) => {
  const data = details;
  const dispatch = useDispatch();
  const router = useRouter();
  // const count = router.query.count;
  const count = useAppSelector((state) => state.data.countPerPage);
  const id = router.query?.id || 0;
  // const currentPage = router.query.currentPage;
  const currentPage = useAppSelector((state) => state.data.page);

  // const { data, isLoading } = useFetchRickandmortyDetailsQuery(+id, {
  //   skip: Boolean(id) === false,
  // });
  const { isLoading } = useFetchRickandmortyDetailsQuery(+id, {
    skip: Boolean(id) === false,
  });

  const handlerCloseButton = () => {
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
        <Button style="close-button" dataTestid="close-button" onClick={handlerCloseButton}>
          {'X'}
        </Button>
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
