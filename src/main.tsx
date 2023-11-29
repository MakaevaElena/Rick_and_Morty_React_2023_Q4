import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
