const db = require("../config/db.config");

class User {

    constructor(user) {
        this.userId = user.userId;
        this.userAge = user.userAge
    }

    static getAllUser(result) {
        db.query("SELECT * FROM person", (err, res) => {
            if (err) {
                console.error("Error fetching users: ", err);
                result(err, null);
                return;
            }
    
            console.log("Fetched users successfully");
            result(null, res);
        });
    }
    

    static addNewUser(user, result) {
        db.query("INSERT INTO person (ID_Person, Age) VALUES (?, ?)", [user.userId, user.userAge], (err, res) => {
            if (err) {
                console.error("Error creating user: ", err);
                result(err, null);
                return;
            }

            console.log("Created user: ", { id: res.insertId, ...user });
            result(null, { id: res.insertId, ...user });
        });
    }
}

module.exports = User;