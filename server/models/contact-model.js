const { Schema, model, default: mongoose } = require('mongoose');

// The default:mongoose at destructure is not neccessary coz we r not going to use it.
const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});


// Creating a model or a collection

const Contact = new model("Contact", contactSchema);
module.exports = Contact;