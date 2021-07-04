const app = require('../app')
require('dotenv').config()

const { connectMongo } = require('../src/db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  await connectMongo()

  app.listen(PORT, (error) => {
    if (error) console.error('Error at server launch:', error)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
