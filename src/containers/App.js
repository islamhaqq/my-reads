import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

import '../assets/styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* BookShelf will serve as the home page. */}
        <Route path="/" component={BookShelf} exact />

        {/* SearchPage allows user to search & add books to their bookshelf. */}
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default App;
