const Contact = require("../../models/Contact");

const fetchContacts = () => {
  return Contact.getAll();
};

const fetchContact = (contactId) => {
  return Contact.findById({ _id: contactId });
};

const insertContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = async ({ contactId, toUpdate, upsert = false }) => {
  return Task.findByIdAndUpdate(
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
