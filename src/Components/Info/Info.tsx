import React from 'react';

interface CounterProps {
  name: string;
}

interface CounterState {
  count: number;
}

export default class Info extends React.Component<CounterProps, CounterState> {
  // constructor(props: CounterProps) {
  //   super(props);

  //   this.state = {
  //     count: 0,
  //   };
  // }

  // handleClick = () => {
  //   this.setState(({ count }) => ({
  //     count: count + 1,
  //   }));
  // };

  render() {
    return (
      <>
        <h1>Info about {this.props.name}</h1>;
        <div className="card">
          <p>name: Pokemon</p>
          <img src="" alt="" />
          {/* <button onClick={() => this.handleClick}>count is {this.state.count}</button> */}
        </div>
      </>
    );
  }
}

// https://www.coderdoc.ru/start/35_typescript/14_component/14_1_class.php
