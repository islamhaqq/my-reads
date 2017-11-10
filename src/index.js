import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './containers/App';
import registerServiceWorker from './lib/services/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
