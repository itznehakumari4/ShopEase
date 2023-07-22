import mongoose from "mongoose";

const connectDB = async () => {
  // connection call to mongoDB
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold); // these red yello cyan etc are just from colors.js not really required, just colors the terminal
    process.exit(1);
  }
};

export default connectDB;
