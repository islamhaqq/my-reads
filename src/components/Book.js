import React from 'react';

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
          backgroundImage:
            {`url("${props.coverImageSource}")`},
        }}
      />

      {/* Book actions. */}
      <div className="book-shelf-changer">
        <select>
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

export default Book;
