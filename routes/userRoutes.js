const express = require("express")
const { register, login, logout, getUser } = require('../controllers/userController')
const upload = require("../middleware/uploadUser");
const { auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', upload.single("image"), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUser', auth, getUser)

module.exports = router
