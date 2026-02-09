const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ detail: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userEmail = decoded.sub;
    next();
  } catch (err) {
    return res.status(401).json({ detail: "Invalid token" });
  }
};

module.exports = authMiddleware;
