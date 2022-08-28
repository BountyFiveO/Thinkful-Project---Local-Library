// a function to look up an author given their id number
function findAuthorById(authors, id) {
  return authors.find((author) => id === author.id);
}

// a function to look up a book given its id number
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

// array with 2 nested arrays, 1 for books borrowed & 1 for books unborrowed
function partitionBooksByBorrowedStatus(books) {
  const statusResult = [];
  // if books are returned then put books in borrowed, if not then put books in unborrowed array
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const unborrowedBooks = books.filter((book) => book.borrows[0].returned);
  // push the borrowed books, then the unborrowed books to the statusResult array
  statusResult.push(borrowedBooks);
  statusResult.push(unborrowedBooks);
  return statusResult;
}

// a function to discover everyone who has borrowed a book
function getBorrowersForBook(book, accounts) {
  const borrowed = book.borrows;
  const borrowersResult = [];
  // loop through borrows array, find borrower, and push formatted results to result array
  borrowed.forEach((borrow) => {
    // test for a maximum of 10 borrowers in the array
    if (borrowersResult.length >= 10) return;

    const borrower = accounts.find((account) => account.id === borrow.id);
    const formatBorrow = {
      ...borrow,
      ...borrower,
    };
    borrowersResult.push(formatBorrow);
  });
  console.log(borrowersResult);
  return borrowersResult;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
