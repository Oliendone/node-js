const express = require("express");
const router = express.Router();

const ContactsControllers = require("./contacts.controllers");

router.get("/", ContactsControllers.getContacts);

router.get("/:id", ContactsControllers.getContactById);

router.post(
  "/",
  ContactsControllers.validateAddContact,
  ContactsControllers.addContact
);

router.delete("/:id", ContactsControllers.removeContact);

router.patch("/:id", ContactsControllers.updateContact);

module.exports = router;
