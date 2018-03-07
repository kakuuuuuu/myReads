import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
  };

  state = {
    query: '',
    status: ''
  };

  updateQuery = (query) => {
    this.setState({ query });
    this.props.onSearch(query);
  };

  render() {
    const { query } = this.state;
    const { books, onUpdate, status } = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {(books.length > 0 && (books.map((book) =>
            <Book
              key={book.id}
              book={book}
              onUpdate={onUpdate}
              />
          ))) || <div>{ status }</div>}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
