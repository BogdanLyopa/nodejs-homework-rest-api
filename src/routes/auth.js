const express = require('express')
const router = express.Router()

const {
  registrationController,
  loginController,
  logoutController,
} = require('../controllers/authController')
const { asyncWrapper } = require('../helpers/apiHelpers')
const {
  signupValidation,
  loginValidation,
} = require('../middlewares/authValidation')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.post('/signup', signupValidation, asyncWrapper(registrationController))
router.post('/login', loginValidation, asyncWrapper(loginController))

router.use(authMiddleware)

router.post('/logout', asyncWrapper(logoutController))

module.exports = router
