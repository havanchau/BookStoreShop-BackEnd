const db = require("../config/db.config");

class User {
  constructor(user) {
    this.id = user.id;
    this.age = user.age;
    this.userPassword = user.userPassword;
    this.email = user.email;
    this.userRole = user.userRole;
    this.verified = user.verified
  }

  static getUsers(result, req = null) {
    let queryParams = [];
    let query = "SELECT * FROM users";

    if (req) {
      const conditions = [];

      if (req.id) conditions.push("id = ?");
      if (req.age) conditions.push("age = ?");
      if (req.userPassword) conditions.push("userPassword = ?");
      if (req.email) conditions.push("email = ?");
      if (req.userRole) conditions.push("userRole = ?");
      if (req.verified) conditions.push("verified = ?")

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
      "INSERT INTO users (id, age, userPassword, email, userRole, verified) VALUES (?, ?, ?, ?, ?, ?)",
      [user.id, user.age, user.userPassword, user.email, user.userRole],
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
