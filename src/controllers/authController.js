const { registration, login, logout } = require('../services/authService')

const registrationController = async (req, res) => {
  const { email, password } = req.body

  await registration(email, password)
  res.status(200).json({ status: 'registration success' })
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  const token = await login(email, password)
  res.status(200).json({ status: 'login success', token })
}
const logoutController = async (req, res) => {
  await logout(req.user._id)
  res.status(204).json({ status: 'no content' })
}
module.exports = {
  registrationController,
  loginController,
  logoutController,
}
