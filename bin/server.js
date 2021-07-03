const app = require('../app')
require('dotenv').config()

const { connectMongo } = require('../db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  await connectMongo()
  // const contacts = await Contacts.find({}).toArray();
  // console.table(contacts);
  app.listen(PORT, (error) => {
    if (error) console.error('Error at server launch:', error)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
