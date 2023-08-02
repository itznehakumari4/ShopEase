import mongoose from "mongoose";
//This line imports the mongoose library, which is an Object Data Modeling (ODM) library for MongoDB. It provides a higher-level abstraction for interacting with MongoDB databases.
//Some other ODMs are Caminitejs, monk, etc
//while you can interact with MongoDB using the native driver, ODMs provide additional features, convenience, and abstractions that can simplify the development process and improve the maintainability of your Node.js applications.

//Question - why did u choosed the mongoose ODM for ur project?

const connectDB = async () => {
  // connection call to mongoDB
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true, //When useUnifiedTopology is set to true, it tells the MongoDB driver to use the new Topology engine for handling server discovery, monitoring, and selecting servers for read and write operations.
      useNewUrlParser: true, //When useNewUrlParser is set to true, the MongoDB driver will use the new URL parser for parsing the MongoDB connection string provided in the MONGO_URI.
                            //The new URL parser allows for more consistent and reliable parsing of connection strings, including support for special characters and URL encoding.
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold); // these red yello cyan etc are just from colors.js not really required, just colors the terminal
    process.exit(1);
  }
};

export default connectDB;
