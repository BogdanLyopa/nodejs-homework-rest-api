const express = require('express')

const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')

const { updateAvatarController } = require('../controllers/avatarsController')
// const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadAvatarMiddleware,
} = require('../middlewares/uploadAvatarMiddleware')
router.patch(
  '/avatars',
  uploadAvatarMiddleware.single('avatar'),
  asyncWrapper(updateAvatarController)
)

module.exports = router
