const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContacts);
module.exports = router;
