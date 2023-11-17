const { validateToken } = require('../utils/jwt.utils');

const jwtValidate = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  const authBearer = authorization.split(' ')[1];
  const validateNewObject = validateToken(authBearer || authorization);
  
  if (validateNewObject.error) {
    return res.status(401).json(validateNewObject.data);
  }
  
  res.user = validateNewObject.data;
  
  next();
};
  
module.exports = {
  jwtValidate,
};