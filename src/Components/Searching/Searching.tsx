import React, { useEffect, useState } from 'react';
import styles from './Searching.module.scss';
import { DEFAULT_COUNT } from '../../constants';
import { useDispatch } from 'react-redux';
import { setQuery, setSearchValue } from '../../store/slices/dataSlice';
import { useAppSelector } from '../../store/slices/hooks';
import { useRouter } from 'next/router';

const Searching: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState('');
  const query = useAppSelector((state) => state.data.query);
  const count = useAppSelector((state) => state.data.countPerPage) || DEFAULT_COUNT;
  // const count = router.query.count || DEFAULT_COUNT;
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const searchButtonRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const value = localStorage.getItem('searchValue');

    if (value) {
      setValue(value);
      dispatch(setSearchValue(value));
    }

    if (query.type === 'changePage') {
      setValue('');
      localStorage.setItem('searchValue', '');
      dispatch(setSearchValue(''));
    }
  }, [dispatch, query.type]);

  function handleSearchClick() {
    localStorage.setItem('searchValue', value);
    dispatch(setSearchValue(value));
    // router.push(`/search/?page=1&count=${count}`);
    router.push(`/search/?page=1&count=${count}&search=${value}`);
    const query = { type: 'searchValue', value: value };
    dispatch(setQuery(query));
  }

  function handleChange(evt: React.FormEvent<HTMLInputElement>) {
    if (evt?.target instanceof HTMLInputElement) {
      validateInputValue(evt?.target);
      setValue(evt?.target.value);
      dispatch(setSearchValue(evt?.target.value));
    }
  }

  function validateInputValue(input: HTMLInputElement) {
    const checkWhiteSpace = /^\s|\s$/;
    const VALUE_CONTAIN_WHITESPACE = `Searching must not contain leading or trailing whitespace.`;
    switch (true) {
      case checkWhiteSpace.test(input.value):
        input.setCustomValidity(VALUE_CONTAIN_WHITESPACE);
        searchButtonRef.current?.classList.add('disable');
        break;

      default:
        input.setCustomValidity('');
        searchButtonRef.current?.classList.remove('disable');
        return true;
    }

    input.reportValidity();

    return false;
  }

  return (
    <>
      <h2>Rick and Morty</h2>
      <section className={styles['character-searching']}>
        <form className={styles['form']}>
          <input
            ref={inputRef}
            className={styles['search-input']}
            type="text"
            placeholder="search..."
            value={value}
            onChange={handleChange}
          />
          <div
            data-testid="search-button"
            className={styles['search-button']}
            onClick={handleSearchClick}
            ref={searchButtonRef}
          ></div>
        </form>
      </section>
    </>
  );
};

export default Searching;
