import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * An input box that lets users search for books to add to their bookshelf.
 * @method SearchBar
 * @param  {Object} props - Callbacks that will be used to update stateful
 * component's state on user input and new search.
 */
const SearchBar = props => (
  <div className="search-books-bar">
    {/* Back button that navigates user back to bookshelf page. */}
    <Link to="/" className="close-search">
      Close
    </Link>

    {/* Search bar input field. */}
    <div className="search-books-input-wrapper">
      <input
        onChange={props.onQuery}
        placeholder="Search by title or author"
        type="text"
      />
    </div>
  </div>
);

/**
 * Validation of the props that this component accepts.
 * @type {Object}
 */
SearchBar.propTypes = {
  /**
   * This component accepts a callback function called "onQuery" that will be
   * used by the parent component to receive the native DOM event emitted when
   * user types in the search bar's input field.
   * @type {Function}
   */
  onQuery: PropTypes.func.isRequired,
};

export default SearchBar;
