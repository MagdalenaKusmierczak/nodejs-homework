const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  const list = await JSON.parse(data);
  return list;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deleteContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newId = nanoid();
  const newContact = { id: newId, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(newContact);
  return newContact;
};

const updateContacts = async (contactId, body) => {
  const contacts = await listContacts();
  const id = contactId;
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
const updatedContacts = contacts.map((contact) => {
  if (contact.id === id) {
    return { ...contact, ...body };
  }
  return contact;
});

  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
