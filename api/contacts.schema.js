const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 15 },
  email: {
    type: String,
    lowercase: true,
    // validate: () => this.email.includes("@"),
  },
  phone: { type: String, required: true },
});

const contactsModel = mongoose.model("contacts", ContactsSchema);

module.exports = contactsModel;
