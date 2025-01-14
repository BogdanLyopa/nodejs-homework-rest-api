const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./src/routes/contacts')
const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/user')
const avatarRouter = require('./src/routes/avatars')

const { errorHandler } = require('./src/helpers/apiHelpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
app.use('/api/users', userRouter)
app.use('/api/users', avatarRouter)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
