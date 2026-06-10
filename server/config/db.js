import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add it to server/.env before starting the server.');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default connectDB;