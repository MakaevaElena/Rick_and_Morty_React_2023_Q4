import React, { useEffect } from 'react';
import { DEFAULT_COUNT, DEFAULT_PAGE } from '../../constants';
import styles from './ButtonList.module.scss';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCountPerPage, setMainIsLoading, setPage, setQuery } from '../../store/slices/dataSlice';
import { useFetchDataByPageQuery } from '../../api/rtkq-api';
import { useAppSelector } from '../../store/slices/hooks';
import { useRouter } from 'next/router';

const ButtonList: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const page = router.query?.page || DEFAULT_PAGE;
  const queryCountPerPage = router.query?.count || DEFAULT_COUNT;
  const countPerPage = useAppSelector((state) => state.data.countPerPage);

  const { data, isLoading } = useFetchDataByPageQuery(+page);
  // const [selectedValue, setSelectedValue] = useState<string>(DEFAULT_COUNT);

  useEffect(() => {
    if (page) dispatch(setPage(+page));
    // setSelectedValue(countPerPage);
    dispatch(setCountPerPage(queryCountPerPage));
    dispatch(setMainIsLoading(isLoading));
  }, [countPerPage, dispatch, isLoading, page, queryCountPerPage]);

  function getClassName(i: number) {
    if (page && +page === i + 1) {
      return 'chosen_button';
    }
    return '';
  }

  const handleChangeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target instanceof HTMLSelectElement) {
      dispatch(setPage(page));
      router.push(`/search/?page=${DEFAULT_PAGE}&count=${event.target.value}`);
      dispatch(setCountPerPage(event.target.value));
    }
  };

  function handleClickPage() {
    const query = { type: 'changePage', value: page };
    dispatch(setQuery(query));
    dispatch(setPage(page));
  }

  return (
    <div data-testid="button-list" className={styles['pagination']}>
      <h2>Pagination</h2>
      <select
        // value={selectedValue}
        value={queryCountPerPage}
        data-testid="select"
        className={styles['change-count-select']}
        onChange={handleChangeCount}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <div className={styles['pagination-buttons']}>
        {data?.results.map((_, i) => (
          <Link
            data-testid={i}
            aria-current="page"
            key={i + 1}
            onClick={handleClickPage}
            href={`/search/?page=${i + 1}&count=${countPerPage}`}
            className={`${styles['pagination-button']} ${styles[getClassName(i)]}`}
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

export default ButtonList;
