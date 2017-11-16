import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';
import { search } from '../lib/services/booksAPI';

/**
 * A top-level stateful component that serves as the search page of the app.
 * Has a search bar that users can use to look for books to add to their
 * bookshelf. Also displays all the books returned from the search query.
 * @extends Component
 */
class SearchPage extends Component {
  state = {
    /**
     * What the user has typed in the search bar to search for books to add.
     * @type {String}
     */
    searchQuery: '',
    searchResults: null,
  };

  /**
   * Uses the passed native DOM event from the search bar to update the search
   * query, which will in turn update search results.
   * @method updateSearchQuery
   * @param  {Object} event - Native DOM event.
   * @return {Void}
   */
  updateSearchQuery = async event => {
    this.setState({
      searchQuery: event.target.value,
    });

    // fetch the books according to the user's query
    await this.getSearchResults();
  };

  /**
   * Fetches the books matching the user's search query.
   * @method getSearchResults
   * @return {Void)
   */
  getSearchResults = async () => {
    // make AJAX call to the API
    const results = await search(this.state.searchQuery, 10);

    // update the state to reflect the results
    this.setState({
      searchResults: results,
    });
  };

  render() {
    return (
      <div className="search-books">
        {/* Search bar component which updates search query. */}
        <SearchBar onQuery={this.updateSearchQuery} />

        {/* The search results in accordance to the search query. */}
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default SearchPage;
