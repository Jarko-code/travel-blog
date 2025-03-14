const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')

dotenv.config() // Load environment variables
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware to parse JSON
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
