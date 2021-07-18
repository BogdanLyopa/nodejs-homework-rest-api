const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

const { v4: uuidv4 } = require("uuid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (email, password) => {
  try {
    const user = new User({ email, password, verifyToken: uuidv4() });
    await user.save();
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "bogdanlyopa@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `Please confirm your email address POST http://localhost:8080/api/users/verify/${user.verifyToken}`,
      html: `Please confirm your email address POST http://localhost:8080/api/users/verify/${user.verifyToken}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const registrationVerify = async (verifyToken) => {
  const verify = await User.findOne({ verifyToken, verify: false });

  if (!verify) {
    throw new NotAuthorizedError("Invalid or expired confirmation code");
  }
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new NotAuthorizedError("No user found ");
  }
  await verify.save();
  user.verifyToken = null;
  user.verify = true;
  await user.save();
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: "bogdanlyopa@gmail.com",
    subject: "Confirmed registration",
    text: "Confirmed registration",
    html: "Confirmed registration",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const registrationVerifyByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user.verify === true) {
      throw new NotAuthorizedError("Verification has already been passed");
    }
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "bogdanlyopa@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `Please confirm your email address POST http://localhost:8080/api/users/verify/${user.verifyToken}`,
      html: `Please confirm your email address POST http://localhost:8080/api/users/verify/${user.verifyToken}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  await User.findOneAndUpdate(
    { email },
    { $set: { token: token } },
    { new: true, omitUndefined: true }
  );

  return token;
};

const logout = async (userId) => {
  if (!userId) {
    throw new NotAuthorizedError("You must be authorized!");
  }
  try {
    const logoutUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { token: null } },
      { useFindAndModify: false }
    );
    return logoutUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  registration,
  login,
  logout,
  registrationVerify,
  registrationVerifyByEmail,
};
