import React from 'react';

/**
 * A menu that opens up when user wants to perform actions to a book, such as
 * moving it to different shelves or removing them from the book shelf.
 * @method BookActionsFAB
 * @param  {Object} props - Callbacks indicating when user has chosen an action.
 */
const BookActionsFAB = props => (
  // move book to new shelf or remove from bookshelf altogether
  <div>
    <ul>
      <li>Move to...</li>
      <li>Currently reading</li>
      <li>Want to read</li>
      <li>Read</li>
      <li>None</li>
    </ul>
  </div>
);

export default BookActionsFAB;
