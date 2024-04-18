const express = require("express");
const contacts = require("../../models/contacts.js");
const { postContact, putContact } = require("../../schema/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contactsList },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
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
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const validation = postContact.validate({ name, email, phone });
  if (validation.error) {
    throw new Error(`${validation.error.message}`);
  } else {
    console.log("Data is valid");
  }

  const newContact = await contacts.addContact(name, email, phone);
  if (!name || !email || !phone) {
    return res.json({
      status: "rejected",
      code: 400,
      message: "missing required name - field",
    });
  }
  return res.json({
    status: "success",
    code: 201,
    data: { newContact },
  });
});
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    res.json({
      status: "success",
      code: 404,
      message: "Contact not found",
    });
  }
  return res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const updateContact = await contacts.updateContacts(contactId, body);
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ message: "missing fields" });

  const validation = putContact.validate({ ...body });
  if (validation.error) {
    throw new Error(`${validation.error.message}`);
  } else {
    console.log("Data is valid");
  }

  if (!updateContact) {
    const error = new Error("Contact wasn't found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
});
module.exports = router;
