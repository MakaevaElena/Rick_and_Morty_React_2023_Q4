import React from 'react';
import styles from './Card.module.scss';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CardProps } from './types';

const Card: React.FC<CardProps> = (props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const count = searchParams.get('count') || DEFAULT_COUNT;

  const newPage = page ? page : DEFAULT_PAGE;

  return (
    <div className={styles['card']}>
      <Link
        data-testid="card"
        href={`/search/details/?page=${newPage}&count=${count}&id=${props.RickandmortyData.id}`}
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
