import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import './index.css';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>

      {/* </BrowserRouter> */}
    </ErrorBoundary>
  </React.StrictMode>
);
