const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  await fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);

    return parsedData;
  });
};

const getContactById = async (contactId) => {
  const response = await fs.readFile(contactsPath, "utf-8");

  const contactById = JSON.parse(response).find(
    (contact) => contact.id === contactId
  );

  console.log(contactById);
};

const removeContact = async (contactId) => {
  const response = await fs.readFile(contactsPath, "utf-8");

  const removeById = JSON.parse(response).filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(removeById), (err) => {
    if (err) throw err;
  });

  const updatedContacts = await fs.readFile(contactsPath, "utf-8");

  console.log(JSON.parse(updatedContacts));
};

const addContact = async (name, email, phone) => {
  const response = await fs.readFile(contactsPath, "utf-8");

  const parsedData = JSON.parse(response);

  const id = parsedData.length + 1;

  const contact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };

  parsedData.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(parsedData), (err) => {
    if (err) throw err;
  });

  const updatedContacts = await fs.readFile(contactsPath, "utf-8");

  console.log(JSON.parse(updatedContacts));
};

console.log(listContacts());

module.exports = { listContacts, getContactById, removeContact, addContact };
