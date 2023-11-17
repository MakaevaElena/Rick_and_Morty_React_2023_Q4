import React from 'react';
import './style.scss';
import Loader from '../Loader/Loader';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import { Link, useSearchParams } from 'react-router-dom';
import { CardProps } from './types';
import { useAppSelector } from '../../store/slices/hooks';

const Card: React.FC<CardProps> = (props) => {
  const cardIsLoading = useAppSelector((state) => state.data.cardIsLoading);
  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page');
  const count = pageQuery.get('count') || DEFAULT_COUNT;

  const newPage = page ? page : DEFAULT_PAGE;

  return cardIsLoading ? (
    <Loader />
  ) : (
    <div className="card">
      <Link
        data-testid="card"
        to={`/search/details/?page=${newPage}&count=${count}&id=${props.RickandmortyData.id}`}
      >
        <h3>{props.RickandmortyData.name}</h3>
        <img
          className="character-img"
          src={props.RickandmortyData.image ? props.RickandmortyData.image : ''}
          alt="character-img"
        />
        <div className="stats">
          <li> species: {props.RickandmortyData.species}</li>
          <li> gender: {props.RickandmortyData.gender}</li>
        </div>
      </Link>
    </div>
  );
};

export default Card;
