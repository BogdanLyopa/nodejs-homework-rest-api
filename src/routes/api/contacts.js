const express = require('express')
const router = express.Router()
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('../../validation/contactsValidation')
const {
  getContactsController,
  getContactsByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
} = require('../../controllers/contactsController')

router.get('/', getContactsController)

router.get('/:contactId', getContactsByIdController)

router.post('/', validateCreateContact, addContactController)

router.delete('/:contactId', deleteContactController)

router.patch('/:contactId', validateUpdateContact, changeContactController)

router.patch(
  '/:contactId/favorite',
  validateUpdateStatusContact,
  updateStatusContactController
)

module.exports = router
