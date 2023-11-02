import React, { useEffect, useState } from 'react';
import './style.scss';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, DEFAULT_DETAILS } from '../../constants';
import { Rickandmorty } from '../../types/rickandmorty-types';

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // console.log('id', id);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState(DEFAULT_DETAILS);

  useEffect(() => {
    async function fetchRickandmortyDetails(): Promise<Rickandmorty> {
      setisLoading(true);
      const response = await axios.get(`${BASE_URL}/character/${id}`);
      setisLoading(false);
      return response.data;
    }

    fetchRickandmortyDetails().then((details: Rickandmorty) => setData(details));
  }, [id]);

  

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="card info">
        <h2>Info about: </h2>
        <h3>{data.name}</h3>
        <img className="character-img" src={data.image ? data.image : ''} alt="" />
        <div className="stats">
          <li> species: {data.species}</li>
          <li> gender: {data.gender}</li>
          <li> status: {data.status}</li>
          <li> location: {data.location.name}</li>
          <li> type: {data.type}</li>
          <li> created: {data.created}</li>
        </div>
      </div>
    </>
  );
};

export default Info;
