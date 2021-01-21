const mongoose = require("mongoose");
require("dotenv").config();
const uriDB = process.env.DB_URL;

const db = mongoose.connect(uriDB, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("disconnected", () => {
  console.log("Database connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB stops");
    process.exit(1);
  });
});

module.exports = db;
