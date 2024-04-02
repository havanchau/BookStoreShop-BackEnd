const User = require("../models/userModels");

const getAllUser = (req, res) => {
    User.getAllUser((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all User."
            });
        } else {
            res.send(data);
        }
    });
}

const addNewUser = (req, res) => {
    const newUser = new User(req.body);

    User.addNewUser(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        } else {
            res.send(data);
        }
    });

}

module.exports = {
    getAllUser,
    addNewUser,

}