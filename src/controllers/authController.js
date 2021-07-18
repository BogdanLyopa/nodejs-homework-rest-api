const {
  registration,
  login,
  logout,
  registrationVerify,
  registrationVerifyByEmail,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  await registration(email, password);
  res.status(200).json({ status: "registration success" });
};
const registrationVerifyController = async (req, res) => {
  const { verificationToken } = req.params;

  await registrationVerify(verificationToken);
  res.status(200).json({ status: "registration success" });
};
const registrationVerifyByEmailController = async (req, res) => {
  const { email } = req.body;

  await registrationVerifyByEmail(email);
  res.status(200).json({ status: "Email sent" });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);
  res.status(200).json({ status: "login success", token });
};
const logoutController = async (req, res) => {
  await logout(req.user._id);
  res.status(204).json({ status: "no content" });
};
module.exports = {
  registrationController,
  loginController,
  logoutController,
  registrationVerifyController,
  registrationVerifyByEmailController,
};
