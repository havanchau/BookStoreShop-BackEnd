const db = require("../config/db.config");

class Book {
  constructor(book) {
    this.isbn = book.isbn;
    this.title = book.title;
    this.author = book.author;
    this.publisher = book.publisher;
    this.discount = book.discount;
    this.editionBook = book.editionBook;
    this.cost = book.cost;
    this.ageRequirement = book.ageRequirement;
  }

  static getBook(result) {
    db.query("SELECT * FROM book", (err, res) => {
      if (err) {
        console.error("Error fetching books: ", err);
        result(err, null);
        return;
      }

      console.log("Fetched books successfully");
      result(null, res);
    });
  }

  static getBookByISBN(isbn, result) {
    db.query("SELECT * FROM Book WHERE ISBN = ?", isbn, (err, res) => {
      if (err) {
        console.error("Error fetching book by ISBN: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Fetched book by ISBN successfully");
        result(null, res[0]);
        return;
      }

      result({ message: "Book not found with ISBN: " + isbn }, null);
    });
  }

  static getBookByAuthor(author, result) {
    db.query("SELECT * FROM Book WHERE Author = ?", author, (err, res) => {
      if (err) {
        console.error("Error fetching book by author: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Fetched book by author successfully");
        result(null, res[0]);
        return;
      }

      result({ message: "Book not found with author: " + author }, null);
    });
  }

  static getBookByInformation(information, result) {
    db.query(
      "SELECT * FROM Book WHERE CONCAT(ISBN, Title, Author, Publisher, Discount, Edition_Book, Cost, Age_requiremnt) LIKE CONCAT('%', ? '%')",
      information,
      (err, res) => {
        if (err) {
          console.error("Error fetching book by this information: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Fetched book by information successfully");
          result(null, res[0]);
          return;
        }

        result(
          { message: "Book not found with this information: " + information },
          null
        );
      }
    );
  }

  static getTopBookSeller(topNumber, result) {
    db.query(
      `SELECT
                  b.ISBN,
                  b.Discount,
                  b.Author,
                  b.Publisher,
                  b.Edition_Book,
                  b.Age_Requirement,
                  b.Title,
                  b.Cost,
                  SUM(ocb.Total_Book) AS Total_Sold
              FROM Book b
              JOIN Order_Contain_Book ocb ON b.ISBN = ocb.ISBN
              JOIN OrderBook ob ON ocb.ID_Order = ob.ID_Order
              GROUP BY b.ISBN, b.Title, b.Cost
              ORDER BY Total_Sold DESC
              LIMIT ?`,
      [parseInt(topNumber)],
      (err, res) => {
        if (err) {
          console.error("Error fetching book by this information: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Fetched book by information successfully");
          result(null, res[0]);
          return;
        }

        result(
          { message: "Book not found with this information: " + information },
          null
        );
      }
    );
  }

  static createNewBook(book, result) {
    db.query(
      "INSERT INTO Book (ISBN, Title, Author, Publisher, Discount, Edition_Book, Cost, Age_Requirement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        book.isbn,
        book.title,
        book.author,
        book.publisher,
        book.discount,
        book.editionBook,
        book.cost,
        book.ageRequirement,
      ],
      (err, res) => {
        if (err) {
          console.error("Error creating book by this information: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Created book by information successfully");
          result(null, res[0]);
          return;
        }

        result({ message: "Can not created book: " }, null);
      }
    );
  }

  static deleteBookByISBN(isbn, result) {
    db.query("DELETE FROM books WHERE ISBN = ?", isbn, (err, res) => {
      if (err) {
        console.error("Error deleting book by ISBN: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ message: "Book not found with ISBN: " + isbn }, null);
        return;
      }

      console.log("Deleted book with ISBN: ", isbn);
      result(null, res);
    });
  }

  static updateInfoBook(updatedBook, result) {
    const {
      isbn,
      title,
      author,
      publisher,
      editionBook,
      cost,
      ageRequirement,
    } = updatedBook;
    db.query(
      "UPDATE books SET title = ?, author = ?, publisher = ?, editionBook = ?, cost = ?, ageRequirement = ? WHERE isbn = ?",
      [title, author, publisher, editionBook, cost, ageRequirement, isbn],
      (err, res) => {
        if (err) {
          console.error("Error updating book information: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ message: "Book not found with ISBN: " + isbn }, null);
          return;
        }

        console.log("Updated book information with ISBN: ", isbn);
        result(null, res);
      }
    );
  }
}

module.exports = Book;
