import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        {/* <BrowserRouter> */}
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        {/* </BrowserRouter> */}
      </ErrorBoundary>
    </>
  );
}
