const db = require("../config/db.config");

class Employee extends User {
    constructor(employee) {
        this.id = employee.id;
        this.name = employee.name;
        this.phone = employee.phone;
        this.startDate = employee.startDate;
        this.address = employee.address;
        this.salary = employee.salary;
        this.idBranch = employee.idBranch;
        this.numDayWorkOfMonth = employee.numDayWorkOfMonth;
    }

    static getAllEmployee(result) {
        db.query("SELECT * FROM Employees LIMIT 50;", (err, res) => {
            if (err) {
                console.error("Error fetching employees: ", err);
                result(err, null);
                return;
            }
    
            console.log("Fetched employees successfully");
            result(null, res);
        })
    }

    static getEmployeeById(employeeId, result) {
        db.query("SELECT * FROM Employees WHERE ID_Employee = ?;", employeeId, (err, res) => {
            if (err) {
                console.error("Error fetching employee by employee ID: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched employee by employee ID successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Employee not found with ID: " + employeeId }, null);
        })
    }

    static getEmployeeByName(employeeName, result) {
        db.query("SELECT * FROM Employees WHERE CONCAT(Fname, Minit, Lname) LIKE CONCAT('%', ?, '%');", employeeName, (err, res) => {
            if (err) {
                console.error("Error fetching employee by name: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched employee by name successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Employee not found with name: " + employeeName }, null);
        })
    }

    static getEmployeeByAddress(employeeAddress, result) {
        db.query("SELECT * FROM Employees WHERE Employee_Address LIKE CONCAT('%', ?, '%');", employeeAddress, (err, res) => {
            if (err) {
                console.error("Error fetching employee by address: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched employee by address successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Employee not found with address: " + employeeAddress }, null);
        })
    }

    static getEmployeeByBranch(branch, result) {
        db.query("SELECT * FROM Employees WHERE ID_Branch LIKE CONCAT('%', ?, '%');", branch, (err, res) => {
            if (err) {
                console.error("Error fetching employee by address: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched employee by address successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Employee not found with address: " + branch }, null);
        })
    }

    static getEmployeeByInfor(infor, result) {
        const {id, fname, minit, lname, phone, startDate, address, salary, idBranch, numDayWorkOfMonth, email} = infor;
        db.query("SELECT * FROM Employees WHEN CONCAT(ID_Employee, Fname, Minit, Lname, Phone, Employee_Start_Date, Employee_Address, Salary, ID_Branch, Number_Work_Days_Of_Month, Email_Address) LIKE CONCAT('%', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '%')", [id, fname, minit, lname, phone, startDate, address, salary, idBranch, numDayWorkOfMonth, email], (err, res) => {
            if (err) {
                console.error("Error fetching employee by information: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Fetched employee by information successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Employee not found with information" }, null);
        })
    }

    static getEmployeeByTopSale(startDate, endDate, topNumber, result) {

    }

    static createNewEmployee(employee, result) {
        const {id, fname, minit, lname, phone, startDate, address, salary, idBranch, numDayWorkOfMonth, email} = employee;
        if(!id) {
            console('ID employee can not null');
            return;
        }

        db.query("INSERT INTO Employees (ID_Employee, Fname, Minit, Lname, Phone, Employee_Start_Date, Employee_Address, Salary, ID_Branch, Number_Work_Days_Of_Month, Email_Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, fname, minit, lname, phone, startDate, address, salary, idBranch, numDayWorkOfMonth, email], (err, res) => {
            if (err) {
                console.error("Error creating employee: ", err);
                result(err, null);
                return;
              }
        
              if (res.length) {
                console.log("Created employee successfully");
                result(null, res[0]);
                return;
              }
        
              result({ message: "Can not create employee" }, null);
        })

    }

    static updateInforEmployee(employee, result) {
        const {id, fname, minit, lname, phone, startDate, address, salary, idBranch, numDayWorkOfMonth, email} = employee;
        if(!id) {
            console('ID customer can not null');
            return;
        }

        let query = "UPDATE Employees SET";
        let params = [];

        if (fname) {
            query += " Fname = ? ";
            params.push(fname);
        }

        if (minit) {
            query += " Minit = ? ";
            params.push(minit);
        }

        if (lname) {
            query += " Lname = ? ";
            params.push(minit);
        }

        if (phone) {
            query += " Phone = ? ";
            params.push(phone);
        }

        if (startDate) {
            query += " Employee_Start_Date = ? ";
            params.push(startDate);
        }

        if (address) {
            query += " Employee_Address = ? ";
            params.push(address);
        }

        if (salary) {
            query += " Salary = ? ";
            params.push(salary);
        }

        if (numDayWorkOfMonth) {
            query += " Number_Work_Days_Of_Month = ?";
            params.push(numDayWorkOfMonth);
        }

        if (email) {
            query += " Email = ? ";
            params.push(email);
        }

        query = query.slice(0, -1) + " WHERE ID_Employee = ?";
        params.push(id);


        db.query(query, params, (err, res) => {
            if (err) {
                console.error("Error updating employee information: ", err);
                result(err, null);
                return;
            }
    
            if (res.affectedRows == 0) {
                result({ message: "Employee not found with ID: " + id }, null);
                return;
            }
    
            console.log("Updated employee information with ID: ", id);
            result(null, res);
        });
    }
}

module.exports = Employee;