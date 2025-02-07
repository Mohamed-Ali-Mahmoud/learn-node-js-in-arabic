/*
    This function is used to handle errors in the application.
    It takes statusCode, message and statusText as parameters.
*/
const handleError = (statusCode, message, statusText) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  error.statusText = statusText;
  return error;
};
module.exports = handleError;
