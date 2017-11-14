import React from 'react';

/**
 * Displays a book; its cover, description, and actions.
 * @method Book
 * @param  {Object} props - A book object and its data (title, author, etc.)
 */
const Book = props => (
  <div>
    {/* Book cover photo. */}
    <img src={props.book.coverPhotoSource} />

    {/* Book description. */}
    <div>
      <p>{props.book.title}</p>
      <p>{props.book.author}</p>
    </div>
  </div>
);

export default Book;
