const { Contacts } = require('../db/contactsModel')

const getContacts = async () => {
  const contacts = await Contacts.find({})
  return contacts
}

const getContactById = async (id) => {
  const contact = await Contacts.findById(id)
  return contact
}

const addContact = async (body) => {
  const contacts = new Contacts(body)
  await contacts.save()
  return contacts
}
const deleteContactById = async (id) => {
  await Contacts.findByIdAndRemove(id)
}

const changeContactById = async (id, body) => {
  const contacts = await Contacts.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true, omitUndefined: true }
  )
  return contacts
}

const updateStatusContact = async (id, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true, omitUndefined: true }
  )
  return updatedContact
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
}
