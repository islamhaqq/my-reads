import React from 'react';

import Book from './Book';

/**
 * A presentational component that simply displays the name of the category of
 * books to display and the books in that category.
 * @method BookShelf
 * @param  {Object} props - The shelf's header and all the books to showcase.
 */
const BookShelf = props => (
  <div className="bookshelf">
    {/* Header. */}
    <h2 className="bookshelf-title">{props.title}</h2>

    {/* Listed out books. */}
    <div className="bookshelf-books">
      <ol className="books-grid">
        <li>
          <Book
            coverImageSource="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
            title="To Kill a Mockingbird"
            author="Harper Lee"
          />
        </li>
        <li>
          <Book
            coverImageSource="http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
            title="Currently Reading"
            author="Orson Scott Card"
          />
        </li>
      </ol>
    </div>
  </div>
);
