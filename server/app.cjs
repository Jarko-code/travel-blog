const express = require('express')
const { connectDB } = require('./config/db.cjs')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth.cjs')
const subscriptionRoutes = require('./routes/subscription.cjs')
const userRoutes = require('./routes/users.cjs')

connectDB()

const app = express()
const PORT = process.env.PORT || 5001

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
app.use('/api', subscriptionRoutes)
app.use('/api', userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
