const db = require("../config/db.config")

class Customer extends User {

    constructor(customer) {
        this.id = customer.id;
        this.name = customer.name;
        this.email = customer.email;
        this.physicalAddress = customer.physicalAddress;
        this.totalPayment = customer.totalPayment;
    }

    static getAllCustomer(result) {
        db.query("SELECT * FROM Customer LIMIT 50;", (err, res) => {
            if (err) {
                console.error("Error fetching customers: ", err);
                result(err, null);
                return;
            }
    
            console.log("Fetched customers successfully");
            result(null, res);
        })
    }

    static getCustomerById(customerId, result) {
        db.query("SELECT * FROM Customer WHERE ID_Customer = ?;", customerId, (err, res) => {
            if (err) {
                console.error("Error fetching customer by customer ID: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched customer by customer ID successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Customer not found with ID: " + customerId }, null);
        })
    }

    static getCustomerByName(customerName, result) {
        db.query("SELECT * FROM Customer WHERE Customer_Name LIKE CONCAT('%', ?, '%');", customerName, (err, res) => {
            if (err) {
                console.error("Error fetching customer by name: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched customer by name successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Customer not found with name: " + customerName }, null);
        })
    }

    static getCustomerByAddress(customerAddress, result) {
        db.query("SELECT * FROM Customer WHERE Physical_Address LIKE CONCAT('%', ?, '%');", customerAddress, (err, res) => {
            if (err) {
                console.error("Error fetching customer by address: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched customer by address successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Customer not found with address: " + customerAddress }, null);
        })
    }

    static getTopCustomerBuyBook(startDate, endDate, topNumber, result) {
        db.query("CALL GetTopCustomersByOrderCount(DATE(?), DATE(?), ?);", [startDate, endDate, topNumber], (err, res) => {
            if (err) {
                console.error("Error fetching top customer: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched top customer successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Top customer not found with this information: " + startDate, endDate, topNumber }, null);
        })
    }

    static createNewCustomer(customer, result) {
        db.query("INSERT INTO Customer (ID_Customer, Customer_Name, Physical_Address, Email_Address, Total_Payment) VALUES (?, ?, ?, ?, ?);", [customer.id, customer.name, customer.address, customer.email, customer.totalPayment], (err, res) => {
            if (err) {
                console.error("Error creating customer: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Created customer successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Can not create customer: " + customer }, null);
        })
    }

    static updateInfoCustomer(customer, result) {
        const {id, name, physicalAddress, email, totalPayment} = customer;
        if (!id) {
            console('ID customer can not null');
            return;
        }
        let query = "UPDATE Customer SET";
        let params = [];

        if (name) {
            query += " Customer_Name = ?,";
            params.push(name);
        }
        if (email) {
            query += " Email_Address = ?,";
            params.push(email);
        }
        if (phoneNumber) {
            query += " Total_Payment = ?,";
            params.push(phoneNumber);
        }
        if (address) {
            query += " Physical_Address = ?,";
            params.push(address);
        }

        query = query.slice(0, -1) + " WHERE ID_Customer = ?";
        params.push(id);

        db.query(query, params, (err, res) => {
            if (err) {
                console.error("Error updating customer information: ", err);
                result(err, null);
                return;
            }
    
            if (res.affectedRows == 0) {
                result({ message: "Customer not found with ID: " + id }, null);
                return;
            }
    
            console.log("Updated customer information with ID: ", id);
            result(null, res);
        });
    }

}

module.exports = Customer