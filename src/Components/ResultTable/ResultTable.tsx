import styles from './style.module.scss';
import React from 'react';
import { ResultData } from '../../store/types';

type ResultTablePropsType = {
  data: ResultData;
  blockStyles: string;
};

const ResultTable: React.FC<ResultTablePropsType> = ({ data, blockStyles }) => {
  const nameRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className={`${styles['result-container']}`}>
        <div></div>
        <div className={`${styles['result-table']} ${blockStyles}`}>
          <h3 ref={nameRef}>name: {data.name}</h3>
          <h3>age: {data.age}</h3>
          <h3>email: {data.email}</h3>
          <h3>password: {data.password}</h3>
          <h3>password_repeat: {data.password_repeat}</h3>
          <h3>gender: {data.gender}</h3>
          <h3>accept: {data.accept === true ? 'yes' : 'no'}</h3>
          <h3>country: {data.country}</h3>
          <div className={styles['picture-block']}>
            <div>
              <h3>picture: </h3>
            </div>
            <div>
              <img className={styles['picture']} src={data.picture} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultTable;
