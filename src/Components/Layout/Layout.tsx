import React from 'react';
import { AppProps } from './types';
import Searching from '../Searching/Searching';
import { useAppSelector } from '../../store/slices/hooks';
import styles from './Layout.module.scss';

const Layout: React.FC<AppProps> = ({ children }) => {
  const searchValue = useAppSelector((state) => state.data.searchValue);
  const countPerPage = useAppSelector((state) => state.data.countPerPage);
  const viewMode = useAppSelector((state) => state.data.viewMode);

  return (
    <div className="container">
      <Searching />
      <div className={styles['info-from-store']}>
        <h4>SearchValue: {searchValue || 'Empty'}</h4>
        <h4>CountPerPage: {countPerPage || 'Empty'}</h4>
        <h4>ViewMode: {`${viewMode}` || 'Empty'}</h4>
      </div>
      {children}
    </div>
  );
};

export default Layout;
