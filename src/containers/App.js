import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MyBooksPage from '../components/MyBooksPage';
import SearchPage from './SearchPage';
import { getAll, update } from '../lib/services/booksAPI';

import '../assets/styles/App.css';

/**
 * Root component.
 * @extends Component
 */
class App extends Component {
  state = {
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
    /**
     * Whether AJAX calls are being made to the API to fetch data.
     * @type {Boolean}
     */
    isLoading: true,
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

  // TODO: fix issue where sometimes the book won't locally be moved but moved
  // remotely. Fix responsiveness of the local moving and deleting.
  /**
   * Move a book to a specified shelf, both locally and remotely.
   * @method moveBookToShelf
   * @param  {Object} book - The book to move.
   * @param  {String} shelf -  The shelf to move the book to.
   * @return {Void}
   */
  moveBookToShelf = async (book, shelfToMoveTo) => {
    console.log(book, shelfToMoveTo);
    // move the book locally before doing it remotely
    await this.setState(currentState => {
      // handle old books
      if (book.shelf !== 'none') {
        // remove book from current shelf
        const index = currentState[book.shelf].indexOf(book);
        currentState[book.shelf].splice(index, 1);
      }

      if (shelfToMoveTo !== 'none') {
        // move book to specified shelf
        currentState[shelfToMoveTo].push(book);
      }

      // update shelf
      book.shelf = shelfToMoveTo;

      return {
        [book.shelf]: currentState[book.shelf],
        [shelfToMoveTo]: currentState[shelfToMoveTo],
      };
    });

    // move the book remotely and make the HTTP request
    await update(book, shelfToMoveTo);
  };

  render() {
    // indicate user the app is still loading all the books
    if (this.state.isLoading) return <h1>Loading...</h1>;

    return (
      <div className="App">
        {/* MyBooksPage will serve as the home page. */}
        <Route
          path="/"
          render={() => (
            <MyBooksPage
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              onBookAction={this.moveBookToShelf}
            />
          )}
          exact
        />

        {/* SearchPage allows user to search & add books to their bookshelf. */}
        <Route
          path="/search"
          render={() => (
            <SearchPage
              bookshelf={[
                ...this.state.currentlyReading,
                ...this.state.wantToRead,
                ...this.state.read,
              ]}
              onBookAction={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
