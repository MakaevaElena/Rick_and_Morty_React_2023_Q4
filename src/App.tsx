import { Component } from 'react';
import './App.scss';
import axios from 'axios';
import PokemonList from './Components/PokemonList/PokemonList';
import Pagination from './Components/Pagination/Pagination';
import Searching from './Components/Searching/Searching';
import Info from './Components/Info/Info';
import { Pokemon } from './types/pokemon-types';

const url = 'https://pokeapi.co/api/v2/pokemon/';
// const url = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';

interface Props {}

// type Stat = {
//   name: string;
//   base_stat: number;
// };

// type PokemonData = {
//   name: string;
//   url: string;
//   stats: Stat[];
// };

interface State {
  data: Pokemon[];
  isLoading: boolean;
  url: string;
  nextUrl: string;
  prevUrl: string;
}

class App extends Component<Props, State> {
  constructor(props: object) {
    // todo super(props);
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      url: 'https://pokeapi.co/api/v2/?offset=100&limit=100',
      nextUrl: '',
      prevUrl: '',
    };
  }

  private async fetchData() {
    this.setState({ isLoading: true });
    const response = await axios.get(url);
    this.setState({ nextUrl: response.data.next });
    this.setState({ prevUrl: response.data.previous });
    // console.log(response.data);
    this.setState({ isLoading: false });
    return response.data.results;
  }

  componentDidMount(): void {
    this.fetchData().then((data) => {
      this.setState({ data });
      // console.log(this.state.data);
    });
  }

  searchData = (searchingData: Pokemon[]) => {
    console.log(searchingData);
    this.setState({ data: searchingData });
  };

  render() {
    return (
      <>
        <div className="container">
          <Searching
            data={this.state.data}
            searchData={this.searchData}
            isLoading={this.state.isLoading}
          />
          <PokemonList data={this.state.data} isLoading={this.state.isLoading} />
          <Info />
          <Pagination />
        </div>
      </>
    );
  }
}

export default App;
