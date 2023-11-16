const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  BAD_REQUEST: 400,
  DELETED: 204,
};
  
const statusCode = (code) => HTTP_STATUS[code] || 500;
  
module.exports = statusCode;