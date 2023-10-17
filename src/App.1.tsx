import { Component } from 'react';
import Card from './Components/Card/Card';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      clicks: 0,
    };
  }

  render() {
    return (
      <>
        <div className="container">
          <section className="pokemonList">
            <h2>pokemonList</h2>
            <Card name="Card" />
          </section>
          <section className="pokemonInfo">
            <h2>pokemonInfo</h2>
          </section>
        </div>
      </>
    );
  }
}
