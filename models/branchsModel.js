const db = require('../config/db.config');

class Branch {

    constructor(branch) {
        this.branchId = branch.branchId;
        this.branchName = branch.branchName;
        this.branchHotline = branch.branchHotline;
        this.branchNumberOfStreet = branch.branchNumberOfStreet;
        this.branchDistrict = branch.branchDistrict;
        this.branchCity = branch.branchCity;
    }

    static getBranch(result) {
        db.query("SELECT * FROM branchs", (err, res) => {
            if (err) {
                console.error("Error fetching branchs: ", err);
                result(err, null);
                return;
            }
    
            console.log("Fetched branchs successfully");
            result(null, res);
        });
    }

}

Module.export = Branch;