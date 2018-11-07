const logger = require('./logger');

function handleStatusCode(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return true;
  } else {
    logger.error("ERROR: Status code: ", statusCode);
    return false;
  }
}

module.exports = handleStatusCode;
