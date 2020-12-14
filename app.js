const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./api/contacts.routers");

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
    this.handlingErrors();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(logger("dev"));
    this.server.use(cors({ origin: "http://localhost:3000" }));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  handlingErrors() {
    this.server.use((_, res, __) => {
      res.status(404).json({
        message: "Not found",
      });
    });
  }

  startListening() {
    this.server.listen(3000, () => {
      console.log("Server started listening on port 3000");
    });
  }
};
