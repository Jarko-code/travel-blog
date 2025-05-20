import mongoose from 'mongoose'
import { connectDB, clearIndexes, checkDBConnection } from '../config/db.js'
import seedSubscriptions from './factory/subscriptionsFactory.js'
import seedUsers from './factory/usersFactory.js'

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
