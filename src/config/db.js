const mysql = require("mysql2");
require("dotenv").config();


const db = mysql.createPool({
  host: process.env.DB_HOST || "193.203.184.226",
  user: process.env.DB_USER || "u640280979_iyfdashboard",
  password: process.env.DB_PASSWORD || "IYFdashboard999",
  database: process.env.DB_NAME || "u640280979_iyfdashboard",
});

module.exports = db;


// const mysql = require("mysql2");
// const dotenv = require("dotenv");

// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST || "193.203.184.226",
//   user: process.env.DB_USER || "u640280979_iyfdashboard",
//   password: process.env.DB_PASSWORD || "IYFdashboard999",
//   database: process.env.DB_NAME || "u640280979_iyfdashboard",
// });

// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//   } else {
//     console.log("Connected to MySQL Database");
//     connection.release();
//   }
// });

// module.exports = db.promise();
