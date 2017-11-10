import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';

/**
 * A top-level stateful component that serves as the search page of the app.
 * Has a search bar that users can use to look for books to add to their
 * bookshelf. Also displays all the books returned from the search query.
 * @extends Component
 */
class SearchPage extends Component {
  state = {};

  render() {
    return <SearchBar />;
  }
}
