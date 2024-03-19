const mysql = require("mysql2");
const dbConfig = {
  host: "q85.h.filess.io",
  user: "privatelessonsDB_greaterson",
  password: "6565c41a86e014c38a5c5f7f918c3c3628a8d733",
  port: "3306",
  database: "privatelessonsDB_greaterson",
};

// Create a connection pool with the provided configuration
const db = mysql.createPool(dbConfig);

module.exports = db;
