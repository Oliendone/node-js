const express = require("express");
const router = express.Router();

const ContactsControllers = require("./contacts.controllers");

router.get("/", ContactsControllers.getContacts);

router.get(
  "/:id",
  ContactsControllers.validateId,
  ContactsControllers.getContactById
);

router.post(
  "/",
  ContactsControllers.validateAddContact,
  ContactsControllers.addContact
);

router.delete(
  "/:id",
  ContactsControllers.validateId,
  ContactsControllers.removeContact
);

router.patch(
  "/:id",
  ContactsControllers.validateId,
  ContactsControllers.updateContact
);

module.exports = router;
