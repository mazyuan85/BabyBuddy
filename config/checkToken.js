const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
//   console.log('Authenticating user...');
  // Check for the token being sent in a header or as a query parameter
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    //   console.log('Verifying token...');
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
    //   console.log('err:', err);
    //   console.log('decoded:', decoded);
      req.user = err ? null : decoded.user;  
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);  
    //   console.log('req.user:', req.user);
    //   console.log('req.exp:', req.exp);
      return next();
    });
  } else {
    // No token was sent
    req.user = null;
    console.log('No token found');
    return next();
  }
};
