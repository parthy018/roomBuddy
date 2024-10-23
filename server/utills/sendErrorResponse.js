const sendErrorResponse = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({ error: message });
  };
  
  module.exports = sendErrorResponse;
  