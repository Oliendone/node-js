const {
  listContacts,
  singleContactById,
  addContact,
  removeContact,
  editContact,
} = require("./contacts.functions");

const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");

class ContactsControllers {
  async getContacts(req, res, next) {
    try {
      const users = await listContacts();

      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const userId = req.params.id;

      const userById = await singleContactById(userId);

      return res.status(200).json(userById);
    } catch (error) {
      next(error);
    }
  }

  async addContact(req, res, next) {
    try {
      const result = await addContact(req.body);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const userId = req.params.id;

      const deletedUser = await removeContact(userId);

      if (!deletedUser) {
        res.status(404).send();
      }

      res.status(204).send({
        message: "contact deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    try {
      const userId = req.params.id;

      const updatedUser = await editContact(userId, {
        $set: req.body,
      });

      if (!updatedUser) {
        res.status(404).send();
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  validateId(req, res, next) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    next();
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

  validateUpdateContact(req, res, next) {
    const createContactRules = Joi.object({
      name: Joi.string(),
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
}

module.exports = new ContactsControllers();
