const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContacts);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
