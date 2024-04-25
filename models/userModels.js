const db = require("../config/db.config");

class User {
  constructor(user) {
    this.id = user.id;
    this.age = user.age;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
  }

  static getUsers(result, req = null) {
    let queryParams = [];
    let query = "SELECT * FROM users";

    if (req) {
      const conditions = [];

      if (req.id) conditions.push("id = ?");
      if (req.age) conditions.push("age = ?");
      if (req.password) conditions.push("password = ?");
      if (req.email) conditions.push("email = ?");
      if (req.role) conditions.push("role = ?");

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

  static createUser(result, user) {
    db.query(
      "INSERT INTO users (id, age, password, email, role) VALUES (?, ?, ?, ?, ?)",
      [user.id, user.age, user.password, user.email, user.role],
      (err, res) => {
        if (err) {
          console.error("Failed: ", err);
          result(err, null);
          return;
        }

        console.log("Created");
        result(null, { user });
      }
    );
  }
}

module.exports = User;
