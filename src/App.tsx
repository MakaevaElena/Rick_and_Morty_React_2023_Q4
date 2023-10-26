import { Component, ReactNode } from 'react';
import './App.scss';
import axios from 'axios';
import PokemonList from './Components/PokemonList/PokemonList';
import Pagination from './Components/Pagination/Pagination';
import Searching from './Components/Searching/Searching';
import Info from './Components/Info/Info';
import { Pokemon } from './types/pokemon-types';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

// const defaultUrl = 'https://pokeapi.co/api/v2/pokemon/';
const defaultUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=20';
const searchUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';

interface Props {
  children?: ReactNode;
}

interface State {
  data: Pokemon[];
  isLoading: boolean;
  url: string;
  nextUrl: string;
  prevUrl: string;
  // inputValue: string;
}

class App extends Component<Props, State> {
  constructor(props: object) {
    // todo super(props);
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      url: '',
      nextUrl: '',
      prevUrl: '',
      // inputValue: '',
    };
  }

  private async fetchData() {
    let url = '';
    const value = localStorage.getItem('searchValue');
    this.setState({ isLoading: true });

    value && value.length > 0 ? (url = searchUrl) : (url = defaultUrl);
    // console.log('url', url);
    const response = await axios.get(url);
    this.setState({ nextUrl: response.data.next });
    this.setState({ prevUrl: response.data.previous });
    // console.log(response.data);
    this.setState({ isLoading: false });
    return response.data.results;
  }

  componentDidMount(): void {
    const value = localStorage.getItem('searchValue');
    this.fetchData().then((data) => {
      if (value) {
        this.setState({ data: data.filter((el: Pokemon) => el.name.includes(value)) });
      } else {
        this.setState({ data });
      }

      // console.log(this.state.data);
    });
  }

  // https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php

  searchData = (searchingData: Pokemon[]) => {
    this.setState({ data: searchingData });
    // console.log(searchingData);
  };

  // getInputValue = (inputValue: string) => {
  //   this.setState({ inputValue });
  // };

  render() {
    return (
      <>
        <div className="container">
          <ErrorBoundary>
            <Searching
              data={this.state.data}
              searchData={this.searchData}
              // getInputValue={this.getInputValue}
              isLoading={this.state.isLoading}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <PokemonList
              data={this.state.data}
              isLoading={this.state.isLoading}
              // inputValue={this.state.inputValue}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <Info />
          </ErrorBoundary>
          <ErrorBoundary>
            <Pagination />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export default App;
