import jwt from "jsonwebtoken";
import prisma from "../library/prisma.js"; // Ensure correct import path

export const verifyToken = async (req, res, next) => {
  // Try getting token from multiple sources
  const token = req.cookies?.token || 
               req.headers?.authorization?.split(' ')[1] || 
               req.query?.token;

  if (!token) {
    return res.status(401).json({ 
      error: "Authentication required",
      solution: "Please login or provide a valid token"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // MongoDB-specific: Verify user exists in database
    const userExists = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true }
    });

    if (!userExists) {
      return res.status(401).json({ 
        error: "User not found",
        solution: "Token is valid but user no longer exists"
      });
    }

    // Attach user ID to request
    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    
    // Specific error messages
    let errorMessage = "Invalid token";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Session expired. Please login again.";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Malformed token";
    }

    res.status(403).json({ 
      error: errorMessage,
      solution: "Try logging in again to get a new token"
    });
  }
};