const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
} = require('../services/contactsService')

const getContactsController = async (req, res) => {
  const { _id } = req.user
  const contacts = await getContacts(_id)
  res.status(200).json(contacts)
}

const getContactsByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId, req.user._id)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json(contact)
}

const addContactController = async (req, res) => {
  await addContact(req.body, req.user._id)
  res.status(201).json({ status: 'success' })
}

const deleteContactController = async (req, res) => {
  await deleteContactById(req.params.contactId, req.user._id)
  res.status(200).json({ status: 'success' })
}

const changeContactController = async (req, res) => {
  const contacts = await changeContactById(
    req.params.contactId,
    req.body,
    req.user._id
  )
  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json({ status: 'success' })
}
const updateStatusContactController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }
  const updatedContact = await updateStatusContact(
    req.params.contactId,
    req.body,
    req.user._id
  )
  res.status(200).json(updatedContact)
}
module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
}
