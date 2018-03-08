# MyReads Project

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components
        ├── Book.js # Book component to display thumbnail, title and author
        ├── BookDetails.js # Book component to display further details provided by API like: description and rating
        ├── ListBooks.js # Component to display all books on 3 shelves
        └── Search.js # Component to search and display books in database by query
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
## Components

Created a separate subdirectory to organize which files were components.  Descriptions of each individual component are as follows:

### Book.js

A simple component created to reduce redundancy as the same information is displayed multiple times not only on the main page, but also the search page.  Displays basic information for each book including the thumbnail (if it exists), the title and the author(s).  The component takes in the following parameters:
- book: Object containing attributes/meta data for an individual book
- onUpdate: Function passed down by parent to change the book's shelf.  In the case of the search page, the function also adds the book to the state array containing all shelved books.

### BookDetails.js

An extra component created to take advantage of the unused data provided with each book object. Displays thumbnail (if it exists), the title, category(s), author(s), description and rating.  Book id is passed via URL params instead of prop so users can share book URL.

### ListBooks.js

Component used to display all books on shelves: Currently Reading, Want to Read and Read.  Uses Book component to render previews for each book on shelf.  Books displayed by filtering the shelf attribute of each book object rather than creating separate arrays for each shelf.  Upon selecting a new shelf to move a book to, the shelf attribute is updated with the update API as well as the state. The component takes in the following parameters:
- books: Array containing all book objects that are currently shelved.
- onUpdate: Function to pass down to child Book component to update a book's shelf.

### Search.js

Component used to search books in database by query.  Text input will update the query in state.  Typing is buffered by setTimeout to prevent excess calls to search API and to prevent searching until the user has completed their input.  Upon successful query, (no errors, results returned) searchedBooks array from the parent will be updated and rendered with the Book component.  Each new search empties the searchedBooks array to clear prior searches.  Upon failed query, (no results) "No Books Found," will be displayed.  The component takes in the following parameters:
- books: Array from parent [searchedBooks] used to contain search results.
- onSearch: Function passed down by parent to trigger search API upon query change.
- onUpdate: Function to pass down to child Book component to update a book's shelf.  In this case the function will also add the book from search results to shelved books in parent state.
- clearSearch: Function passed down by parent to clear search results and status when component is unmounted.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
