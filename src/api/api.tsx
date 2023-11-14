import axios from 'axios';
import { BASE_URL } from '../constants';
import { Rickandmorty } from '../types/rickandmorty-types';

export async function fetchRickandmortyDetails(id: number): Promise<Rickandmorty> {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data;
}

export async function fetchAllData() {
  const response = await axios.get(`${BASE_URL}/character`);
  return response.data.results;
}

export async function fetchDataByPage(page: number) {
  try {
    const response = await axios.get(`${BASE_URL}/character/?page=${page}`);
    return response.data.results;
  } catch {
    return [];
  }
}

export async function fetchDataByValue(value: string) {
  try {
    const response = await axios.get(`${BASE_URL}/character/?name=${value}`);
    return response.data.results;
  } catch {
    return [];
  }
}

// export async function fetchData() {
//   const response = await axios.get(`${BASE_URL}/character/?name=${value}`);
//   const arr: Rickandmorty[] = [];
//   arr.push(...response.data.results);
//   setData(arr);
// }
