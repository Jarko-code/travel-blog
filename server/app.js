import express from 'express'
import { connectDB } from './config/db.js'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import userRoutes from './routes/userRoutes.js'

connectDB()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api', subscriptionRoutes)
app.use('/api', userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
