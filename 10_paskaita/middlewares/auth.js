const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Access denied' });
  }
  try {
    const plainToken = token.slice(7);
    const decoded = jwt.verify(plainToken, process.env.JSON_WEB_TOKEN);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
