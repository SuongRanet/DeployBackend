import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";
export const roleMiddleware = (...allowedRoles: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    
    if (role === undefined) {
      return res.status(401).json({
        status: false,
        message: "You Are Guest !!",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        status: false,
        message: "You don't have permission",
      });
    }
    
    next();
  };
};
