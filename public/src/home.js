const { sortAccountsByLastName } = require("./accounts");
const { partitionBooksByBorrowedStatus } = require("./books");

// a function to count number of books
function getTotalBooksCount(books) {
  return books.length;
}

// a function to count number of accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}
// a function to count how many currently loaned out books there are
function getBooksBorrowedCount(books) {
  const partitioned = partitionBooksByBorrowedStatus(books);
  return partitioned[0].length;
}

// makes a top 5 list of common genres
function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];

  genres.forEach((genre) => {
    // list all the books of the given genre
    const genreBooks = books.filter((book) => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return sortTopFiveCount(genres, countList);
}

// makes a list of popular books (Top 5)
function getMostPopularBooks(books) {
  const bookList = [];
  const bookIdList = [];
  const countList = [];

  books.forEach((book) => {
    // test if books are being listed multiple times
    if (!bookIdList.includes(book.id)) {
      bookIdList.push(book.id);
      // make lists of titles and selected books number of borrows
      bookList.push(book.title);
      countList.push(book.borrows.length);
    }
  });
  return sortTopFiveCount(bookList, countList);
}

// makes a list of popular authors (Top 5)
function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const authorIdList = [];
  const countList = [];

  authors.forEach((author) => {
    // test if authors are being listed multiple times
    if (!authorIdList.includes(author.id)) {
      authorIdList.push(author.id);
      // makes formatted list of author names
      authorList.push(`${author.name.first} ${author.name.last}`);
      const authorBooks = books.filter((book) => book.authorId === author.id);
      const authorBooksBorrows = authorBooks.map((book) => book.borrows.length);
      countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });

  return sortTopFiveCount(authorList, countList);
}

//Helper functions are below

// takes an array of descriptors and makes an array of objects in this format
function makeNameAndCountArray(nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({ name: desc, count: countList[index] });
    return acc;
  }, []);
  return result;
}
// a function to create the formatted return for all the top 5 lists here
function sortTopFiveCount(nameList, countList) {
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}

// puts an array of name / count objects into order from highest to lowest count
function orderByCount(nameCount) {
  return nameCount.sort((placeA, placeB) => placeB.count - placeA.count);
}

// a function to shorten a list to 5 or less items
function topFive(list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

// a function to list all genres
function getAllGenres(books) {
  const genres = [];
  books.forEach((book) => {
    // test for a genre being listed multiple times
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
