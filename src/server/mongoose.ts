import mongoose from 'mongoose';

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;

export const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://${dbHost}:${dbPort}`);
        console.info("Connected to MongoDB!")
    } catch (err) {
        console.error(err)
    }
}
