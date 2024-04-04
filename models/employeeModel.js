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
}