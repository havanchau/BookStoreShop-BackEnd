const db = require("../config/db.config");

class Branch {
  constructor(branch) {
    this.branchId = branch.branchId;
    this.branchName = branch.branchName;
    this.branchHotline = branch.branchHotline;
    this.branchNumberOfStreet = branch.branchNumberOfStreet;
    this.branchDistrict = branch.branchDistrict;
    this.branchCity = branch.branchCity;
  }

  static getBranchs(result) {
    let queryParams = [];
    let query = "SELECT * FROM book";

    if (req) {
      const conditions = [];

      if (req.branchId) conditions.push("branchId = ?");
      if (req.branchName) conditions.push("branchName = ?");
      if (req.branchHotline) conditions.push("branchHotline = ?");
      if (req.branchNumberOfStreet) conditions.push("branchNumberOfStreet = ?");
      if (req.branchDistrict) conditions.push("branchDistrict = ?");
      if (req.branchCity) conditions.push("branchCity = ?");

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
}

Module.export = Branch;
