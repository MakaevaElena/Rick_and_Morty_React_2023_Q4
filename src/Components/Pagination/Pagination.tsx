import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Context } from '../../App';

const Pagination: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const { setPage } = useContext(Context);

  useEffect(() => {
    setisLoading(true);
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
      setisLoading(false);
    });
  }, []);

  async function fetchData() {
    const response = await axios.get(`${BASE_URL}/character`);
    return response.data.results;
  }

  //https://dev.to/madv/usecontext-with-typescript-23ln
  useEffect(() => {
    if (page) setPage(page);
  }, [page, setPage]);

  function getClassName(i: number) {
    if (page && +page === i + 1) {
      return 'chosen_button';
    }
    return '';
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h2>Pagination</h2>
      <div className="pagination-buttons">
        {data.map((_, i) => (
          <Link
            key={i + 1}
            to={`/search/${i + 1}`}
            className={`pagination-button ${getClassName(i)}`}
          >
            <div key={i + 1} id={`${i + 1}`}>
              {i + 1}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pagination;
