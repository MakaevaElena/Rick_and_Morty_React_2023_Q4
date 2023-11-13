import React, { useEffect, useState } from 'react';
import { BASE_URL, DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
// import Context from '../../context/context';
import { useDispatch } from 'react-redux';
import { setCount, setPage } from '../../store/slices/dataSlice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { setPage } = useContext(Context);
  // const { setCount } = useContext(Context);

  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page') || DEFAULT_PAGE;
  const countPerPage = pageQuery.get('count') || DEFAULT_COUNT;

  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(DEFAULT_COUNT);

  useEffect(() => {
    if (countPerPage) setSelectedValue(countPerPage);
    setisLoading(true);
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
      setisLoading(false);
    });
  }, [countPerPage]);

  async function fetchData() {
    const response = await axios.get(`${BASE_URL}/character`);
    return response.data.results;
  }

  useEffect(() => {
    // if (page) setPage(+page);
    if (page) dispatch(setPage(+page));
  }, [dispatch, page]);

  function getClassName(i: number) {
    if (page && +page === i + 1) {
      return 'chosen_button';
    }
    return '';
  }

  const handleChangeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) {
      // setCount(event.target.value);
      dispatch(setCount(event.target.value));
      navigate(`/search/?page=${DEFAULT_PAGE}&count=${event.target.value}`);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pagination">
      <h2>Pagination</h2>
      <select value={selectedValue} className="change-count-select" onChange={handleChangeCount}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <div className="pagination-buttons">
        {data.map((_, i) => (
          <Link
            data-testid={i}
            key={i + 1}
            to={`/search/?page=${i + 1}&count=${countPerPage}`}
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
