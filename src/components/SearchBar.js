import React from 'react';
import { Link } from 'react-router-dom';

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
      {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
      <input type="text" placeholder="Search by title or author" />
    </div>
  </div>
);

export default SearchBar;
