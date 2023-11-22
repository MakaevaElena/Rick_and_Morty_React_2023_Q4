import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
import { store } from '../store/store';
import Layout from '@/Components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}
