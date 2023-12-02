import { useEffect } from 'react';
import { useAppSelector } from '../../store/slices/hooks';
import styles from './style.module.scss';
import React from 'react';

const ResultTable: React.FC = () => {
  const name = useAppSelector((state) => state.data.name);
  const age = useAppSelector((state) => state.data.age);
  const email = useAppSelector((state) => state.data.email);
  const password = useAppSelector((state) => state.data.password);
  const password_repeat = useAppSelector((state) => state.data.password_repeat);
  const gender = useAppSelector((state) => state.data.gender);
  const accept = useAppSelector((state) => state.data.accept);
  const picture = useAppSelector((state) => state.data.picture);
  const country = useAppSelector((state) => state.data.country);

  const nameRef = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    nameRef.current?.classList.add('changed');
  }, [name]);

  return (
    <>
      <h2 className={styles['result-title']}>What all cats dream about...</h2>
      <div className={styles['result-container']}>
        <div></div>
        <div className={styles['result-table']}>
          <h3 ref={nameRef}>name: {name}</h3>
          <h3>age: {age}</h3>
          <h3>email: {email}</h3>
          <h3>password: {password}</h3>
          <h3>password_repeat: {password_repeat}</h3>
          <h3>gender: {gender}</h3>
          <h3>accept: {accept === true ? 'yes' : 'no'}</h3>
          <h3>country: {country}</h3>
          <div className={styles['picture-block']}>
            <div>
              <h3>picture: </h3>
            </div>
            <div>
              <img className={styles['picture']} src={picture} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultTable;
