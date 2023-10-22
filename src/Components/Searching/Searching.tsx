import React from 'react';
import './style.scss';

// interface CounterProps {
//   name: string;
// }

// interface CounterState {
//   count: number;
// }

// export default class Info extends React.Component<CounterProps, CounterState> {
export default class Info extends React.Component {
  render() {
    return (
      <>
        <h2>Searching</h2>
        <section className="pokemon-searching">
          <form>
            <input className="search-input" type="text" placeholder="search..." />
            <div className="search-button"></div>
          </form>
        </section>
      </>
    );
  }
}
