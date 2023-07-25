import mongoose from 'mongoose'

const dbHost = process.env.DB_HOST ?? 'localhost'
const dbPort = process.env.DB_PORT ?? 27017

const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}`, {
      dbName: 'my-courses-db'
    })
    console.info('Connected to MongoDB!')
  } catch (err) {
    console.error(err)
  }
}

export {
  connectToMongo,
}
