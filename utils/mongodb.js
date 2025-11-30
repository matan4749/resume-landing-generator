import mongoose from 'mongoose'

let cachedConnection = null

export async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    })

    cachedConnection = connection
    return connection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
