import React from 'react';

import Book from './Book';

/**
 * A presentational component that simply displays the name of the category of
 * books to display and the books in that category.
 * @method BookShelf
 * @param  {Object} props - The shelf's header and all the books to showcase.
 */
const BookShelf = props => (
  <div>
    <h1>{props.header}</h1>

    {/* Listed out books in shelf. */}
    {props.books.map(book => <Book />)}
  </div>
);
