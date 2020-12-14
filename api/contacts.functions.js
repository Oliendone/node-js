const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = () => {
  try {
    return JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }
};

const singleContactById = (contactId) => {
  try {
    const parsedData = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    const contactById = parsedData.find((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = ({ name, email, phone }) => {
  try {
    const parsedData = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));

    let newId;

    parsedData.forEach((data, index) => {
      if (index === parsedData.length - 1) {
        newId = data.id + 1;
      }
    });

    const newContact = {
      id: newId,
      name: name,
      email: email,
      phone: phone,
    };

    parsedData.push(newContact);

    fs.writeFileSync(contactsPath, JSON.stringify(parsedData));

    return JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }
};

const removeContact = (contactId) => {
  try {
    const parsedData = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    const removeById = parsedData.filter((contact) => contact.id !== contactId);

    fs.writeFileSync(contactsPath, JSON.stringify(removeById));
    return JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }
};

const editContact = (contactId, body) => {
  try {
    const parsedData = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    const requiredContact = parsedData.find(
      (contact) => contact.id === contactId
    );
    const othersContacts = parsedData.filter(
      (contact) => contact.id !== contactId
    );

    const updatedContact = { ...requiredContact, ...body };

    fs.writeFileSync(
      contactsPath,
      JSON.stringify([...othersContacts, updatedContact])
    );
    return JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  singleContactById,
  addContact,
  removeContact,
  editContact,
};
