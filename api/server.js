const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
