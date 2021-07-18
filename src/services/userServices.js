const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')

const getCurrentUser = async (userId) => {
  try {
    const currentUser = await User.findById(userId)
    if (!currentUser) {
      throw new NotAuthorizedError('Not authorized')
    }
    return currentUser
  } catch (error) {
    throw new Error(error)
  }
}
const updateUserAvatar = async (userId, avatarUrl) => {
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { avatarURL: avatarUrl },
      },
      { new: true, omitUndefined: true }
    )
    return avatarUrl
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  getCurrentUser,
  updateUserAvatar,
}
