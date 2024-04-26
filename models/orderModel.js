const db = require("../config/db.config");

class Order {
  constructor(order) {
    this.id = order.id;
    this.numberOfProduct = order.numberOfProduct;
    this.totalCost = order.totalCost;
    this.timePurchase = order.timePurchase;
    this.idCustomer = order.idCustomer;
    this.idEmployee = order.idEmployee;
    this.deleveryAddress = order.deleveryAddress;
    this.deleveryFee = order.deleveryFee;
  }

  static getOrders(result, limit = 30, req = null) {
    let queryParams = [];
    let query = "SELECT * FROM order";

    if (req) {
      const conditions = [];

      if (req.id) conditions.push("id = ?");
      if (req.numberOfProduct) conditions.push("numberOfProduct = ?");
      if (req.totalCost) conditions.push("totalCost = ?");
      if (req.timePurchase) conditions.push("timePurchase = ?");
      if (req.idCustomer) conditions.push("idCustomer = ?");
      if (req.idEmployee) conditions.push("idEmployee = ?");
      if (req.deleveryAddress) conditions.push("deleveryAddress = ?");
      if (req.deleveryFee) conditions.push("deleveryFee = ?");

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ") + " LIMIT ?";
        queryParams = Object.values(req);
      }
      queryParams += [limit];
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

  static getOrderByRangeDate(startDate, endDate, result) {
    db.query(
      "SELECT * FROM Order WHERE Time_Of_Purchase BETWEEN ? AND ?",
      [startDate, endDate],
      (err, res) => {
        if (err) {
          console.error("Error", err);
          result(err, null);
          return;
        }

        console.log("Successfully");
        result(null, res);
      }
    );
  }

  static deleteOrderById(id) {}
}

module.exports = Order;
