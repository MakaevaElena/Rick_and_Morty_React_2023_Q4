import React, { ErrorInfo, ReactNode } from 'react';
import Button from '../Button/Button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary Uncaught error:', error, errorInfo);
  }

  private reload() {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Sorry.. there was an error</h1>
          <Button children="Reload" onClick={this.reload} />
        </>
      );
    }

    return this.props.children;
  }
}
