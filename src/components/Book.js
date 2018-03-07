import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  render () {
    const { book, onUpdate } = this.props
    return(
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <Link className='book-details-link' to={`/book/${book.id}`}><div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://qom.divar.af/s/img/no-picture-thumbnail.9cc062246834.png"})` }}></div></Link>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) => onUpdate(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && (book.authors.map((author) =>
            <div className="book-authors" key={author}>{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book
