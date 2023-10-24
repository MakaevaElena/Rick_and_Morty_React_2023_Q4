import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props> {
  public state: State = {
    hasError: false,
  };

  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
