const Branch = require("../models/branchsModel");

const getBranchs = async (req, res) => {
    Branch.getBranchs((err, data) => {
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
    getBranchs,
    
};