const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const http = require("http");
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create an HTTP server

const port = process.env.PORT || 3500;

// Require the route files
const usersRoute = require("./routes/user");
const patientsRoute = require("./routes/patients");
const statisticsRoute = require("./routes/statistics");
const vaccinationsRoute = require("./routes/vaccinations");

app.use(cors());

// use the route files
app.use("/api/user", usersRoute);
app.use("/api/patients", patientsRoute);
app.use("/api/statistics", statisticsRoute);
app.use("/api/vaccinations", vaccinationsRoute);


server.listen(port, () => {
  console.log("Server is running on port 3500");
});

app.get("/", (req, res) => {
  res.send("hello!");
});

