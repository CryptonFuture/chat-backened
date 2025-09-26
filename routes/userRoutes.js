const express = require("express")
const { register, login, logout, getUser } = require('../controllers/userController')
const upload = require("../middleware/uploadUser");

const router = express.Router()

router.post('/register', upload.single("image"), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUser', getUser)

module.exports = router
