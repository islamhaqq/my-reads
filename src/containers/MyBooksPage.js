import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import BookShelf from '../components/BookShelf';
import { getAll } from '../lib/services/booksAPI';

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

    // update state with all the user's books, distilled from unused data that
    // will take up extra memory
    allBooks.map(book => {
      const { shelf, title, authors, imageLinks } = book;

      this.setState(currentState => {
        currentState[book.shelf].push({
          title,
          authors,
          coverImageSource: imageLinks.thumbnail,
        });
      });
    });

    // indicate all essential-data promises are resolved
    this.setState({ isLoading: false });
  }

  render() {
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
              title="Currently Reading"
            />

            {/* "Want to Read" shelf. */}
            <BookShelf books={this.state.wantToRead} title="Want to Read" />

            {/* "Read" shelf. */}
            <BookShelf books={this.state.read} title="Read" />
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
