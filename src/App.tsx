import { Component } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Pagination from './Components/Pagination/Pagination';
import axios from 'axios';

// interface CounterState {
//   data: [];
// isLoading: boolean;
// }

const url = 'https://pokeapi.co/api/v2/pokemon/';

class App extends Component {
  constructor(props: object) {
    // todo super(props);
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      url: 'https://pokeapi.co/api/v2/pokemon/',
    };
  }

  private async fetchData() {
    this.setState({ isLoading: true });
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  }

  componentDidMount(): void {
    this.fetchData().then((data) => this.setState({ data }));
  }

  render() {
    return (
      <>
        <div className="container">
          <section className="pokemonList">
            <h2>pokemonList</h2>
            <Card name="Card" />
            <Pagination />
          </section>
          <section className="pokemonInfo">
            <h2>pokemonInfo</h2>
          </section>
        </div>
      </>
    );
  }
}

export default App;
