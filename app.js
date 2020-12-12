const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const router = require("./api/index");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(logger("dev"));

app.use(cors());

app.use("/api/contacts", router);

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port 3000");
});
