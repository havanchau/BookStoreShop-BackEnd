const Branch = require("../models/branchsModel");

const getAllBranch = async (req, res) => {
    Branch.getAllBranch((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all branch."
            });
        } else {
            res.send(data);
        }
    });
}


module.exports = {
    getAllBranch,
    
};