import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import BookShelf from '../components/BookShelf';
import { getAll, update } from '../lib/services/booksAPI';

/**
 * A top-level stateful component that serves as the home page of the app.
 * Displays three shelves with categories "Currently Reading", "Want to Read",
 * and "Read."
 * @extends Component
 */
class MyBooksPage extends Component {
  /**
   * The "My Books" page's state. Contains book data.
   * @type {Object}
   */
  state = {
    isLoading: true,
    /**
     * All the books in the user's book shelf that he is currently reading.
     * @type {Array}
     */
    currentlyReading: [],
    /**
     * All the books in the user's book shelf that he wants to read reading.
     * @type {Array}
     */
    wantToRead: [],
    /**
     * All the books in the user's book shelf that he has already read.
     * @type {Array}
     */
    read: [],
  };

  async componentDidMount() {
    // fetch all books from API
    const allBooks = await getAll();

    // TODO: abstract this away as a helper used in SearchPage as well
    // update state with all the user's books, distilled from unused data that
    // will take up extra memory
    const allBooksDistilled = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
    allBooks.map(book => {
      const { id, shelf, title, authors, imageLinks } = book;

      allBooksDistilled[book.shelf].push({
        id,
        shelf,
        title,
        authors,
        coverImageSource: imageLinks.thumbnail,
      });
    });

    this.setState({
      currentlyReading: allBooksDistilled.currentlyReading,
      wantToRead: allBooksDistilled.wantToRead,
      read: allBooksDistilled.read,
    });

    // indicate all essential-data promises are resolved
    this.setState({ isLoading: false });
  }

  /**
   * Move a book to a specified shelf, both locally and remotely.
   * @method moveBookToShelf
   * @param  {Object} book - The book to move.
   * @param  {String} shelf -  The shelf to move the book to.
   * @return {Void}
   */
  moveBookToShelf = async (book, shelf) => {
    // move the book locally before doing it remotely
    await this.setState(currentState => {
      // remove book from current shelf
      const index = currentState[book.shelf].indexOf(book);
      currentState[book.shelf].splice(index, 1);

      // move book to specified shelf
      if (shelf !== 'none') currentState[shelf].push(book);

      return {
        [book.shelf]: currentState[book.shelf],
        [shelf]: currentState[shelf],
      };
    });

    // move the book remotely and make the HTTP request
    await update(book, shelf);
  };

  render() {
    // indicate user the app is still loading all the books
    if (this.state.isLoading) return <h1>Loading...</h1>;

    return (
      <div className="list-books">
        {/* Name/header of the app. */}
        <Header />

        {/* Main content (bookshelves). */}
        <div className="list-books-content">
          <div>
            {/* "Currently Reading" shelf. */}
            <BookShelf
              books={this.state.currentlyReading}
              onBookAction={this.moveBookToShelf}
              title="Currently Reading"
            />

            {/* "Want to Read" shelf. */}
            <BookShelf
              books={this.state.wantToRead}
              onBookAction={this.moveBookToShelf}
              title="Want to Read"
            />

            {/* "Read" shelf. */}
            <BookShelf
              books={this.state.read}
              onBookAction={this.moveBookToShelf}
              title="Read"
            />
          </div>
        </div>

        {/* Navigates user to the search page. */}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooksPage;
