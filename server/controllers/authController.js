import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET
const tokenBlacklist = new Set()

export const registerUser = async (req, res) => {
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
    const passwordRegex = /^(?=.*[!@#$%^&*+\-]).{10,}$/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one special character (!@#$%^&*+-).',
      })
    }

    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

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

    await user.save()

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
}

export const loginUser = async (req, res) => {
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
}

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: 'Token is blacklisted' })
    }

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
}

export const logoutUser = (req, res) => {
  try {
    const token = req.headers['authorization']
    if (!token) return res.status(400).json({ message: 'No token provided' })

    tokenBlacklist.add(token)
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
