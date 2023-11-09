import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { Rickandmorty } from '../../types/rickandmorty-types';
import { BASE_URL, DEFAULT_COUNT } from '../../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from '../../context/context';

const Searching: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [pageQuery] = useSearchParams();
  const count = pageQuery.get('count') || DEFAULT_COUNT;
  const { searchValue, setSearchValue } = useContext(Context);
  const { setData } = useContext(Context);

  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const searchButtonRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const value = localStorage.getItem('searchValue');
    if (value) {
      setValue(value);
    }
  }, [searchValue]);

  async function fetchData() {
    const response = await axios.get(`${BASE_URL}/character/?name=${value}`);
    const arr: Rickandmorty[] = [];
    arr.push(...response.data.results);
    setData(arr);
  }

  function handleSearchClick() {
    fetchData().catch(() => setData([]));
    localStorage.setItem('searchValue', value);
    setSearchValue(value);
    navigate(`/search/?page=1&count=${count}`);
  }

  function handleChange(evt: React.FormEvent<HTMLInputElement>) {
    if (evt?.target instanceof HTMLInputElement) {
      validateInputValue(evt?.target);
      setValue(evt?.target.value);
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
      <h2>Searching</h2>
      <section className="character-searching">
        <form>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="search..."
            value={value}
            onChange={handleChange}
          />
          <div data-testid="search-button" className="search-button" onClick={handleSearchClick} ref={searchButtonRef}></div>
        </form>
      </section>
    </>
  );
};

export default Searching;
