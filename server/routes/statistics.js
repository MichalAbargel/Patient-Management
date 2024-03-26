const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require("../database/db");

// GET active_patients for current month
router.get("/activePatients", (req, res) => {
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      //500 - Internal server error
      return res.status(500).send("An error occurred");
    }

    const query =
      "CALL GetActivePatientsCountForCurrentMonth(@date_param, @active_patients_count)";

    // Send the response to the client
    connection.query(query, (err, results) => {
      connection.release();
      if (err) {
        console.log("Error executing stored procedure: " + err.stack);
        connection.release();
        return res.status(500).send("Error executing stored procedure");
      }
      connection.release();
      results.pop();

      const dates = [];
      const activePatientsCount = [];

      results.forEach((entry) => {
        dates.push(entry[0].date_param);
        activePatientsCount.push(entry[0].active_patients_count);
      });
      res.json({ dates, activePatientsCount });
    });
  });
});

module.exports = router;
