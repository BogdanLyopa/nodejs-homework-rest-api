const express = require('express')
const router = express.Router()
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require('../middlewares/contactsValidation')
const {
  getContactsController,
  getContactsByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
} = require('../controllers/contactsController')

const { asyncWrapper } = require('../helpers/apiHelpers')

const { authMiddleware } = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', asyncWrapper(getContactsController))

router.get('/:contactId', asyncWrapper(getContactsByIdController))

router.post('/', validateCreateContact, asyncWrapper(addContactController))

router.delete('/:contactId', asyncWrapper(deleteContactController))

router.patch(
  '/:contactId',
  validateUpdateContact,
  asyncWrapper(changeContactController)
)

router.patch(
  '/:contactId/favorite',
  validateUpdateStatusContact,
  asyncWrapper(updateStatusContactController)
)

module.exports = router
