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

router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, getContactById);

router.post("/", authenticate, addContact);

router.delete("/:contactId", authenticate, removesContact);

router.put("/:contactId", authenticate, updateContacts);

router.patch("/:contactId/favorite", authenticate, updateStatusContact);

module.exports = contactsRouter;
