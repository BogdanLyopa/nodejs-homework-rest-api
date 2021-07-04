const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
} = require('../services/contactsService')

const getContactsController = async (req, res) => {
  const contacts = await getContacts()
  res.status(200).json(contacts)
}

const getContactsByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json(contact)
}

const addContactController = async (req, res) => {
  const contacts = await addContact(req.body)
  res.status(201).json(contacts)
}

const deleteContactController = async (req, res) => {
  await deleteContactById(req.params.contactId)
  res.status(200).json({ status: 'success' })
}

const changeContactController = async (req, res) => {
  const contacts = await changeContactById(req.params.contactId, req.body)
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
    req.body
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
