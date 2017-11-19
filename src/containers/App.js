import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MyBooksPage from '../components/MyBooksPage';
import SearchPage from './SearchPage';
import { getAll, update } from '../lib/services/booksAPI';

import '../assets/styles/App.css';

/**
 * Root component.
 * TODO: index.js:2177 Warning: Can only update a mounted or mounting
 * component. This  usually means you called setState, replaceState, or
 * forceUpdate on an unmounted component. This is a no-op. Please check the
 * code for the SearchPage component.
 * @extends Component
 */
class App extends Component {
  state = {
    /**
     * All the books in the user's bookshelf.
     * @type {Array}
     */
    books: [],
    /**
     * Whether the app is making AJAX requests to the API to fetch data.
     * @type {Boolean}
     */
    isLoading: true,
  };

  async componentDidMount() {
    // fetch all books from API
    const allBooks = await getAll();

    // update state with all the user's books, distilled from unused data that
    // will take up extra memory
    // TODO: abstract this away as a helper used in SearchPage as well
    const allBooksDistilled = [];
    allBooks.map(book => {
      const { id, shelf, title, authors, imageLinks } = book;

      allBooksDistilled.push({
        id,
        shelf,
        title,
        authors,
        imageLinks,
      });
    });

    this.setState({
      books: allBooksDistilled,
      // indicate all essential-data promises are resolved
      isLoading: false,
    });
  }

  /**
   * A helper function that simply gets all books in a certain shelf.
   * @method getAllBooksFromShelf
   * @param  {String} shelf - The shelf from which to get the contained books.
   * @return {Array} All the books in a specified shelf.
   */
  getAllBooksFromShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  /**
   * Move a book to a specified shelf, both locally and remotely.
   * @method moveBookToShelf
   * @param  {Object} bookToMove - The book to move.
   * @param  {String} shelfToMoveTo - The shelf to move the book to.
   * @return {Void}
   */
  moveBookToShelf = async (bookToMove, shelfToMoveTo) => {
    // no point in moving a book into its same shelf
    if (bookToMove.shelf === shelfToMoveTo) return;

    // move the book locally before doing it remotely
    await this.setState(currentState => {
      // handle getting rid of book from bookshelf
      if (shelfToMoveTo === 'none') {
        const bookToRemove = currentState.books.find(
          ownedBook => ownedBook.id === bookToMove.id,
        );
        const index = currentState.books.indexOf(bookToRemove);
        if (bookToRemove) currentState.books.splice(index, 1);
      } else if (bookToMove.shelf === 'none') {
        // handle moving in new books from search into the bookshelf
        bookToMove.shelf = shelfToMoveTo;
        currentState.books.push(bookToMove);
      } else {
        // handle switching books from shelves within the bookshelf
        currentState.books.find(
          ownedBook => ownedBook.id === bookToMove.id,
        ).shelf = shelfToMoveTo;
      }

      return { books: currentState.books };
    });

    // move the book remotely and make the HTTP request
    await update(bookToMove, shelfToMoveTo);
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
              currentlyReading={this.getAllBooksFromShelf('currentlyReading')}
              wantToRead={this.getAllBooksFromShelf('wantToRead')}
              read={this.getAllBooksFromShelf('read')}
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
              bookshelf={this.state.books}
              onBookAction={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
