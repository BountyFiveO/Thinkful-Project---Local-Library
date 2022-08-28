const { findAuthorById } = require("./books.js");

function findAccountById(accounts, id) {
  const findAccount = accounts.find((account) => account.id === id);
  console.log(findAccount);
  return findAccount;
}

function sortAccountsByLastName(accounts) {
  const accountsByLast = accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
  console.log(accountsByLast);
  return accountsByLast;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBookBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    for (let b = 0; b < books[i].borrows.length; b++) {
      if (account.id === books[i].borrows[b].id) {
        totalBookBorrows += 1;
      }
    }
  }
  return totalBookBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned && borrow.id === account.id)
  );
  const borrowedResult = [];
  borrowedBooks.forEach((book) => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    borrowedResult.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return borrowedResult;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
