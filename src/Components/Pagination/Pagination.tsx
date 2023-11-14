import React, { useEffect, useState } from 'react';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
// import Context from '../../context/context';
import { useDispatch } from 'react-redux';
import { setCount, setPage } from '../../store/slices/dataSlice';
import { fetchAllData } from '../../api/api';
// import { useAppSelector } from '../../store/slices/hooks';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page') || DEFAULT_PAGE;
  const countPerPage = pageQuery.get('count') || DEFAULT_COUNT;

  const [data, setData] = useState<Rickandmorty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(DEFAULT_COUNT);

  // const isLoading = useAppSelector((state) => state.data.isLoading);

  useEffect(() => {
    if (countPerPage) setSelectedValue(countPerPage);
    setIsLoading(true);
    // dispatch(setIsLoading(true));
    fetchAllData().then((data: Rickandmorty[]) => {
      setData(data);
      setIsLoading(false);
      // dispatch(setIsLoading(false));
    });
  }, [countPerPage, dispatch]);

  useEffect(() => {
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
