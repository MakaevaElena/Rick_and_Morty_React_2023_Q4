import React, { useEffect, useState } from 'react';
import './style.scss';
import Loader from '../Loader/Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_DETAILS } from '../../constants';
import { Rickandmorty } from '../../types/rickandmorty-types';
import Button from '../Button/Button';
import { fetchRickandmortyDetails } from '../../api/api';

const Info: React.FC = () => {
  const navigate = useNavigate();
  const [pageQuery] = useSearchParams();
  const id = pageQuery.get('id');
  const currentPage = pageQuery.get('page');
  const count = pageQuery.get('count');

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState(DEFAULT_DETAILS);

  useEffect(() => {
    setisLoading(true);
    if (id) {
      fetchRickandmortyDetails(+id).then((details: Rickandmorty) => {
        setisLoading(false);
        setData(details);
      });
    } else {
      fetchRickandmortyDetails(0).then((details: Rickandmorty) => {
        setisLoading(false);
        setData(details);
      });
    }
  }, [id]);

  const handlerCloseButton = () => {
    navigate(`/search/?page=${currentPage}&count=${count}`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="info" data-testid="info">
      <div className="card">
        <Button data-testid="close-button" children="Close" onClick={handlerCloseButton} />
        <h2>Info about: </h2>
        <h3>{data.name}</h3>
        <img
          data-testid="info-img"
          className="character-img"
          src={data.image ? data.image : ''}
          alt="info-img"
        />
        <div className="stats">
          <li data-testid="species"> species: {data.species}</li>
          <li data-testid="gender"> gender: {data.gender}</li>
          <li data-testid="status"> status: {data.status}</li>
          <li data-testid="location"> location: {data.location.name}</li>
          <li data-testid="type"> type: {data.type}</li>
          <li data-testid="created"> created: {data.created}</li>
        </div>
      </div>
    </div>
  );
};

export default Info;
