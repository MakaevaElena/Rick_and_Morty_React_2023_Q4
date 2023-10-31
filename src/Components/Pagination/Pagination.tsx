import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import './style.scss';
import { Rickandmorty } from '../../types/rickandmorty-types';
import axios from 'axios';
// import { PaginationProps } from '../../types/common-types';

// const Pagination: React.FC<PaginationProps> = (props) => {
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
          <div key={i} className="pagination-button">
            <p>{i}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pagination;
