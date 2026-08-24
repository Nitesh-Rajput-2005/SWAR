import jwt from "jsonwebtoken";

const authvalidjwt = (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
        success: false
      });
    }

    // format: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
        success: false
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    // attach user info to request
    req.user = decoded;

    // continue to next (controller)
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false
    });
  }
};

export default authvalidjwt;