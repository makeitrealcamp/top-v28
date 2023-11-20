import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/demo';

export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🚀 Database connected');
  } catch (error) {
    console.log('🚀 Database connection failed');
  }
};
