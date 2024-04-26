import { v4 as uuidv4 } from "uuid";

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { age, password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const id = uuidv4();

    const newUser = {
      id,
      age,
      password: hashedPassword,
      email,
      role,
    };

    User.createUser(newUser, (err, result) => {
      if (err) {
        console.error("Failed: ", err);
        res.status(500).json({ message: "Failed" });
        return;
      }
      console.log("Created");
      res.status(201).json({ message: "Created", user: result });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
    register,
}