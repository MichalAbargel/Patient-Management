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

// GET number patients who are not vaccinated at all
router.get("/getVaccinatedNumbers", (req, res) => {
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return res.status(500).send("An error occurred");
    }

    const query =
      "CALL GetVaccinatedNumbers(@vaccinated_count, @not_vaccinated_count)";

    connection.query(query, (err, results) => {
      if (err) {
        console.log("Error executing stored procedure: " + err.stack);
        connection.release();
        return res.status(500).send("Error executing stored procedure");
      }

      // Fetch OUT parameters
      connection.query(
        "SELECT @vaccinated_count AS vaccinated_count, @not_vaccinated_count AS not_vaccinated_count",
        (err, parameterResults) => {
          connection.release();
          if (err) {
            console.log("Error fetching OUT parameters: " + err.stack);
            return res.status(500).send("An error occurred");
          }

          const vaccinatedCount = parameterResults[0].vaccinated_count;
          const notVaccinatedCount = parameterResults[0].not_vaccinated_count;
          res.status(200).json({ vaccinatedCount, notVaccinatedCount });
        }
      );
    });
  });
});

module.exports = router;
