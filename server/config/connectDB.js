import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_CONN) {
      throw new Error("MONGO_CONN environment variable is not defined");
    }
    const conn = await mongoose.connect(process.env.MONGO_CONN);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB; 
