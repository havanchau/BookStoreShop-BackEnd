const Branch = require("../models/branchsModel");

const getAllBranch = (req, res) => {
    Branch.getAllBranch((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all Branch."
            });
        } else {
            res.send(data);
        }
    });
}


module.exports = Branch;