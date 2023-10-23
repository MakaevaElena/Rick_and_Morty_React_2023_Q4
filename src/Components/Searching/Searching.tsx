import React from 'react';
import './style.scss';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/pokemon/';

type PokemonData = {
  name: string;
  url: string;
};

interface Props {
  data: PokemonData[];
  isLoading: boolean;
  searchData: (data: []) => void;
}

interface State {
  value: string;
}

export default class Searching extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    // this.fetchData = this.fetchData.bind(this);
  }

  // private async fetchData() {
  //   // this.props.isLoading(true);
  //   const response = await axios.get(`${url}${this.state.value}`);
  //   this.props.searchData(response.data);
  //   console.log(response);
  //   // this.props.isLoading(false);
  //   // return response.data.results;
  // }

  private async fetchData() {
    // this.props.isLoading(true);
    const response = await axios.get(url);
    this.props.searchData(
      response.data.results.filter((el: PokemonData) => el.name === this.state.value)
    );
    // this.props.isLoading(false);
    // return response.data.results;
  }

  private handleChange(evt: React.FormEvent<HTMLInputElement>) {
    if (evt?.target instanceof HTMLInputElement) {
      this.setState({ value: evt?.target.value });
    }
  }

  private handleSearchClick() {
    this.fetchData();
    localStorage.setItem('searchValue', this.state.value);
  }

  render() {
    return (
      <>
        <h2>Searching</h2>
        <section className="pokemon-searching">
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="search..."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div className="search-button" onClick={this.handleSearchClick}></div>
          </form>
        </section>
      </>
    );
  }
}

// https://ru.legacy.reactjs.org/docs/forms.html
// https://tokmakov.msk.ru/blog/item/637
// https://ru.legacy.reactjs.org/docs/lifting-state-up.html
