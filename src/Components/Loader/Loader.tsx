import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return <div className={styles['loader']} data-testid="loader"></div>;
};

export default Loader;
