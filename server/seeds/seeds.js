const mongoose = require('mongoose')
const { connectDB, clearIndexes, checkDBConnection } = require('../config/db')
const seedSubscriptions = require('./factory/subscriptionsFactory')
const seedUsers = require('./factory/usersFactory')

const runSeeds = async () => {
  try {
    await connectDB()
    checkDBConnection()
    await clearIndexes()

    await seedSubscriptions()
    await seedUsers()

    console.log('All seeds have been successfully added to the database.')
  } catch (err) {
    console.error('Error while seeding data:', err)
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB disconnected.')
  }
}

runSeeds()
