/*
File name: contact.js
Author's name: Sisi Li
Web site name: Sisi's Portfilo
File description: this is a file to define the contact table model
*/

let mongoose = require('mongoose');

// create a model class
let contactsSchema = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsSchema);