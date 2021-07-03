const express = require("express");
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contactsValidation");
const modulesMiddelware = require("../../validation/models");
const ObjectId = require("mongodb").ObjectID;
router.use(modulesMiddelware);

router.get("/", async (req, res, next) => {
  const contacts = await req.db.Contacts.find({}).toArray();

  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await req.db.Contacts.findOne({
    _id: ObjectId(req.params.contactId),
  });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", validateCreateContact, async (req, res, next) => {
  const record = {
    ...req.body,
    ...(req.body.favorite ? {} : { favorite: false }),
  };
  const contacts = await req.db.Contacts.insertOne(record);
  res.status(201).json(contacts);
});

router.delete("/:contactId", async (req, res, next) => {
  const contacts = await req.db.Contacts.deleteOne({
    _id: ObjectId(req.params.contactId),
  });
  return res.status(200).json({ status: "success" });
});

router.patch("/:contactId", validateUpdateContact, async (req, res, next) => {
  const contacts = await req.db.Contacts.updateOne(
    {
      _id: ObjectId(req.params.contactId),
    },
    { $set: req.body }
  );
  if (!contacts) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contacts);
});

router.patch("/:contactId/favorite", async (req, res, next) => {});

module.exports = router;
