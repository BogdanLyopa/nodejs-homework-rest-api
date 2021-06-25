const fs = require('fs/promises')
const path = require('path')

const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    return error
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const [desiredContact] = contacts.filter(
      ({ id }) => id.toString() === contactId.toString()
    )
    return desiredContact
  } catch (error) {
    return false
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const newContacts = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString()
    )
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return { message: 'contact deleted' }
  } catch (error) {
    return false
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const id = uuidv4()
  const newContact = { id, name, email, phone }

  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return { status: 'success' }
  } catch (error) {
    return false
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    contacts.forEach((contact) => {
      if (contact.id.toString() === contactId.toString()) {
        if (name) {
          contact.name = name
        }
        if (email) {
          contact.email = email
        }
        if (phone) {
          contact.phone = phone
        }
        fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8')
      }
      return { status: 'ok' }
    })
  } catch (error) {
    return false
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
