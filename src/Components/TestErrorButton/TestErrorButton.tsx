import React from 'react';

interface State {
  hasError: boolean;
}

export default class TestErrorButton extends React.Component {
  public state: State = {
    hasError: false,
  };

  private handleClick = () => {
    this.setState({ hasError: !this.state.hasError });
    console.log('this.state.hasError', this.state.hasError);
    throw new Error('Test Error Boundary Error');
  };

  render() {
    return (
      <>
        <button onClick={() => this.handleClick}>TestErrorButton</button>
      </>
    );
  }
}
