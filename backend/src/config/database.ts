import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-board';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('💡 Please make sure MongoDB is running or use MongoDB Atlas');
    console.log('🔗 For MongoDB Atlas: https://www.mongodb.com/atlas');
    console.log('📝 Update your .env file with the correct MONGODB_URI');
    // Don't exit the process, let it continue for development
    console.log('⚠️  Server will continue without database connection');
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
}; 