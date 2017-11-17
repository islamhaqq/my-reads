import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a book; its cover, description, and actions.
 * @method Book
 * @param  {Object} props - A book object and its data (title, author, etc.)
 */
const Book = props => (
  <div className="book">
    {/* Book preview. */}
    <div className="book-top">
      {/* Book cover. */}
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${props.coverImageSource})`,
        }}
      />

      {/* Book actions. */}
      <div className="book-shelf-changer">
        <select onChange={event => props.onBookAction(event.target.value)}>
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
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.author}</div>
  </div>
);

/**
 * The props this component accepts to fully render a book.
 * @type {Object}
 */
Book.propTypes = {
  /**
   * The image link of the book's cover.
   * @type {String}
   */
  coverImageSource: PropTypes.string.isRequired,
  /**
   * The title of the book.
   * @type {String}
   */
  title: PropTypes.string.isRequired,
  /**
   * The author of the book.
   * @type {String}
   */
  author: PropTypes.string.isRequired,
};

export default Book;
