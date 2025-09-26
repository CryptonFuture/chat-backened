const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const { config } = require('dotenv')

config({
  path: '.env'
})

const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists has been taken'
        })
    } 

    else if (password.length < 10) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 10 characters long'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        email,
        password: hashPassword,
        image: req.file ? `/uploads/users/${req.file.filename}` : null,
    })

    const userData = await user.save()

    if (userData) {
        return res.status(200).json({
            success: true,
            message: "user create successfully",
            data: userData
        })
    }

     else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const expiresIn = 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: expiresIn
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString(); 

    user.online = true;
    await user.save();
        
   return res.json({ 
        success: true, 
        token,
        expiresAt,
        user: { 
            id: user._id, 
            email: user.email,
            username: user.username,
            tokenType: 'Bearer',
            online: user.online
        },
            message: 'user create successfully'
         });
        
  } catch (err) {
   return res.status(500).json({ error: 'Internal server error' });
  }

}

const logout = async (req, res) => {

    const { id } = req.query

    if (!id) {
        return res.status(400).json({ success: false, error: "User ID is required for logout." });
    }

     const user = await User.updateOne(
      { _id: id },
      { $set: { online: false } },
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Successfully logged out." });
}

const getUser = async (req, res) => {
    const user = await User.find()

    if(!user.length > 0) {
        return res.status(200).json({
            success: false,
            error: 'no record found',
        })
    }

     return res.status(200).json({
        success: true,
        data: user,
    })
}

module.exports = {
    register,
    login,
    logout,
    getUser
}