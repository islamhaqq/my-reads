import React from 'react';

const Book = props => (
  <div>
    {/* Book cover photo. */}
    <img />

    {/* Book description. */}
    <div>
      <p>{props.book.title}</p>
      <p>{props.book.author}</p>
    </div>
  </div>
);

export default Book;
