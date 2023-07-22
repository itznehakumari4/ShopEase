import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();

// Middleware for logging HTTP requests in development mode using 'morgan'
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
// In short, this allows us to use req.body to extract json data
app.use(express.json());

// Mount the 'productRoutes' middleware at the '/api/products' base path
// This allows handling routes related to products under the '/api/products' URL
// For example, '/api/products' will be the main page, and additional routes can be added
// The 'productRoutes' module contains the specific routes and their corresponding handlers
// This modular approach helps organize and manage product-related routes in the application
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

/* 

uploads folder is inaccessible by default. Converting it to static folder to load in browser, using express

Making a file static allows it to be accessed using URLs. When set up a static file server using express.static in your Express application, it defines a directory from which static files can be served.Any file placed in that directory becomes accessible to clients through URLs.
For example:
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

The /uploads URL path is mapped to the /uploads directory on the server. Any files placed in the /uploads directory can be accessed by appending their filename to the /uploads URL. So if a file named image.jpg in the /uploads directory, it can be accessed using the URL http://yourdomain.com/uploads/image.jpg. The static file server handles the request for that URL and serves the corresponding file to the client. This allows to serve files such as images, CSS files, JavaScript files, or uploaded files to clients by providing the appropriate URLs.

*/
const currentDirectory = path.resolve();
app.use("/uploads", express.static(path.join(currentDirectory, "/uploads")));

// Multer for uploads
app.use("/api/upload", uploadRoutes);

// PAYPAL DOCUMENTATION
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// If in production mode, serve the frontend build and handle routes using React Router
if (process.env.NODE_ENV === "production") {
  const currentDirectory = path.resolve();
  // Serve the static files from the 'frontend/build' directory
  app.use(express.static(path.join(currentDirectory, "/frontend/build")));

  // For any other route, serve the 'index.html' file from the 'frontend/build' directory
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(currentDirectory, "frontend", "build", "index.html"))
  );
} else {
  // For any other route, serve the 'index.html' file from the 'frontend/build' directory
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// to handle express error(middlewares)
app.use(notFound);
app.use(errorHandler);

// Set the port number from the environment variable or default to 5000
const PORT = process.env.PORT || 5000;

//The app.listen function in Express is used to start the server and make it listen for incoming HTTP requests. It takes a port number and an optional callback function as arguments.
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
