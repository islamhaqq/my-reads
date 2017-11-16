import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BooksGrid = props => {
  console.log(props.books);

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {props.books.length ? (
          props.books.map(book => (
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
