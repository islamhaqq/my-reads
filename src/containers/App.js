import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BookShelf from './BookShelf';

import '../assets/styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* BookShelf will serve as the home page. */}
        <Route path="/" component={BookShelf} exact />
      </div>
    );
  }
}

export default App;
