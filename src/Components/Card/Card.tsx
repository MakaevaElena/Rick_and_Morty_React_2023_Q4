import React from 'react';
import styles from './Card.module.scss';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import Link from 'next/link';
import { CardProps } from './types';
// import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/slices/hooks';

const Card: React.FC<CardProps> = (props) => {
  // const router = useRouter();
  // const searchValue = localStorage.getItem('searchValue');
  const searchValue = useAppSelector((state) => state.data.searchValue);
  // const searchValue = router.query?.searchValue;
  const codedSearchValue =
    searchValue && typeof searchValue === 'string' ? encodeURI(searchValue) : '';
  // const router = useRouter();
  // const page = router.query.page;

  const page = useAppSelector((state) => state.data.page);
  const newPage = page ? page : DEFAULT_PAGE;
  // const count = router.query.count || DEFAULT_COUNT;
  const count = useAppSelector((state) => state.data.countPerPage) || DEFAULT_COUNT;

  return (
    <div className={styles['card']}>
      <Link
        data-testid="card"
        href={`/search/details/?page=${newPage}&count=${count}&id=${props.RickandmortyData.id}${
          searchValue && `&searchValue=${codedSearchValue}`
        }`}
      >
        <h3>{props.RickandmortyData.name}</h3>
        <img
          className={styles['character-img']}
          src={props.RickandmortyData.image ? props.RickandmortyData.image : ''}
          alt="character-img"
        />
        <div className={styles['stats']}>
          <li> species: {props.RickandmortyData.species}</li>
          <li> gender: {props.RickandmortyData.gender}</li>
        </div>
      </Link>
    </div>
  );
};

export default Card;
