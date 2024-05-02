const express = require("express");

const {
  listContacts,
  getContactById,
  removesContact,
  addContact,
  updateContacts,
  updateStatusContact,
} = require("../../controllers/contacts/contacts");

const contactsRouter = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removesContact);

router.put("/:contactId", updateContacts);

router.patch("/:contactId/favorite", updateStatusContact);




module.exports = contactsRouter;
