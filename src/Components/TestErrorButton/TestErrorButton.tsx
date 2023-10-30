import React from 'react';
import './style.scss';
import { TestErrorButtonProps, TestErrorButtonState } from '../../types/common-types';

export default class TestErrorButton extends React.Component<
  TestErrorButtonProps,
  TestErrorButtonState
> {
  public state: TestErrorButtonState = {
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
