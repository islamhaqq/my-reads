import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import BookShelf from './BookShelf';

/**
 * A top-level stateful component that serves as the home page of the app.
 * Displays three shelves with categories "Currently Reading", "Want to Read",
 * and "Read."
 * @extends Component
 */
const MyBooksPage = props => (
  <div className="list-books">
    {/* Name/header of the app. */}
    <Header />

    {/* Main content (bookshelves). */}
    <div className="list-books-content">
      <div>
        {/* "Currently Reading" shelf. */}
        <BookShelf
          books={props.currentlyReading}
          onBookAction={props.onBookAction}
          title="Currently Reading"
        />

        {/* "Want to Read" shelf. */}
        <BookShelf
          books={props.wantToRead}
          onBookAction={props.onBookAction}
          title="Want to Read"
        />

        {/* "Read" shelf. */}
        <BookShelf
          books={props.read}
          onBookAction={props.onBookAction}
          title="Read"
        />
      </div>
    </div>

    {/* Navigates user to the search page. */}
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

/**
 * Prop validation for this component.
 * @type {Object}
 */
MyBooksPage.propTypes = {
  /**
   * The callback passed given the book to be moved and the shelf to move to
   * which will do the actual moving of the book locally and remotely
   * afterwards.
   * @type {Function}
   */
  onBookAction: PropTypes.func.isRequired,
  /**
   * All the books in the "currently reading" shelf in the user's bookshelf.
   * @type {Array}
   */
  currentlyReading: PropTypes.array.isRequired,
  /**
   * All the books in the "want to read" shelf in the user's bookshelf.
   * @type {Array}
   */
  wantToRead: PropTypes.array.isRequired,
  /**
   * All the books in the "read" shelf in the user's bookshelf.
   * @type {Array}
   */
  read: PropTypes.array.isRequired,
};

export default MyBooksPage;
