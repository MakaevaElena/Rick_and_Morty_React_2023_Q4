import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';
import './style.scss';
import Loader from '../Loader/Loader';
import { BASE_URL } from '../../constants';

interface Props {
  RickandmortyData: Rickandmorty;
}

const defaultDetails = {
  id: 1,
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: ['', ''],
  url: '',
  created: '',
};

const Card: React.FC<Props> = (props) => {
  const [data, setData] = useState(defaultDetails);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRickandmortyDetails(): Promise<Rickandmorty> {
      setisLoading(true);
      const response = await axios.get(`${BASE_URL}/character/${props.RickandmortyData.id}`);
      setisLoading(false);
      return response.data;
    }

    fetchRickandmortyDetails().then((details: Rickandmorty) => setData(details));
  }, [props.RickandmortyData.id]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="card">
        <h3>{props.RickandmortyData.name}</h3>
        <img className="character-img" src={data.image ? data.image : ''} alt="" />
        <div className="stats">
          <li> species: {data.species}</li>
          <li> gender: {data.gender}</li>
          <li> location: {data.location.name}</li>
        </div>
      </div>
    </>
  );
};

export default Card;
