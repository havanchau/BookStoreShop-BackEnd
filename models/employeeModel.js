const db = require("../config/db.config");

class Employee {
    constructor(employee) {
        this.id = employee.id;
        this.fname = employee.fname;
        this.minit = employee.minit;
        this.lname = employee.lname;
        this.phone = employee.phone;
        this.startDate = employee.startDate;
        this.address = employee.address;
        this.salary = employee.salary;
        this.idBranch = employee.idBranch;
        this.numDayWorkOfMonth = employee.numDayWorkOfMonth;
        this.email = employee.email;
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

    }
}

module.exports = Employee;