const express = require("express");
const auth = require("../../middlewares/authenticate");

const {
  listContacts,
  getContactById,
  removesContact,
  addContact,
  updateContacts,
  updateStatusContact,
} = require("../../controllers/contacts/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, listContacts);

contactsRouter.get("/:contactId", auth, getContactById);

contactsRouter.post("/", auth, addContact);

contactsRouter.delete("/:contactId", auth, removesContact);

contactsRouter.put("/:contactId", auth, updateContacts);

contactsRouter.patch("/:contactId/favorite", auth, updateStatusContact);

module.exports = contactsRouter;
