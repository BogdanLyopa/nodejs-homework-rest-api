const jwt = require('jsonwebtoken')

const { NotAuthorizedError } = require('../helpers/errors')
const { getCurrentUser } = require('../services/userServices')

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) {
      next(NotAuthorizedError('Not authorized'))
      return
    }
    const user = jwt.decode(token, process.env.JWT_SECRET)
    if (!user) {
      next(NotAuthorizedError('Not authorized'))
      return
    }
    req.token = token
    req.user = user
    const currentUser = await getCurrentUser(user._id)
    if (token !== currentUser.token) {
      next(new NotAuthorizedError('Not authorized'))
      return
    }

    next()
  } catch (error) {
    next(new NotAuthorizedError('Not authorized'))
  }
}

module.exports = { authMiddleware }
