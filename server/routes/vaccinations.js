const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require("../database/db");

const legalDate = (inputDate) => {
  if (inputDate != null || inputDate != "") {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    const str = `${year}-${month}-${day}`;
    if (str === `NaN-NaN-NaN`) {
      return null;
    } else {
      return str;
    }
  }
  return null;
};

// GET all vaccinations for patient
router.get("/:p_id", (req, res) => {
  const p_id = req.params.p_id;
  if (!p_id) {
    return res.status(400).send("Required fields are missing");
  }
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      //500 - Internal server error
      return res.status(500).send("An error occurred");
    }

    // Prepare and execute the SQL query
    query = "SELECT * FROM vaccinations WHERE p_id = ?";
    connection.query(query, [p_id], (err, results) => {
      connection.release();
      if (err) {
        console.error("Error executing query:", err);
        //500 - Internal server error
        return res.status(500).send("An error occurred");
      } else {
        console.log(results);
        res.json(results);
      }
    });
  });
});

// POST new vaccination for patient with id
router.post("/:p_id", (req, res) => {
  const p_id = req.params.p_id;
  // Retrieve patient data from request body
  const { vac_date, vac_manufacturer } = req.body;

  // Basic Validation (Add more validations as per your requirement)
  if (!p_id || !vac_date || !vac_manufacturer) {
    return res.status(400).send("Required fields are missing");
  }
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return res
        .status(500)
        .send("An error occurred while connecting to the database");
    }
    // Prepare SQL query
    const query =
      "INSERT INTO vaccinations (p_id, vac_date, vac_manufacturer) VALUES (?, ?, ?)";
    // Execute SQL query to insert new patient
    connection.query(
      query,
      [p_id, legalDate(vac_date), vac_manufacturer],
      (err, results) => {
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res
            .status(500)
            .send("An error occurred while executing the query");
        }
        res.status(201).send({ id: results.insertId });
      }
    );
  });
});

// UPDATE vaccination with id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  // Retrieve patient data from request body
  const { vac_date, vac_manufacturer } = req.body;

  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return res
        .status(500)
        .send("An error occurred while connecting to the database");
    }
    // Prepare SQL query
    const query =
      "UPDATE vaccinations SET vac_date = ?, vac_manufacturer = ? WHERE id = ?";
    // Execute SQL query to insert new patient
    connection.query(
      query,
      [vac_date, vac_manufacturer, id],
      (err, results) => {
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res
            .status(500)
            .send("An error occurred while executing the query");
        }
        res.status(200).send({ id: results.affectedRows });
      }
    );
  });
});

// DELTET vaccination with id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      //500 - Internal server error
      return res.status(500).send("An error occurred");
    }

    // Prepare and execute the SQL query
    query = "DELETE FROM vaccinations WHERE id = ?";
    connection.query(query, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .send("An error occurred while executing the query");
      }
      res.status(200).send({ id: results.affectedRows });
    });
  });
});

module.exports = router;
