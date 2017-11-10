import React from 'react';

import Book from './Book';

const Shelf = props => (
  <div>
    <h1>{props.header}</h1>

    {/* Listed out books in shelf. */}
    {props.books.map(book => <Book />)}
  </div>
);
