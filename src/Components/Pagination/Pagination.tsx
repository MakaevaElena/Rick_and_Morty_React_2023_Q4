import React, { useEffect } from 'react';
import { DEFAULT_PAGE } from '../../constants';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { setMainIsLoading } from '../../store/slices/dataSlice';
import { useFetchDataByPageQuery } from '../../api/rtkq-api';
import { useSearchParams } from 'next/navigation';
import ButtonList from '../ButtonList/ButtonList';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || DEFAULT_PAGE;

  const { isLoading } = useFetchDataByPageQuery(+page);

  useEffect(() => {
    dispatch(setMainIsLoading(isLoading));
  }, [isLoading, dispatch]);

  return isLoading ? <Loader /> : <ButtonList />;
};

export default Pagination;
