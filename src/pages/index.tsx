import styles from '@/styles/Home.module.css';
import { AppProps } from '../types/common-types';
import React from 'react';
import CharacterList from '../Components/Character-list/Character-list';

const Home: React.FC<AppProps> = () => {
  return (
    <div className={styles['container']}>
      <CharacterList />
    </div>
  );
};

export default Home;
