import React from 'react';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
