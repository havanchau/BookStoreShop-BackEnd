var express = require("express");
var mysql = require("mysql2");
const { query } = require("mysql2/promise");
const cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
const dbConnect = require("./config/db.config");

app.use(cors());
app.use(bodyParser.json());

app.get("", function (req, res) {
  res.send("<h1>Hello</h1>");
});

app.get("/api/branch", async function (req, res) {
  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Branch");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/employees", async function (req, res) {
  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Employees");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/employees/:ID_Employee", async function (req, res) {
  const ID_Employee = req.params.ID_Employee;

  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Employees WHERE ID_Employee = ?", [ID_Employee]);

    if (rows.length > 0) {
      res.json(rows[0]); // Return the employee information
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/employees/:ID_Employee", async function (req, res) {
  const ID_Employee = req.params.ID_Employee;

  try {
    const [result] = await dbConnect
      .promise()
      .query("DELETE FROM Employees WHERE ID_Employee = ?", [ID_Employee]);

    if (result.affectedRows > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/employees/:employeeId", async function (req, res) {
  const employeeId = req.params.employeeId;

  const {
    Fname,
    Minit,
    Lname,
    Phone,
    Employee_Start_Date,
    Employee_Address,
    Salary,
    ID_Branch,
    Number_Work_Days_Of_Month,
    Email_Address,
  } = req.body;

  try {
    const [result] = await dbConnect.promise().query(
      `
        UPDATE Employees 
        SET 
          Fname = ?, 
          Minit = ?, 
          Lname = ?, 
          Phone = ?, 
          Employee_Start_Date = ?, 
          Employee_Address = ?, 
          Salary = ?, 
          ID_Branch = ?, 
          Number_Work_Days_Of_Month = ?, 
          Email_Address = ? 
        WHERE ID_Employee = ?
      `,
      [
        Fname,
        Minit,
        Lname,
        Phone,
        Employee_Start_Date,
        Employee_Address,
        Salary,
        ID_Branch,
        Number_Work_Days_Of_Month,
        Email_Address,
        employeeId,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/books", async function (req, res) {
  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Book LIMIT 50");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/book/:isbn", async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Book WHERE ISBN = ?", [isbn]);

    if (rows.length > 0) {
      res.json(rows[0]); // Trả về thông tin của sách có ISBN tương ứng
    } else {
      res.status(404).send("Book not found"); // Trường hợp không tìm thấy sách
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/add/employees", async (req, res) => {
  const {
    ID_Employee,
    Fname,
    Minit,
    Lname,
    Phone,
    Employee_Start_Date,
    Employee_Address,
    Salary,
    ID_Branch,
    Number_Work_Days_Of_Month,
    Email_Address,
  } = req.body;

  const sql =
    "INSERT INTO Employees ( ID_Employee, Fname, Minit, Lname, Phone, Employee_Start_Date, Employee_Address, Salary, ID_Branch, Number_Work_Days_Of_Month, Email_Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  dbConnect.query(
    sql,
    [
      ID_Employee,
      Fname,
      Minit,
      Lname,
      Phone,
      Employee_Start_Date,
      Employee_Address,
      Salary,
      ID_Branch,
      Number_Work_Days_Of_Month,
      Email_Address,
    ],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm nhân viên:", err);
        res.status(500).json({ error: "Lỗi khi thêm nhân viên" });
      } else {
        res.status(201).json({ message: "Nhân viên đã được thêm thành công" });
      }
    }
  );
});

app.post("/api/books", (req, res) => {
  const {
    ISBN,
    Title,
    Author,
    Publisher,
    Discount,
    Edition_Book,
    Cost,
    Age_Requirement,
  } = req.body;
  const sql =
    "INSERT INTO Book (ISBN, Title, Author, Publisher, Discount, Edition_Book, Cost, Age_Requirement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  dbConnect.query(
    sql,
    [
      ISBN,
      Title,
      Author,
      Publisher,
      Discount,
      Edition_Book,
      Cost,
      Age_Requirement,
    ],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm sách:", err);
        res.status(500).json({ error: "Lỗi khi thêm sách" });
      } else {
        res.status(201).json({ message: "Sách đã được thêm thành công" });
      }
    }
  );
});

app.delete("/api/books/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  const sql = "DELETE FROM Book WHERE ISBN = ?";
  dbConnect.query(sql, [ISBN], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa sách:", err);
      res.status(500).json({ error: "Lỗi khi xóa sách" });
    } else {
      res.json({ message: "Sách đã được xóa thành công" });
    }
  });
});

app.put("/api/books/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  const {
    Title,
    Author,
    Publisher,
    Discount,
    Edition_Book,
    Cost,
    Age_Requirement,
  } = req.body;
  const sql =
    "UPDATE Book SET Title=?, Author=?, Publisher=?, Discount=?, Edition_Book=?, Cost=?, Age_Requirement=? WHERE ISBN=?";
  dbConnect.query(
    sql,
    [
      Title,
      Author,
      Publisher,
      Discount,
      Edition_Book,
      Cost,
      Age_Requirement,
      ISBN,
    ],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi sửa thông tin sách:", err);
        res.status(500).json({ error: "Lỗi khi sửa thông tin sách" });
      } else {
        res.json({ message: "Thông tin sách đã được cập nhật thành công" });
      }
    }
  );
});

app.get("/api/top-books/:topNumber", async function (req, res) {
  const topNumber = req.params.topNumber;

  try {
    const [rows, fields] = await dbConnect.promise().query(
      `
        SELECT
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
      [parseInt(topNumber)]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/gettopcustomers", async function (req, res) {
  try {
    const { startDate, endDate, topNumber } = req.body;

    const [rows, fields] = await dbConnect.promise().query(
      `
        CALL GetTopCustomersByOrderCount(
          DATE(?),
          DATE(?),
          ?
        );
      `,
      [startDate, endDate, topNumber]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/employees/search", async function (req, res) {
  const data = req.body.data;

  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("CALL SearchEmployeesProcedure(?);", [data]);

    if (rows[0].length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/api/books/search", async function (req, res) {
  const data = req.body.data;

  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("CALL SearchBooksProcedure(?);", [data]);

    if (rows[0].length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Books not found");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.get("/api/customers", async function (req, res) {
  try {
    const [rows, fields] = await dbConnect
      .promise()
      .query("SELECT * FROM Customer LIMIT 50");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5050);
