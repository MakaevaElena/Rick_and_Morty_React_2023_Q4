import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search/:page" element={<App />} />
        <Route path="*" element={<PageNotFound />} />

        {/* <App /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
