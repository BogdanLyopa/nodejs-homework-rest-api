const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contactsValidation')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json(contact)
})

router.post('/', validateCreateContact, async (req, res, next) => {
  const contacts = await addContact(req.body)
  res.status(201).json(contacts)
})

router.delete('/:contactId', async (req, res, next) => {
  const contacts = await removeContact(req.params.contactId)
  return res.status(200).json(contacts)
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  const contacts = await updateContact(req.params.contactId, req.body)
  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }
  return res.status(200).json(contacts)
})

module.exports = router
