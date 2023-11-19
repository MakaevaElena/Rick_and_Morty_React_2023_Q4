import React, { useEffect, useState } from 'react';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import './style.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { setCountPerPage, setMainIsLoading, setPage, setQuery } from '../../store/slices/dataSlice';
import { useFetchDataByPageQuery } from '../../api/rtkq-api';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageQuery] = useSearchParams();
  const page = pageQuery.get('page') || DEFAULT_PAGE;
  const countPerPage = pageQuery.get('count') || DEFAULT_COUNT;

  const { data, isLoading } = useFetchDataByPageQuery(+page);
  const [selectedValue, setSelectedValue] = useState<string>(DEFAULT_COUNT);

  useEffect(() => {
    if (page) dispatch(setPage(+page));
    setSelectedValue(countPerPage);
    const query = { type: 'changePage', value: page };
    dispatch(setQuery(query));
    dispatch(setMainIsLoading(isLoading));
  }, [countPerPage, dispatch, isLoading, page]);

  function getClassName(i: number) {
    if (page && +page === i + 1) {
      return 'chosen_button';
    }
    return '';
  }

  const handleChangeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) {
      dispatch(setCountPerPage(event.target.value));
      dispatch(setPage(page));
      navigate(`/search/?page=${DEFAULT_PAGE}&count=${event.target.value}`);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pagination">
      <h2>Pagination</h2>
      <select
        value={selectedValue}
        data-testid="select"
        className="change-count-select"
        onChange={handleChangeCount}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <div className="pagination-buttons">
        {data?.results.map((_, i) => (
          <Link
            data-testid={i}
            aria-current="page"
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
