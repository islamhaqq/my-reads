import React from 'react';

/**
 * An input box that lets users search for books to add to their bookshelf.
 * @method SearchBar
 * @param  {Object} props - Callbacks that will be used to update stateful
 * component's state on user input and new search.
 */
const SearchBar = props => (
  <div>
    <input placeholder="Search for a book..." />
  </div>
);

export default SearchBar;
