import { v4 as uuidv4 } from "uuid";

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const signup = async (req, res, next) => {
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

    const user = new User({
      id,
      age,
      password: hashedPassword,
      email,
      role,
    });

    User.createUser(newUser, (err, result) => {
      res.status(201).json({ message: "Created", user: result });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUser({ email: email });

    if (!user) {
      const error = new Error("Not found");
      error.statusCode = 401;
      throw error;
    }

    const isEqualPass = await bcrypt.compare(password, user.password);

    if (!isEqualPass) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id.toString(),
        userType: user.userType,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, userInfo: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
