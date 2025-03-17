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
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.post('/test-body', (req, res) => {
  console.log(req.body) // Log the body to check if it's coming in
  res.json({ received: req.body })
})
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
