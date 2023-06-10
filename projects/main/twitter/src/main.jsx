import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import theme from './theme';
import App from './App.jsx';

import './theme/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
