const { Contacts } = require('../db/contactsModel')
const {
  ValidationError,
  WrongContactIdError,
} = require('../helpers/errors')

const getContacts = async (userId) => {
  const contacts = await Contacts.find({ owner: userId })
  return contacts
}

const getContactById = async (contactId, userId) => {
  try {
    const foundContact = await Contacts.findOne({
      _id: contactId,
      owner: userId,
    })
    if (!foundContact) {
      throw new WrongContactIdError(`Not found contact with id: ${contactId}`)
    }
    return foundContact
  } catch (error) {
    throw new Error(error)
  }
}

const addContact = async (body, userId) => {
  const { name, email, phone } = body
  const contactBody = {
    name,
    email,
    phone,
    favorite: body.favorite ? body.favorite : false,
    owner: userId,
  }
  const contact = new Contacts(contactBody)
  if (!contact) {
    throw new ValidationError('Contact not added!')
  }
  try {
    await contact.save()
    return contact
  } catch (error) {
    throw new Error(error)
  }
}

const deleteContactById = async (contactId, userId) => {
  try {
    const contactForRemove = await Contacts.findOneAndRemove({
      _id: contactId,
      owner: userId,
    })
    if (!contactForRemove) {
      throw new WrongContactIdError(`Not found contact with id: ${contactId}`)
    }
    return contactForRemove
  } catch (error) {
    throw new Error(error)
  }
}

const changeContactById = async (contactId, body, userId) => {
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
      {
        $set: body,
      },
      { new: true, omitUndefined: true }
    )
    return updatedContact
  } catch (error) {
    throw new Error(error)
  }
}

const updateStatusContact = async (contactId, body, userId) => {
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
      {
        $set: body,
      },
      { new: true, omitUndefined: true }
    )
    return updatedContact
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
}
