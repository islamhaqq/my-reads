import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MyBooksPage from './MyBooksPage';
import SearchPage from './SearchPage';

import '../assets/styles/App.css';

/**
 * Root component.
 * @extends Component
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* MyBooksPage will serve as the home page. */}
        <Route path="/" component={MyBooksPage} exact />

        {/* SearchPage allows user to search & add books to their bookshelf. */}
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default App;
