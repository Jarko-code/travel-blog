const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB Connection Failed', error)
    process.exit(1)
  }
}

// Clear all indexex in all tables and prevent from dublicite keys
const clearIndexes = async () => {
  try {
    const db = mongoose.connection.db
    const collections = await db.collections()

    for (const collection of collections) {
      await collection.dropIndexes()
      console.log(`Indexes removed from collection: ${collection.collectionName}`)
    }

    console.log('All indexes have been removed from all collections.')
  } catch (error) {
    console.error('Error removing indexes:', error)
  }
}

// Check if DB is connected
const checkDBConnection = () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Database is connected and ready.')
  } else {
    console.error('Database is not connected.')
    process.exit(1)
  }
}

module.exports = {
  connectDB,
  clearIndexes,
  checkDBConnection,
}
