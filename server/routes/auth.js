import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

// Register User
router.post('/register', async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    phoneNumber,
    position,
    description,
    role,
    personalNumber,
    address,
    profilePicture,
    accountStatus,
  } = req.body

  try {
    // Validate password
    const passwordRegex = /^(?=.*[!@#$%^&*+\-]).{10,}$/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one special character (!@#$%^&*+-).',
      })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      phoneNumber,
      position,
      description,
      role,
      personalNumber,
      address,
      profilePicture,
      accountStatus,
    })

    // Save new user
    await user.save()

    // Return the newly created user object with the response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        position: user.position,
        description: user.description,
        role: user.role,
        personalNumber: user.personalNumber,
        address: user.address,
        profilePicture: user.profilePicture,
        accountStatus: user.accountStatus,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: 'Invalid email' })

    if (user.accountStatus === 'Disabled') {
      return res.status(403).json({ message: 'Account is disabled' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' })
    res.json({
      token,
      user: {
        id: user._id,
        username: `${user.name} ${user.surname}`,
        email: user.email,
        role: user.role,
      },
    })
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
    const user = await User.findById(decoded.id)

    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json({
      user: {
        id: user._id,
        username: `${user.name} ${user.surname}`,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const tokenBlacklist = new Set()

// Logout User
router.post('/logout', (req, res) => {
  try {
    const token = req.headers['authorization']
    if (!token) return res.status(400).json({ message: 'No token provided' })

    tokenBlacklist.add(token) // Add token to blacklist
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
