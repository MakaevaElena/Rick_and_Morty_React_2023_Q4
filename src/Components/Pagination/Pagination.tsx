import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pagination: React.FC = () => {
  const [data, setData] = useState<Rickandmorty[]>([]);

  useEffect(() => {
    fetchData().then((data: Rickandmorty[]) => {
      setData(data);
    });
  }, []);

  async function fetchData() {
    const response = await axios.get(`${BASE_URL}/character`);
    return response.data.results;
  }

  return (
    <>
      <h2>Pagination</h2>
      <div className="pagination-buttons">
        {data.map((_, i) => (
          <Link key={i + 1} to={`/search/${i + 1}`} className="pagination-button">
            <div key={i + 1} id={`${i + 1}`}>
              {i + 1}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pagination;
