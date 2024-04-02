var express = require("express");
var mysql = require("mysql2");
const { query } = require("mysql2/promise");
const cors = require("cors");

const userRoute = require('./routes/userRoute');

var app = express();
var bodyParser = require("body-parser");
const dbConnect = require("./config/db.config");

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5050;

app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
