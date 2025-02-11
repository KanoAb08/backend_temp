import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');
  const token = authorizationHeader ? authorizationHeader.split(' ')[1] : req.cookies.token;  

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.userId };
    
    // Store token and user info in cookies
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('userId', decoded.userId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protect;
