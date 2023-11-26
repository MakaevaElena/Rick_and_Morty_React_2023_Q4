export type Rickandmorty = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
};

export interface IRickandmortyAPI {
  info: {
    count: 826;
    pages: 42;
    next: 'https://rickandmortyapi.com/api/character/?page=2';
    prev: null;
  };
  results: Rickandmorty[];
}
