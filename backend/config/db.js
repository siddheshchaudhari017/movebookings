import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Mask password for logging: replace string between // and @ with stars
    const maskedUri = mongoUri.replace(/\/\/(.*):(.*)@/, '//****:****@');
    console.log(`Connecting to MongoDB: ${maskedUri}`);

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
