const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const {
  fetchContacts,
  fetchContact,
  insertContact,
  updateContact,
  removeContact,
} = require("./services");

const listContacts = async (req, res, next) => {
  try {
    const data = await fetchContacts();
    const contactsList = await JSON.parse(data);
    res.json({
      status: "success",
      code: 200,
      data: { contactsList },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await fetchContact(req.params.id);
    if (!contact) {
      return res.json({
        status: "rejected",
        code: 404,
        message: "Not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return res.json({
      status: "success",
      code: 404,
      message: "Contact not found",
    });
  } else {
    try {
      await removeContact(id);
      return res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
      });
    } catch (error) {
      next(error);
    }
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (!name || !email || !phone) {
      return res.json({
        status: "rejected",
        code: 400,
        message: "missing required name - field",
      });
    } else {
      const newContact = await insertContact({ name, email, phone });
      return res.json({
        status: "success",
        code: 201,
        data: { newContact },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContacts = async (req, res, next) => {
  const contacts = listContacts();
  const contactId = req.params;
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return res.json({
      status: "rejected",
      code: 404,
      message: "Contact wasn't found",
    });
  } else if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  } else {
    try {
      const updateContact = await updateContact({
        contactId,
        toUpdate: req.body,
        upsert: true,
      });
      return res.json({
        status: "success",
        code: 200,
        data: { updateContact },
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
