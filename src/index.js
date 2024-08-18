import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root')
);
