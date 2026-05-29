const jwt = require("jsonwebtoken");

// Middleware to protect routes — acts like a security guard
// It runs BEFORE the actual controller (e.g. getCart, addToCart)
const protect = (req, res, next) => {

  // Step 1: Read the Authorization header from the request
  // Expected format: "Bearer <token>"
  const authHeader = req.headers.authorization;

  // Step 2: If no token or wrong format → block the request immediately
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Step 3: Extract the actual token by removing the "Bearer " prefix
  // "Bearer eyJhbG..." → split by space → take index [1]
  const token = authHeader.split(" ")[1];

  try {
    // Step 4: Verify the token using the secret key
    // If valid → decoded contains the payload (e.g. { id, email, ... })
    // If invalid or expired → throws an error, caught below
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 5: Attach the decoded user info to req.user
    // So controllers can access req.user.id, req.user.email, etc.
    req.user = decoded;

    // Step 6: Call next() to pass control to the actual route handler
    next();
  } catch (error) {
    // Token is fake, tampered, or expired → block the request
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
