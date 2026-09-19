const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers.token;
  if (!token && req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = req.headers.authorization;
    }
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || process.env.JWT_SECERT_KEY;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token" });
    }
  } else {
    return res.status(401).json({ message: "no token provided" });
  }
}

// verifyToken & Authorize user 
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not allowed",
      });
    }
  });
}

// verifyToken & Authorize admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not allowed, only admin allowed.",
      });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
