import { v4 as uuidv4 } from "uuid";

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

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
  login,
};
