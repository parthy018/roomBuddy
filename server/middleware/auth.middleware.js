import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log(req.header);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const seekerAuthMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'seeker') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });
};

const hostAuthMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'host') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });
};

export {authMiddleware, seekerAuthMiddleware, hostAuthMiddleware};
