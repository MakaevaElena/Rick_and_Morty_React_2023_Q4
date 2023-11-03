import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Rickandmorty } from '../../types/rickandmorty-types';
import './style.scss';
import Loader from '../Loader/Loader';
import { BASE_URL, DEFAULT_DETAILS } from '../../constants';
import { Link, useParams } from 'react-router-dom';

interface Props {
  RickandmortyData: Rickandmorty;
}

const Card: React.FC<Props> = (props) => {
  const { page } = useParams<{ page: string }>();
  const [data, setData] = useState(DEFAULT_DETAILS);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const newPage = page ? page : 1;

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
        <Link to={`/search/${newPage}/${data.id}`}>
          <h3>{props.RickandmortyData.name}</h3>
          <img className="character-img" src={data.image ? data.image : ''} alt="" />
          <div className="stats">
            <li> species: {data.species}</li>
            <li> gender: {data.gender}</li>
            {/* <li> location: {data.location.name}</li> */}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
