import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided.",
      });
      return;
    }

    // 2. Get token
    const token = authHeader.split(" ")[1];

    // 3. Check token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access denied. Invalid authentication token.",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;

    req.user = decoded;

    // 6. Continue to next middleware/controller
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
