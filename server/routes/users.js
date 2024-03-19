const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require("../database/db");

// GET user by id
router.get("/:id", (req, res) => {
 
});

// GET user
router.post("/", (req, res) => {
 
});

//PUT - update user
router.put("/:id", (req, res) => {
  
});

module.exports = router;
