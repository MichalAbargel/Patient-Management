const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require("../database/db");

// GET all patients
router.get("/", (req, res) => {
 
});

// GET Patient by id
router.get("/:id", (req, res) => {
 
});

// POST new Patient
router.post("/", (req, res) => {
  
});

// PUT - update Patient
router.put("/:id", (req, res) => {
  
});

// DELTET Techer (also delete user)
router.delete("/:id", (req, res) => {
  
});

module.exports = router;
