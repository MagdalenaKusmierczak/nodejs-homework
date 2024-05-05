const {
  fetchContacts,
  fetchContact,
  insertContact,
  updateContact,
  removeContact,
} = require("./services");

const { postContact, putContact } = require("../../schema/contacts.js");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await fetchContacts(owner);
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;

    const contact = await fetchContact(contactId);
    if (parseInt(contact.owner) !== parseInt(owner)) {
      return res.json({
        status: "rejected",
        code: 401,
        message: "Access denied",
      });
    }
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: contact,
      });
    }
  } catch (error) {
    return res.json({
      status: "rejected",
      code: 404,
      message: "Not found",
    });
  }
};

const removesContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contacts = await fetchContacts();
  const contact = await fetchContact(contactId);

  if (parseInt(contact.owner) !== parseInt(owner)) {
    return res.json({
      status: "rejected",
      code: 401,
      message: "Access denied",
    });
  }

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return res.json({
      status: "success",
      code: 404,
      message: "Contact not found",
    });
  } else {
    try {
      await removeContact(contactId);
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
  const validation = postContact.validate({ name, email, phone });
  if (validation.error) {
    return res.json({
      status: "rejected",
      code: 404,
      message: `${validation.error.message}`,
    });
  } else {
    console.log("Data is valid");
  }

  const { _id: owner } = req.user;
  try {
    if (!name || !email || !phone) {
      return res.json({
        status: "rejected",
        code: 400,
        message: "missing required name - field",
      });
    } else {
      const newContact = await insertContact({ name, email, phone, owner });
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
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await fetchContact(contactId);
  if (parseInt(contact.owner) !== parseInt(owner)) {
    return res.json({
      status: "rejected",
      code: 401,
      message: "Access denied",
    });
  }

  const contacts = await fetchContacts();
  const body = req.body;

  const index = contacts.findIndex((contact) => contact.id === contactId);

  const validation = putContact.validate({ ...body });
  if (validation.error) {
    return res.json({
      status: "rejected",
      code: 404,
      message: `${validation.error.message}`,
    });
  } else {
    console.log("Data is valid");
  }
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
      const updatedContact = await updateContact({
        contactId,
        toUpdate: req.body,
        upsert: true,
      });
      return res.json({
        status: "success",
        code: 200,
        data: { updatedContact },
      });
    } catch (error) {
      next(error);
    }
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { _id: owner } = req.user;
  const contact = await fetchContact(contactId);
  if (parseInt(contact.owner) !== parseInt(owner)) {
    return res.json({
      status: "rejected",
      code: 401,
      message: "Access denied",
    });
  }

  if (!favorite) {
    return res.json({
      status: "rejected",
      code: 400,
      message: "Missing field favorite",
    });
  } else {
    try {
      const updatedContact = await updateContact({
        contactId,
        toUpdate: req.body,
      });
      if (!updatedContact) {
        return res.json({
          status: "rejected",
          code: 404,
          message: "Not found",
        });
      } else {
        return res.json({
          status: "success",
          code: 200,
          data: { updatedContact },
        });
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removesContact,
  addContact,
  updateContacts,
  updateStatusContact,
};
