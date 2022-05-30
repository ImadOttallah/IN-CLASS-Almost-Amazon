import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getAuthorBooks(authorObject.firebaseKey)
        .then((authorsBooks) => {
          resolve({ authorsBooks, ...authorObject });
        });
    }).catch((error) => reject(error));
});

// New
const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
      // deleteSingleAuthor(authorId).then((response) => resolve(response));
    });
  }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
