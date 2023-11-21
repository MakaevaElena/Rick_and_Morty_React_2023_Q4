import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { AppProps } from './types';
import React from 'react';
import Searching from '../Components/Searching/Searching';
import CharacterList from '../Components/Character-list/Character-list';
import { useAppSelector } from '../store/slices/hooks';

const Home: React.FC<AppProps> = () => {
  // const searchValue = useAppSelector((state) => state.data.searchValue);
  // const countPerPage = useAppSelector((state) => state.data.countPerPage);
  // const viewMode = useAppSelector((state) => state.data.viewMode);

  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <div className={styles['container']}>
        {/* <Searching />
        <div className="info-from-store">
          <h4>SearchValue from Store: {searchValue || 'Empty'}</h4>
          <h4>CountPerPage from Store: {countPerPage || 'Empty'}</h4>
          <h4>ViewMode from Store: {`${viewMode}` || 'Empty'}</h4>
        </div> */}

        <CharacterList />
      </div>
    </>
  );
};

export default Home;
