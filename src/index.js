import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom' instead of 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
