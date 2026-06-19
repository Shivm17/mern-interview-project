import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('Database connection error: MONGO_URI environment variable is missing.');
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection lost: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect');
  });

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Failed to connect to Database: ${error.message}`);
  }
};

export default connectDB;
