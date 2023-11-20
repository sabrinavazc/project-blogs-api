const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
};
  
const statusCode = (code) => HTTP_STATUS[code] || 500;
  
module.exports = statusCode;