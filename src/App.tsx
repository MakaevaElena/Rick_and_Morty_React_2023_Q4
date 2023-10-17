import { Component } from 'react';
import './App.css';
import axios from 'axios';
import PokemonList from './Components/PokemonList/PokemonList';

const url = 'https://pokeapi.co/api/v2/pokemon/';

interface Props {}

interface State {
  data: [];
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
      url: 'https://pokeapi.co/api/v2/pokemon/',
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

  render() {
    return (
      <>
        <div className="container">
          <PokemonList data={this.state.data} isLoading={this.state.isLoading} />
          <section className="pokemonInfo">
            <h2>pokemonInfo</h2>
          </section>
        </div>
      </>
    );
  }
}

export default App;
