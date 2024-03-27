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

// GET all patients
router.get("/", (req, res) => {
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      //500 - Internal server error
      return res.status(500).send("An error occurred");
    }

    // Prepare and execute the SQL query
    query = "SELECT * FROM patients";
    connection.query(query, (err, results) => {
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

// GET Patient by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  // Connect to the database
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      //500 - Internal server error
      return res.status(500).send("An error occurred");
    }

    // Prepare and execute the SQL query
    query = "SELECT * FROM patients WHERE id = ?";
    connection.query(query, [id], (err, results) => {
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

// POST new Patient
router.post("/", (req, res) => {
  // Retrieve patient data from request body
  const {
    id,
    name,
    city,
    address,
    birth_date,
    phone,
    mobile_phone,
    positive_result_date,
    recovery_date,
  } = req.body;

  console.log(req.body);

  // Basic Validation (Add more validations as per your requirement)
  if (
    !id ||
    !name ||
    !city ||
    !address ||
    !birth_date ||
    !phone ||
    !mobile_phone
  ) {
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
      "INSERT INTO patients (id, name, city, address, birth_date, phone, mobile_phone, positive_result_date, recovery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // Execute SQL query to insert new patient
    connection.query(
      query,
      [
        id,
        name,
        city,
        address,
        legalDate(birth_date),
        phone,
        mobile_phone,
        legalDate(positive_result_date),
        legalDate(recovery_date),
      ],
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

// UPDATE Patient
router.put("/:id", (req, res) => {
  const id = req.params.id;
  // Retrieve patient data from request body
  const {
    name,
    city,
    address,
    birth_date,
    phone,
    mobile_phone,
    positive_result_date,
    recovery_date,
  } = req.body;

  console.log(req.body);
  // Basic Validation (Add more validations as per your requirement)
  if (
    !id ||
    !name ||
    !city ||
    !address ||
    !birth_date ||
    !phone ||
    !mobile_phone
  ) {
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
      "UPDATE patients SET name = ?, city = ?, address = ?, birth_date = ?, phone = ?, mobile_phone = ?, positive_result_date = ?, recovery_date = ? WHERE id = ?";
    // Execute SQL query to insert new patient
    connection.query(
      query,
      [
        name,
        city,
        address,
        legalDate(birth_date),
        phone,
        mobile_phone,
        legalDate(positive_result_date),
        legalDate(recovery_date),
        id,
      ],
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

// DELTET Techer (also delete user)
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
    query = "DELETE FROM patients WHERE id = ?";
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
