const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SIGN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];

    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    const userId = decodedToken.userId;
    const accessToken = jwt.sign({
        userId: userId, 
    },
    JWT_SIGN_SECRET,
    {
       expiresIn: '1800s',
    })
  return accessToken;
}