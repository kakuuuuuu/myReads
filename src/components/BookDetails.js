import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class BookDetails extends Component {

  state = {
    book: {}
  }

  /*
  * Loads when component mounts
  * Fetches book via id
  * Stores book object in state
  */
  componentDidMount() {
    BooksAPI.get(this.props.match.params.id).then((book => {
      this.setState({ book })
    }))
  }

  render(){
    const { book } = this.state
    return (
      <div>
        <div className="list-books-title">
          <h1>{book.title}</h1>
        </div>
          <div className="bookshelf">
            <div className="book-cover-details">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://qom.divar.af/s/img/no-picture-thumbnail.9cc062246834.png"})` }}></div>
              <Link className="close-search close-details" to="/">Close</Link>
            </div>
            <table className="book-details">
              <tbody>
                <tr>
                  <th>Author(s)</th>
                  <td>{book.authors && (book.authors.map((author) =>
                    <p key={author}>{author}</p>
                  ))}</td>
                </tr>
                <tr>
                  <th>Categories</th>
                  <td>{book.categories && (book.categories.map((category) =>
                    <p key={category}>{category}</p>
                  ))}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{book.description && (<p>{book.description}</p>)}</td>
                </tr>
                <tr>
                  <th>Average Rating</th>
                <td><p>{book.averageRating && ([...Array(Math.floor(book.averageRating))].map((e,i) => <img key={i} style={{width: 50, height: 50}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-Wxae3ccj3I0J3eU-qmJGPALZ5dV-b8tORHCK2vOOTNWxDVr" alt={i}/> ))}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    )
  }
}

export default BookDetails
