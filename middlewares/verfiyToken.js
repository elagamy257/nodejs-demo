const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

//verifyToken & Authorize user 
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "You are not allowed",
        });
    }
  })
}

//verifyToken & Authorize admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if ( req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "You are not allowed, only admin allowed.",
        });
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
