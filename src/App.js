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
    typing: false,
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
  *
  */
  addBook = (book, shelf) => {
    BooksAPI.get(book.id).then((book) => {
      book.shelf = shelf;
      this.setState(state => ({
          books: state.books.concat([ book ]),
          searchedBooks: [],
          status: ''
        }));
        this.updateBook(book, shelf);
    });
  }

  searchBooks = (query) => {
    if (this.state.typingTimeout) {
       clearTimeout(this.state.typingTimeout);
    }
    this.setState({
       searchedBooks: [],
       status: "Searching...",
       typing: false,
       typingTimeout: setTimeout(() => {
         if (query.length > 0) {
           BooksAPI.search(query.trim()).then((books) => {
             if (books.error) {
               this.setState({status: "No Books Found"});
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
         } else {
           this.setState({status: ''});
         }
       }, 1000)
    });
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
          />
        )}/>
        <Route path='/book/:id' component={BookDetails}/>
      </div>
    )
  }
}

export default BooksApp
