import React from 'react';
import './style.scss';
import axios from 'axios';
import { Rickandmorty } from '../../types/rickandmorty-types';

const baseUrl = 'https://rickandmortyapi.com/api';

interface Props {
  data: Rickandmorty[];
  isLoading: boolean;
  searchData: (data: Rickandmorty[]) => void;
}

interface State {
  value: string;
}

export default class Searching extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;
  private searchButtonRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
    this.searchButtonRef = React.createRef();

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  private async fetchData() {
    // this.props.isLoading(true);
    const response = await axios.get(`${baseUrl}/character/?name=${this.state.value}`);
    console.log('response', response);
    const arr: Rickandmorty[] = [];
    arr.push(...response.data.results);
    this.props.searchData(arr);
    // this.props.isLoading(false);
    // return response.data.results;
  }

  private handleChange(evt: React.FormEvent<HTMLInputElement>) {
    if (evt?.target instanceof HTMLInputElement) {
      this.validateInputValue(evt?.target);
      this.setState({ value: evt?.target.value });
    }
  }

  private validateInputValue(input: HTMLInputElement) {
    const checkWhiteSpace = /^\s|\s$/;
    const VALUE_CONTAIN_WHITESPACE = `Searching must not contain leading or trailing whitespace.`;
    switch (true) {
      case checkWhiteSpace.test(input.value):
        input.setCustomValidity(VALUE_CONTAIN_WHITESPACE);
        this.searchButtonRef.current?.classList.add('disable');
        break;

      default:
        input.setCustomValidity('');
        this.searchButtonRef.current?.classList.remove('disable');
        return true;
    }

    input.reportValidity();

    return false;
  }

  private handleSearchClick() {
    this.fetchData().catch(() => this.props.searchData([]));
    localStorage.setItem('searchValue', this.state.value);
  }

  componentDidMount(): void {
    const value = localStorage.getItem('searchValue');
    if (value) {
      this.setState({ value });
    }
  }

  render() {
    return (
      <>
        <h2>Searching</h2>
        <section className="pokemon-searching">
          <form>
            <input
              ref={this.inputRef}
              className="search-input"
              type="text"
              placeholder="search..."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div
              className="search-button"
              onClick={this.handleSearchClick}
              ref={this.searchButtonRef}
            ></div>
          </form>
        </section>
      </>
    );
  }
}
