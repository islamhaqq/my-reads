import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';

import './assets/styles/index.css';
import registerServiceWorker from './lib/services/registerServiceWorker';

ReactDOM.render(
  // implement React Router for navigation and keeping track of HTML5 history
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
