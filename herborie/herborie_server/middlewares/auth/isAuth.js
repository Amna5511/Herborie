const jwtUtils = require('../utils/jwt.utils');
const Token = require('../../models/token.model');

const isAuth = async (req, res, next) => { 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    jwtUtils.verify(token); 
    // verification token in mongodb 
    const record = await Token.findOneAndUpdate(
      { token },
      //sets it back to 0 
      { lastUsedAt: new Date() },  
      { new: true }
    );

    if (!record) return res.status(401).json({ message: 'Session expired' });

    req.user = jwtUtils.verify(token);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAuth;
