const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Validate password
    const passwordRegex = /^(?=.*[!@#$%^&*+-]).{10,}$/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one special character (!@#$%^&*+-).',
      })
    }

    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({ username, email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' })
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Protected Route
router.get('/me', async (req, res) => {
  try {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
