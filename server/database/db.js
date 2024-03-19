const mysql = require("mysql2");
const dbConfig = {
  host: "mysql-376fea8f-patient-management.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_VheS5OdmT5Ho9vQdQiu",
  port: "25875",
  database: "defaultdb",
};

// Create a connection pool with the provided configuration
const db = mysql.createPool(dbConfig);

module.exports = db;
