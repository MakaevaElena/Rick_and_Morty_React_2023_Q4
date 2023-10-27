import React from 'react';
import './style.scss';

interface State {
  hasError: boolean;
}

export default class TestErrorButton extends React.Component {
  public state: State = {
    hasError: false,
  };

  componentDidUpdate(): void {
    if (this.state.hasError === true) {
      throw new Error('Test Boundary Error');
    }
  }

  private handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    return (
      <>
        <button className="error-button" onClick={this.handleClick}>
          TestErrorButton
        </button>
      </>
    );
  }
}
