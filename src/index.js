import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for createRoot
// import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/Header.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);