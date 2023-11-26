import styles from '@/styles/Home.module.css';
import { AppProps } from '../types/common-types';
import React from 'react';
import CharacterList from '../Components/Character-list/Character-list';
import { wrapper } from '@/store/store';
import { fetchDataByValue, getRunningQueriesThunk } from '@/api/rtkq-api';

const Home: React.FC<AppProps> = ({ searchedList }) => {
  return (
    <div className={styles['container']}>
      <CharacterList characterList={searchedList} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const serchValue = context.query.searchValue;
  const { data: searchedList } = await store.dispatch(
    fetchDataByValue.initiate({
      type: 'searchValue',
      value: serchValue && typeof serchValue === 'string' ? serchValue : '',
    })
  );

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: { searchedList },
  };
});

export default Home;
