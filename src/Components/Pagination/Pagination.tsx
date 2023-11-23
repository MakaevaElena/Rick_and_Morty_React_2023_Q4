import React, { useEffect } from 'react';
import { DEFAULT_PAGE } from '../../constants';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { setMainIsLoading } from '../../store/slices/dataSlice';
import { useFetchDataByPageQuery } from '../../api/rtkq-api';
import ButtonList from '../ButtonList/ButtonList';
import { useRouter } from 'next/router';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const page = router.query.page || DEFAULT_PAGE;
  const { isLoading } = useFetchDataByPageQuery(+page);

  useEffect(() => {
    dispatch(setMainIsLoading(isLoading));
  }, [isLoading, dispatch]);

  return isLoading ? <Loader /> : <ButtonList />;
};

export default Pagination;
