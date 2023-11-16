import React, { useEffect, useState } from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';
import './style.scss';
import Loader from '../Loader/Loader';
import { DEFAULT_COUNT, DEFAULT_DETAILS, DEFAULT_PAGE } from '../../constants';
import { Link, useSearchParams } from 'react-router-dom';
import { CardProps } from './types';
import { fetchRickandmortyDetails } from '../../api/api';
import { useAppSelector } from '../../store/slices/hooks';

const Card: React.FC<CardProps> = (props) => {
  const [data, setData] = useState(DEFAULT_DETAILS);
  const isLoading = useAppSelector((state) => state.data.isLoading);
  // const viewMode = useAppSelector((state) => state.data.viewMode);

  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page');
  const count = pageQuery.get('count') || DEFAULT_COUNT;

  const newPage = page ? page : DEFAULT_PAGE;

  useEffect(() => {
    fetchRickandmortyDetails(props.RickandmortyData.id).then((details: Rickandmorty) => {
      setData(details);
    });
  }, [props.RickandmortyData.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="card">
      <Link data-testid="card" to={`/search/details/?page=${newPage}&count=${count}&id=${data.id}`}>
        <h3>{data.name}</h3>
        <img className="character-img" src={data.image ? data.image : ''} alt="character-img" />
        <div className="stats">
          <li> species: {data.species}</li>
          <li> gender: {data.gender}</li>
        </div>
      </Link>
    </div>
  );
};

export default Card;
