import jwt from "jsonwebtoken";
import prisma from "../library/prisma.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || 
               req.headers?.authorization?.replace('Bearer ', '') || 
               req.query?.token;

  console.log("JWT_SECRET:", process.env.JWT_SECRET || "Missing!"); // Debug

  if (!token) {
    return res.status(401).json({ 
      error: "Authentication required",
      solution: "Please login or provide a valid token"
    });
  }

  try {
    // Verify token with the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Now uses the correct secret
    
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

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error("JWT Error:", error.message);
    
    let errorMessage = "Invalid token";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Session expired. Please login again.";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = error.message; // Shows "secret or public key must be provided" if missing
    }

    res.status(403).json({ 
      error: errorMessage,
      solution: "Try logging in again to get a new token"
    });
  }
};