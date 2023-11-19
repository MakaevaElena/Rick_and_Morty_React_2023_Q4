import React from 'react';
import { store } from './store/store';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
