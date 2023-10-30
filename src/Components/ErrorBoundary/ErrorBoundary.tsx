import React, { ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/common-types';

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Sorry.. there was an error</h1>
          <button className="reload-button" onClick={() => window.location.reload()}>
            Reload
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
