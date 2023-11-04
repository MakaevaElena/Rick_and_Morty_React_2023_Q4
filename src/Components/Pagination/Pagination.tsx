import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Context } from '../../App';

const Pagination: React.FC = () => {
  // const { page } = useParams<{ page: string }>();

  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(20);

  const { setPage } = useContext(Context);

  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page');

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
  }, [page, setPage, count]);

  function getClassName(i: number) {
    if (page && +page === i + 1) {
      return 'chosen_button';
    }
    return '';
  }

  const handleChangeCount = (event: React.MouseEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) setCount(+event.target.value);
  };

  const handleSubmitCount = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setData(data.slice(0, count));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pagination">
      <h2>Pagination</h2>
      <label>
        <select onChange={() => handleChangeCount}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>
      <input type="submit" value="Submit" onClick={() => handleSubmitCount} />

      <div className="pagination-buttons">
        {data.map((_, i) => (
          <Link
            key={i + 1}
            // to={`/search/${i + 1}`}
            to={`/search/?page=${i + 1}`}
            className={`pagination-button ${getClassName(i)}`}
          >
            <div key={i + 1} id={`${i + 1}`}>
              {i + 1}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
