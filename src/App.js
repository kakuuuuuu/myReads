import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import Search from './components/Search';
import BookDetails from './components/BookDetails';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {

  state = {
    books: [],
    searchedBooks: [],
    typingTimeOut: 0,
    status: ''
  }

  /*
  * Loads when component mounts
  * fetches books already saved to shelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books => {
      this.setState({ books });
    }));
  }

  /*
  * Updates book to different shelf
  * bookToUpdate - Book object being updated
  * shelf - Shelf book moved to
  * Updates the book in state.books array
  */
  updateBook = (bookToUpdate, shelf) => {
    bookToUpdate.shelf = shelf;
    BooksAPI.update(bookToUpdate, shelf).then((book) => {
      this.setState({book});
    });
  }

  /*
  * Adds book from search to shelf
  * book - Book retrieved from search
  * shelf - Shelf book moved to
  * Adds object to state.books array, empties searched books array and status
  * Calls updateBook function to update the book via API
  */
  addBook = (book, shelf) => {
    this.setState(state => ({
        books: state.books.concat([ book ]),
        searchedBooks: [],
        status: ''
      }));
    this.updateBook(book, shelf);
  }

  /*
  * Searches books by query
  * query - String used to query search API
  * Checks for timeout and clears if preexisting
  * Clears prior searched books array
  * Sets status to 'Searching...'
  * Exits if query is empty
  * Displays 'No Books Found' if API returns with error
  * If no errors, retrieves books array from search API and cross references id with books on shelf
  * If matched, shelf attribute added to book
  * Stores books into state.searchedBooks array
  * Empties status and sets 1000 millisecond timeout
  */
  searchBooks = (query) => {
    if (this.state.typingTimeout) {
       clearTimeout(this.state.typingTimeout);
    }
    this.clearSearch();
    this.setState({
       status: "Searching...",
       typingTimeout: setTimeout(() => {
         if (query.length > 0) {
           BooksAPI.search(query.trim()).then((books) => {
             if (books.error) {
               this.setState({status: 'No Books Found'});
             } else {
               this.setState({
                 searchedBooks: books.map((searchedBook) => {
                   this.state.books.map((shelfBook) => {
                     if(searchedBook.id === shelfBook.id){
                       searchedBook.shelf = shelfBook.shelf;
                     }
                     return searchedBook;
                   })
                   return searchedBook;
                 })
               })
            }
           })
         }
       }, 1000)
    });
  }

  clearSearch = () => {
    this.setState({searchedBooks: [], status: ''})
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
          books={this.state.books}
          onUpdate={this.updateBook}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <Search
            books={this.state.searchedBooks}
            onSearch={this.searchBooks}
            onUpdate={(bookId, shelf) => {
              this.addBook(bookId, shelf)
              history.push('/')
            }}
            status={this.state.status}
            clearSearch={this.clearSearch}
          />
        )}/>
        <Route path='/book/:id' component={BookDetails}/>
      </div>
    )
  }
}

export default BooksApp
