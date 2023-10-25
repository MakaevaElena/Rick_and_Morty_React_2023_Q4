import React from 'react';
import './style.scss';
import axios from 'axios';
import { Pokemon } from '../../types/pokemon-types';

// const url = 'https://pokeapi.co/api/v2/pokemon/';
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

interface Props {
  data: Pokemon[];
  isLoading: boolean;
  searchData: (data: Pokemon[]) => void;
  // getInputValue: (data: string) => void;
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
    // this.fetchData = this.fetchData.bind(this);
  }

  // private async fetchData() {
  //   // this.props.isLoading(true);
  //   const response = await axios.get(`${url}${this.state.value}`);
  //   const arr = [];
  //   arr.push(response.data);
  //   this.props.searchData(arr);
  //   // this.props.getInputValue(this.state.value);
  //   // console.log(response);
  //   // this.props.isLoading(false);
  //   // return response.data.results;
  // }

  private async fetchData() {
    // this.props.isLoading(true);
    const response = await axios.get(url);
    this.props.searchData(
      response.data.results.filter((el: Pokemon) => el.name.includes(this.state.value))
    );
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
    // const checkFilling = /\w+/;
    const VALUE_CONTAIN_WHITESPACE = `Searching must not contain leading or trailing whitespace.`;
    // const EMPTY_FIELD = `THE FIELD IS EMPTY`;
    switch (true) {
      case checkWhiteSpace.test(input.value):
        input.setCustomValidity(VALUE_CONTAIN_WHITESPACE);
        this.searchButtonRef.current?.classList.add('disable');
        break;

      // case checkFilling.test(input.value):
      // case input.value.length === 0:
      //   input.setCustomValidity(EMPTY_FIELD);
      //   this.searchButtonRef.current?.classList.add('disable');
      //   break;

      default:
        input.setCustomValidity('');
        this.searchButtonRef.current?.classList.remove('disable');
        return true;
    }

    input.reportValidity();

    return false;
  }

  private handleSearchClick() {
    this.fetchData();
    localStorage.setItem('searchValue', this.state.value);
  }

  private handleFocus() {
    const EMPTY_FIELD = `THE FIELD IS EMPTY`;
    if (this.inputRef.current) {
      this.inputRef.current.setCustomValidity(EMPTY_FIELD);
      this.inputRef.current.reportValidity();
    }
  }

  componentDidMount(): void {
    const value = localStorage.getItem('searchValue');
    if (value) {
      this.setState({ value });
    }
    // if (this.inputRef.current) {
    //   this.validateInputValue(this.inputRef.current);
    // }
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
              onFocus={this.handleFocus}
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

// https://ru.legacy.reactjs.org/docs/forms.html
// https://tokmakov.msk.ru/blog/item/637
// https://ru.legacy.reactjs.org/docs/lifting-state-up.html
