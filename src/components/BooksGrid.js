import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

/**
 * Simple renders a grid of books.
 * @method BooksGrid
 * @param  {Array} books - The books to display.
 */
const BooksGrid = ({ books }) => {
  console.log(books);

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.length ? (
          books.map(book => (
            <li key={book.id}>
              <Book
                coverImageSource={
                  book.imageLinks ? book.imageLinks.thumbnail : ''
                }
                title={book.title}
                author={book.authors ? book.authors[0] : ''}
              />
            </li>
          ))
        ) : (
          <h1>No Results...</h1>
        )}
      </ol>
    </div>
  );
};

BooksGrid.propTypes = {
  /**
   * The books to display in a grid.
   * @type {Array}
   */
  books: PropTypes.array.isRequired,
};

export default BooksGrid;
