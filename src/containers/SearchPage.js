import React, { Component } from 'react';
import _ from 'lodash';

import SearchBar from '../components/SearchBar';
import BooksGrid from '../components/BooksGrid';
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
    searchResults: [],
  };

  componentDidMount() {
    // optimization: limit AJAX calls as much as possible when user is querying
    _.debounce(this.getSearchResults, 1000);
  }

  /**
   * Uses the passed native DOM event from the search bar to update the search
   * query, which will in turn update search results.
   * @method updateSearchQuery
   * @param  {Object} event - Native DOM event.
   * @return {Void}
   */
  updateSearchQuery = async event => {
    await this.setState({
      searchQuery: event.target.value.trim(),
    });

    // prevent unneccessary API calls when user isn't searching anything
    if (!this.state.searchQuery.length) {
      this.setState({
        searchResults: [],
      });
      return;
    }

    // fetch the books according to the user's query
    this.getSearchResults();
  };

  /**
   * Fetches the books matching the user's search query.
   * @method getSearchResults
   * @return {Void)
   */
  getSearchResults = async () => {
    try {
      // make AJAX call to the API
      let results = await search(this.state.searchQuery, 10);
      // handle cases when API responds with an "empty query" object. Objects
      // shouldn't be stored in searchResults since its type Array
      if (results.constructor !== Array) results = [];

      // update the state to reflect the results
      this.setState({
        searchResults: results,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    console.log('rerender');
    return (
      <div className="search-books">
        {/* Search bar component which updates search query. */}
        <SearchBar onQuery={this.updateSearchQuery} />

        {/* The search results in accordance to the search query. */}
        <BooksGrid books={this.state.searchResults} />
      </div>
    );
  }
}

export default SearchPage;
