import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
// import { store } from '../store/store';
import Layout from '@/Components/Layout/Layout';
import { wrapper } from '@/store/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      {/* <Provider store={store}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </Provider> */}
    </ErrorBoundary>
  );
}
const AppWithStore = wrapper.withRedux(App);

export default AppWithStore;
