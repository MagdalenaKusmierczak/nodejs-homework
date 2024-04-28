const express = require("express");

const {
  listContacts,
  getContactById,
  removesContact,
  addContact,
  updateContacts,
  updateStatusContact,
} = require("../../controllers/contacts/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removesContact);

router.put("/:contactId", updateContacts);

router.patch("/:contactId/favorite", updateStatusContact);

router.post("/users/signup");

router.post("/users/login");

router.post("/users/logout");

router.get("/users/current");


module.exports = router;
