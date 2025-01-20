class sendErrorResponse extends Error {
  constructor(message, statusCode=401) {
    super(message); // Call the parent class constructor (Error)
    this.statusCode = statusCode; // Add a custom property for the status code
    this.name = this.constructor.name; // Set the name of the error to the class name
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

export default sendErrorResponse;