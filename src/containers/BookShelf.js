import React, { Component } from 'react';

import Header from '../components/Header';

/**
 * A top-level stateful component that serves as the home page of the app.
 * Displays three shelves with categories "Currently Reading", "Want to Read",
 * and "Read."
 * @extends Component
 */
class BookShelf extends Component {
  state = {};

  render() {
    return <Header />;
  }
}

export default BookShelf;
