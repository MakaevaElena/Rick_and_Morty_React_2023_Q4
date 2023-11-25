import styles from '@/styles/Home.module.css';
import { AppProps } from '../types/common-types';
import React from 'react';
import CharacterList from '../Components/Character-list/Character-list';
import { wrapper } from '@/store/store';
import { fetchDataByPage, getRunningQueriesThunk } from '@/api/rtkq-api';

const Home: React.FC<AppProps> = ({ data }) => {
  return (
    <div className={styles['container']}>
      <CharacterList characterList={data} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // const id = context.query.id || '1';
  const page = context.query.page || '1';
  // const { data } = await store.dispatch(fetchRickandmortyDetails.initiate(+id));
  const { data } = await store.dispatch(fetchDataByPage.initiate(+page));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  // console.log('State on server', store.getState());
  // const state = store.getState();
  // console.log('state.data.query', state.data.query);
  return {
    // props: {},
    props: { data },
  };
  // });
});

export default Home;
