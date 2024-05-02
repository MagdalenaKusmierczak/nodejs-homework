const express = require("express");
const authenticate = require("../../middlewares/authenticate");

const {
  listContacts,
  getContactById,
  removesContact,
  addContact,
  updateContacts,
  updateStatusContact,
} = require("../../controllers/contacts/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, listContacts);

contactsRouter.get("/:contactId", authenticate, getContactById);

contactsRouter.post("/", authenticate, addContact);

contactsRouter.delete("/:contactId", authenticate, removesContact);

contactsRouter.put("/:contactId", authenticate, updateContacts);

contactsRouter.patch("/:contactId/favorite", authenticate, updateStatusContact);

module.exports = contactsRouter;
