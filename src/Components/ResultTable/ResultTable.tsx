// import { useEffect } from 'react';
// import { useAppSelector } from '../../store/slices/hooks';
import styles from './style.module.scss';
import React from 'react';
import { ResultData } from '../../store/types';
// import { getBase64 } from '../../utils/getBase64';

type ResultTablePropsType = {
  data: ResultData;
  blockStyles: string;
};

const ResultTable: React.FC<ResultTablePropsType> = ({ data, blockStyles }) => {
  // const data = useAppSelector((state) => state.data.data);
  // const name = useAppSelector((state) => state.data.name);
  // const age = useAppSelector((state) => state.data.age);
  // const email = useAppSelector((state) => state.data.email);
  // const password = useAppSelector((state) => state.data.password);
  // const password_repeat = useAppSelector((state) => state.data.password_repeat);
  // const gender = useAppSelector((state) => state.data.gender);
  // const accept = useAppSelector((state) => state.data.accept);
  // const picture = useAppSelector((state) => state.data.picture);
  // const country = useAppSelector((state) => state.data.country);

  const nameRef = React.useRef<HTMLHeadingElement>(null);

  // useEffect(() => {
  //   nameRef.current?.classList.add('changed');
  // }, [name]);

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
              {/* <img className={styles['picture']} src={getBase64(data.picture[0])} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultTable;
