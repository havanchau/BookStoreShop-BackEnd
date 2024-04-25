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

  static getBooks(result, req = null) {
    let queryParams = [];
    let query = "SELECT * FROM books";

    if (req) {
      const conditions = [];

      if (req.isbn) conditions.push("isbn = ?");
      if (req.title) conditions.push("title = ?");
      if (req.author) conditions.push("author = ?");
      if (req.publisher) conditions.push("publisher = ?");
      if (req.discount) conditions.push("discount = ?");
      if (req.editionBook) conditions.push("editionBook = ?");
      if (req.cost) conditions.push("cost = ?");
      if (req.ageRequirement) conditions.push("ageRequirement = ?");

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
        queryParams = Object.values(req);
      }
    }

    db.query(query, (err, res) => {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Successfuully");
      result(null, res);
    });
  }

  static getTopBooksSeller(topNumber, result) {
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
