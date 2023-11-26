import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
import Layout from '@/Components/Layout/Layout';
import { wrapper } from '@/store/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
const AppWithStore = wrapper.withRedux(App);

export default AppWithStore;
