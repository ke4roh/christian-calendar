import React from 'react';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
const homepage = process.env.REACT_APP_HOMEPAGE || '.';

root.render(
  <React.StrictMode>
    <Router>
      <base href={homepage} />
      <App />
    </Router>
  </React.StrictMode>
);

