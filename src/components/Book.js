import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a book; its cover, description, and actions.
 * @method Book
 * @param  {Object} props - A book object and its data (title, author, etc.)
 */
const Book = ({ book, onBookAction }) => (
  <div className="book">
    {/* Book preview. */}
    <div className="book-top">
      {/* Book cover. */}
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${
            book.imageLinks ? book.imageLinks.thumbnail : ''
          })`,
        }}
      />

      {/* Book actions. */}
      <div className="book-shelf-changer">
        <select
          onChange={event => onBookAction(event.target.value)}
          value={book.shelf}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>

    {/* Book description. */}
    <div className="book-title">{book.title}</div>
    {/* All authors rendered out */}
    {book.authors
      ? book.authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))
      : null}
  </div>
);

/**
 * The props this component accepts to fully render a book.
 * @type {Object}
 */
Book.propTypes = {
  /**
   * The book to display a preview of.
   * @type {Object}
   */
  book: PropTypes.object.isRequired,
  /**
   * A callback passed to handle when user seeks to change the shelf of the
   * book.
   * @type {Function}
   */
  onBookAction: PropTypes.func.isRequired,
};

export default Book;
