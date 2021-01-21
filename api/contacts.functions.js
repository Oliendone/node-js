const contactsModel = require("./contacts.schema");

const listContacts = () => {
  return contactsModel.find();
};

const singleContactById = (contactId) => {
  return contactsModel.findById(contactId);
};

const addContact = (body) => {
  return contactsModel.create(body);
};

const removeContact = (contactId) => {
  return contactsModel.findByIdAndRemove(contactId);
};

const editContact = (contactId, body) => {
  return contactsModel.findByIdAndUpdate(contactId, body);
};

module.exports = {
  listContacts,
  singleContactById,
  addContact,
  removeContact,
  editContact,
};
