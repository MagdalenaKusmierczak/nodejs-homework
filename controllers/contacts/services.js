const Contact = require("../../models/Contact");

const fetchContacts = (owner) => {
  return Contact.find({ owner });
};

const fetchContact = (contactId) => {
  return Contact.findById({ _id: contactId });
};

const insertContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = async ({ contactId, toUpdate, upsert = false }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};

const removeContact = (contactId) => Contact.deleteOne({ _id: contactId });

module.exports = {
  fetchContacts,
  fetchContact,
  insertContact,
  updateContact,
  removeContact,
};
