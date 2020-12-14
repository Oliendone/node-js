const {
  listContacts,
  singleContactById,
  addContact,
  removeContact,
  editContact,
} = require("./contacts.functions");

const Joi = require("joi");

class ContactsControllers {
  getContacts(req, res, next) {
    res.status(200).json(listContacts());
  }

  getContactById(req, res, next) {
    res.status(200).json(singleContactById(req.params.id));
  }

  addContact(req, res, next) {
    const result = addContact(req.body);
    res.status(201).send(result);
  }

  removeContact(req, res, next) {
    const id = parseInt(req.params.id);
    removeContact(id);
    res.status(200).send({
      message: "contact deleted",
    });
  }

  updateContact(req, res, next) {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    if (name || email || phone) {
      const result = editContact(id, req.body);

      if (result) res.status(200).send(result);
    } else {
      res.status(400).send({
        message: "missing fields",
      });
    }
  }

  validateAddContact(req, res, next) {
    const createContactRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const result = createContactRules.validate(req.body);
    if (result.error) {
      return res.status(400).send({
        message: "missing required name field",
      });
    }
    next();
  }

  validateUpdateContact(req, res, next) {}
}

module.exports = new ContactsControllers();
