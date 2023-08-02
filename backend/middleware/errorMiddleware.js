// This middleware is designed to handle requests that do not match any of the defined routes in the application. In other words, it is used to catch and handle 404 (Not Found) errors.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // passes to the next middleware
};

//If route matched, process the error
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  //It then sends a JSON response to the client with the error message (err.message). In development mode (when process.env.NODE_ENV is not set to "production"), it also includes the error stack trace (err.stack) to aid in debugging. In production mode, the stack trace is omitted for security reasons, as it may reveal sensitive information about the server.
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// while returning various functions, do not use default, default is to be used only in case of single return
export { notFound, errorHandler };

//In summary, the notFound middleware catches requests
//that do not match any route, sets the HTTP status code
//to 404, and passes an error to the next middleware. 
//The errorHandler middleware handles errors in the application,
//sets appropriate status codes, and sends error responses back to 
//the client in JSON format. Together, these middleware functions 
//enhance the error handling and error response capabilities of the 
//Express.js application.
